import { combineReducers, createStore } from 'redux';

import { SelectKind, DoorState, RoomState, AppState, ProcessState } from './states';
import { RoomsActionTypes } from './actions';

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
function SelectReducer(kind: SelectKind) {
    return (state: RoomState, action: { type: string, payload: { id: string, index: number } } ): RoomState => {
        return {
            ...state,
            //selected_door_id: action.payload.id,
            select_state: {
                select_kind: kind,
                selected_door_id: action.payload.id,
                selected_stair_index: action.payload.index,
            }
        }
    }
}
function SetProcessContent() {
    return (state: RoomState, action: { type: string, payload: { id: string, content: string } } ): RoomState => {
        return {
            ...state,
            doors: state.doors.map(door =>
                (door.id == action.payload.id) ? {
                    ...door,
                    process_string: action.payload.content,
                } : door
            )
        }
    }
}

const defaultDoors: DoorState[] = [
    {id: '1', name: 'test1', kind: "Process", x: 2, y: 3, floor: 1, process_string: "() => { return 3; }", isCorridor: false, stairs: []},
    {id: '2', name: 'test2', kind: "Process", x: 4, y: 3, floor: 1, process_string: "() => { return 2; }", isCorridor: false, stairs: []},
    {id: '3', name: 'test3', kind: "Process", x: 3, y: 1, floor: 2, process_string: "(a, b) => { console.log(a + b); }", isCorridor: false, stairs: [{lower_id: '1', lower_x: 2, lower_y: 3}, {lower_id: '2', lower_x: 4, lower_y: 3}]},
    {id: '4', name: 'test4', kind: "Process", x: 1, y: 1, floor: 3, process_string: "(a) => { console.log(a); }", isCorridor: false, stairs: [{lower_id: '-1', lower_x: -1, lower_y: -1}]},
];

const initialRoomsState: RoomState = {
    doors: defaultDoors,
    room_width: 10,
    room_height: 6,
    //selected_door_id: -1,
    select_state: { select_kind: "Nothing", selected_door_id: '-1', selected_stair_index: -1 },
};

const initialProcessesState: ProcessState[] = [
    { process_name: 'aiueo', process_content: 'aiueo' },
];

export const rooms_reducer = (state: any = initialRoomsState, action: any): RoomState => {
    switch(action.type) {
        case RoomsActionTypes.SET_DOOR_POS:
            return SetDoorPositionReducer()(state, action);
        case RoomsActionTypes.CONNECT_STAIR:
            return ConnectStairReducer()(state, action);
        case RoomsActionTypes.SELECT_NOTHING:
            return SelectReducer("Nothing")(state, action);
        case RoomsActionTypes.SELECT_DOOR:
            return SelectReducer("Door")(state, action);
        case RoomsActionTypes.SELECT_STAIR:
            return SelectReducer("Stair")(state, action);
        case RoomsActionTypes.SET_PROCESS_CONTENT:
            return SetProcessContent()(state, action);
        default:
            return state;
    }
};

export const processes_reducer = (state: any = initialProcessesState, action: any): ProcessState[] => {
    switch(action.type) {
        default: 
            return state;
    }
};

const reducers = combineReducers<AppState>({
    room: rooms_reducer,
    processes: processes_reducer,
});

export default createStore(reducers);