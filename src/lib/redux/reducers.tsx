import { combineReducers, createStore } from 'redux';

import { SelectedKind, DoorState, RoomState, AppState, ProcessState, SelectorState } from './states';
import { RoomsActionTypes, ProcessesActionTypes, SelectorActionTypes } from './actions';

// Recuder
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

const defaultDoors: DoorState[] = [
    {id: '1', name: 'test1', kind: "Process", x: 2, y: 3, floor: 1, process_name: 'return3', isCorridor: false, stairs: []},
    {id: '2', name: 'test2', kind: "Process", x: 4, y: 3, floor: 1, process_name: 'return2', isCorridor: false, stairs: []},
    {id: '3', name: 'test3', kind: "Process", x: 3, y: 1, floor: 2, process_name: 'output_a_plus_b', isCorridor: false, stairs: [{lower_id: '1', lower_x: 2, lower_y: 3}, {lower_id: '2', lower_x: 4, lower_y: 3}]},
    {id: '4', name: 'test4', kind: "Process", x: 1, y: 1, floor: 3, process_name: 'output_a', isCorridor: false, stairs: [{lower_id: '-1', lower_x: -1, lower_y: -1}]},
];

const initialRoomsState: RoomState = {
    doors: defaultDoors,
    room_width: 10,
    room_height: 6,
};

export const rooms_reducer = (state: any = initialRoomsState, action: any): RoomState => {
    switch(action.type) {
        case RoomsActionTypes.SET_DOOR_POS:
            return SetDoorPositionReducer()(state, action);
        case RoomsActionTypes.CONNECT_STAIR:
            return ConnectStairReducer()(state, action);
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
    { name: 'return3', content: "() => { return 3; }", },
    { name: 'return2', content: "() => { return 2; }", },
    { name: 'output_a_plus_b', content: "(a, b) => { console.log(a + b); }", },
    { name: 'output_a', content: "(a) => { console.log(a); }" },
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
    return (state: SelectorState, action: { type: string, payload: { name: string, id: string, index: number } } ): SelectorState => {
        return {
            selecting_kind: kind,
            selecting_name: action.payload.name,
            selecting_id: action.payload.id,
            selecting_index: action.payload.index,
        }
    }
}

const initialSelectorState: SelectorState = {
    selecting_kind: "Nothing",
    selecting_name: "",
    selecting_id: "-1",
    selecting_index: -1,
};

export const selector_reducer = (state: any = initialSelectorState, action: any): SelectorState => {
    switch(action.type) {
        case SelectorActionTypes.SELECT_NOTHING:
            return SelectSomething("Nothing")(state, action);
        case SelectorActionTypes.SELECT_DOOR:
            return SelectSomething("Door")(state, action);
        case SelectorActionTypes.SELECT_STAIR:
            return SelectSomething("Stair")(state, action);
        default:
            return state;
    }
};

const reducers = combineReducers<AppState>({
    room: rooms_reducer,
    processes: processes_reducer,
    selector: selector_reducer,
});

export default createStore(reducers);