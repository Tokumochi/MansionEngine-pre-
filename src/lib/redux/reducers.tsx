import { combineReducers, createStore } from 'redux';

import { SelectedKind, DoorState, RoomState, AppState, ProcessState, SelectorState, DoorKind, DataState } from './states';
import { RoomsActionTypes, ProcessesActionTypes, SelectorActionTypes } from './actions';

// Recuder
function AddNewDataDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { ref_name: string, x: number, y: number } } ) => {
        const door_kind: DoorKind = "Data";
        return {
            ...state,
            doors: [...state.doors, {
                id: Math.random().toString(32).substring(2),
                name: action.payload.ref_name + '(data)',
                kind: door_kind,
                x: action.payload.x,
                y: action.payload.y,
                floor: 0,
                ref_name: action.payload.ref_name,
                isCorridor: false,
                stairs: [],
            } ],
        }
    }
}
function AddNewProcessDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { process: ProcessState, x: number, y: number } } ) => {
        const door_kind: DoorKind = "Process";
        return {
            ...state,
            doors: [...state.doors, {
                id: Math.random().toString(32).substring(2),
                name: action.payload.process.name + '(process)',
                kind: door_kind,
                x: action.payload.x,
                y: action.payload.y,
                floor: action.payload.process.floor,
                ref_name: action.payload.process.name,
                isCorridor: false,
                stairs: Array.from(Array(action.payload.process.num_of_inputs), () => { return { lower_id: '-1', lower_x: -1, lower_y: -1 } }),
            } ],
        }
    }
}
function SetDoorPositionReducer() {
    return (state: RoomState, action: { type: string, payload: { id: string, x: number, y: number } } ) => {
        return {
            ...state,
            doors: state.doors.map(door =>
                door.id === action.payload.id ? { ...door, x: action.payload.x, y: action.payload.y } : {
                    ...door,
                    stairs: door.stairs.map(stair =>
                        stair.lower_id === action.payload.id ? { ...stair, lower_x: action.payload.x, lower_y: action.payload.y } : stair
                    ),
                }
            ),
        }
    }
}
function DeleteDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { id: string } } ) => {
        return {
            ...state,
            doors: state.doors.filter(door => {
                return door.id !== action.payload.id;
            })
            .map(door => {
                return {
                    ...door,
                    stairs: door.stairs.map(stair =>
                        stair.lower_id === action.payload.id ? { lower_id: '-1', lower_x: -1, lower_y: -1 } : stair
                    ),
                }
            }),
        }
    }
}
function ConnectStairReducer() {
    return (state: RoomState, action: { type: string, payload: { upper_id: string, upper_index: number, lower_id: string } } ): RoomState => {
        const lower_door = state.doors.find(door => door.id === action.payload.lower_id);

        if(lower_door === undefined) {
            return state;
        }

        const lower_floor: number = (lower_door as DoorState).floor;
        const lower_x: number = (lower_door as DoorState).x;
        const lower_y: number = (lower_door as DoorState).y;

        return {
            ...state,
            doors: state.doors.map(door =>
                (door.id === action.payload.upper_id && lower_floor < door.floor) ? {
                    ...door,
                    stairs: door.stairs.map((stair, index) =>
                        (index === action.payload.upper_index) ? { lower_id: action.payload.lower_id, lower_x: lower_x, lower_y: lower_y } : stair
                    ),
                } : door
            ),
        }
    }
}

const defaultDoors: DoorState[] = [];

const initialRoomsState: RoomState = {
    doors: defaultDoors,
    room_width: 2000,
    room_height: 1000,
};

export const rooms_reducer = (state: any = initialRoomsState, action: any): RoomState => {
    switch(action.type) {
        case RoomsActionTypes.ADD_NEW_DATA_DOOR:
            return AddNewDataDoorReducer()(state, action);
        case RoomsActionTypes.ADD_NEW_PROCESS_DOOR:
            return AddNewProcessDoorReducer()(state, action);
        case RoomsActionTypes.SET_DOOR_POS:
            return SetDoorPositionReducer()(state, action);
        case RoomsActionTypes.DELETE_DOOR:
            return DeleteDoorReducer()(state, action);
        case RoomsActionTypes.CONNECT_STAIR:
            return ConnectStairReducer()(state, action);
        default:
            return state;
    }
};

const initialDatasState: DataState[] = [
    { name: 'ball_x', value: 400 },
    { name: 'ball_y', value: 300 },
    { name: 'ball_velocity_x', value: 4 },
    { name: 'ball_velocity_y', value: 3 },
    { name: 'ball_acceleration', value: 1 },
];

export const datas_reducer = (state: any = initialDatasState, action: any): DataState[] => {
    switch(action.type) {
        default:
            return state;
    }
};

function SetProcessContent() {
    return (state: ProcessState[], action: { type: string, payload: { name: string, content: string } } ): ProcessState[] => {
        return state.map(process => 
            process.name === action.payload.name ? {
                ...process,
                content: action.payload.content,
            } : process
        );
    }
}

const initialProcessesState: ProcessState[] = [
    { name: 'distance', content: "(a_x, b_x, a_y, b_y) => { return Math.sqrt(Math.pow(a_x - b_x, 2) + Math.pow(a_y - b_y, 2)); }", floor: 2, num_of_inputs: 4 },
    { name: 'add', content: "(p, v) => { return p + v; }", floor: 2, num_of_inputs: 2 },
    { name: 'fill_back', content: "() => { const background = new Path2D(); background.rect(0, 0, 800, 600); ctx.fillStyle = 'black'; ctx.fill(background); }", floor: 3, num_of_inputs: 0 },
    { name: 'fill_ball', content: "(x, y) => { const circle = new Path2D(); circle.arc(x, y, 50, 0, 2 * Math.PI); ctx.fillStyle = 'blue'; ctx.fill(circle); }", floor: 4, num_of_inputs: 2 },
    { name: 'update_ball_x', content: "(x) => { Setball_x(x); }", floor: 4, num_of_inputs: 1 },
    { name: 'update_ball_y', content: "(y) => { Setball_y(y); }", floor: 4, num_of_inputs: 1 },
    { name: 'update_ball_velocity_x', content: "(v) => { Setball_velocity_x(v); }", floor: 4, num_of_inputs: 1 },
];

export const processes_reducer = (state: any = initialProcessesState, action: any): ProcessState[] => {
    switch(action.type) {
        case ProcessesActionTypes.SET_PROCESS_CONTENT:
            return SetProcessContent()(state, action);
        default: 
            return state;
    }
};

function SelectSomething(kind: SelectedKind) {
    return (state: SelectorState, action: { type: string, payload: { name: string, id: string, index: number, process: ProcessState } } ): SelectorState => {
        return {
            selecting_kind: kind,
            selecting_name: action.payload.name,
            selecting_id: action.payload.id,
            selecting_index: action.payload.index,
            selecting_process: action.payload.process,
        }
    }
}

const initialSelectorState: SelectorState = {
    selecting_kind: "Nothing",
    selecting_name: "",
    selecting_id: "-1",
    selecting_index: -1,
    selecting_process: { name: '', content: "", floor: -1, num_of_inputs: 0 },
};

export const selector_reducer = (state: any = initialSelectorState, action: any): SelectorState => {
    switch(action.type) {
        case SelectorActionTypes.SELECT_NOTHING:
            return SelectSomething("Nothing")(state, action);
        case SelectorActionTypes.SELECT_DOOR:
            return SelectSomething("Door")(state, action);
        case SelectorActionTypes.SELECT_STAIR:
            return SelectSomething("Stair")(state, action);
        case SelectorActionTypes.SELECT_DATA:
            return SelectSomething("Data")(state, action);
        case SelectorActionTypes.SELECT_PROCESS:
            return SelectSomething("Process")(state, action);
        default:
            return state;
    }
};

const reducers = combineReducers<AppState>({
    room: rooms_reducer,
    datas: datas_reducer,
    processes: processes_reducer,
    selector: selector_reducer,
});

export default createStore(reducers);