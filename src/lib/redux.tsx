import { createStore } from 'redux';

// Kind
export type DoorKind = "Data" | "Process" | "Room";

export type SelectKind = "Nothing" | "Door" | "Stair";

// State
export interface StairState {
    lower_id: number,
    lower_x: number,
    lower_y: number,
}
export interface DoorState {
    id: number,
    name: string,
    kind: DoorKind,
    floor: number,
    process_string: string,
    x: number,
    y: number,
    isCorridor: boolean,
    stairs: StairState[],
}

export interface SelectState {
    select_kind: SelectKind,
    selected_door_id: number,
    selected_stair_index: number,
}
export interface RoomState {
    doors: DoorState[],
    room_width: number,
    room_height: number,
    //selected_door_id: number,
    select_state: SelectState,
}

export interface DoorMetaState {
    door_state: DoorState,
    name: string,
    x: number,
    y: number,
}

// Actions
export enum ActionTypes {
    SET_DOOR_POS = 'SET_DOOR_POS',
    CONNECT_STAIR = 'CONNECT_STAIR',
    SELECT_NOTHING = 'SELECT_NOTHING',
    SELECT_DOOR = 'SELECT_DOOR',
    SELECT_STAIR = 'SELECT_STAIR',
}

export const actions = {
    setDoorPos: (id: number, x: number, y: number) => { return ({ type: ActionTypes.SET_DOOR_POS, payload: { id: id, x: x, y: y } }) },
    connectStair: (upper_id: number, upper_index: number, lower_id: number, lower_x: number, lower_y: number) => { return({ type: ActionTypes.CONNECT_STAIR, payload: { upper_id: upper_id, upper_index: upper_index, lower_id: lower_id, lower_x: lower_x, lower_y: lower_y } }) },
    selectNothing: () => { return ({ type: ActionTypes.SELECT_NOTHING, payload: { id: -1, index: -1 } }) },
    selectDoor: (id: number) => { return ({ type: ActionTypes.SELECT_DOOR, payload: { id: id, index: -1 } }) },
    selectStair: (id: number, index: number) => { return ({ type: ActionTypes.SELECT_STAIR, payload: { id: id, index: index } }) },
};

// Recuder
function SetDoorPositionReducer() {
    return (state: RoomState, action: { type: string, payload: { id: number, x: number, y: number } } ) => {
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
    return (state: RoomState, action: { type: string, payload: { upper_id: number, upper_index: number, lower_id: number, lower_x: number, lower_y: number } } ): RoomState => {
        return {
            ...state,
            doors: state.doors.map(door =>
                door.id === action.payload.upper_id ? {
                    ...door,
                    stairs: door.stairs.map<StairState>((stair, index) =>
                        index === action.payload.upper_index ? { lower_id: action.payload.lower_id, lower_x: action.payload.lower_x, lower_y: action.payload.lower_y } : stair
                    ),
                } : door
            ),
        }
    }
}
function SelectReducer(kind: SelectKind) {
    return (state: RoomState, action: { type: string, payload: { id: number, index: number } } ): RoomState => {
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

const defaultDoors: DoorState[] = [
    {id: 1, name: 'test1', kind: "Process", x: 2, y: 3, floor: 1, process_string: "() => { return 3; }", isCorridor: false, stairs: []},
    {id: 2, name: 'test2', kind: "Process", x: 4, y: 3, floor: 1, process_string: "() => { return 2; }", isCorridor: false, stairs: []},
    {id: 3, name: 'test3', kind: "Process", x: 3, y: 1, floor: 2, process_string: "(a, b) => { console.log(a + b); }", isCorridor: false, stairs: [{lower_id: 1, lower_x: 2, lower_y: 3}, {lower_id: 2, lower_x: 4, lower_y: 3}]},
    {id: 4, name: 'test4', kind: "Process", x: 1, y: 1, floor: 2, process_string: "(a) => { console.log(a); }", isCorridor: false, stairs: [{lower_id: -1, lower_x: -1, lower_y: -1}]},
];

const initialState: RoomState = {
    doors: defaultDoors,
    room_width: 10,
    room_height: 6,
    //selected_door_id: -1,
    select_state: { select_kind: "Nothing", selected_door_id: -1, selected_stair_index: -1 },
}

export const reducer = (state: any, action: any): RoomState => {
    switch(action.type) {
        case ActionTypes.SET_DOOR_POS:
            return SetDoorPositionReducer()(state, action);
        case ActionTypes.CONNECT_STAIR:
            return ConnectStairReducer()(state, action);
        case ActionTypes.SELECT_NOTHING:
            return SelectReducer("Nothing")(state, action);
        case ActionTypes.SELECT_DOOR:
            return SelectReducer("Door")(state, action);
        case ActionTypes.SELECT_STAIR:
            return SelectReducer("Stair")(state, action);
        default:
            return state;
    }
};

export default createStore(reducer, initialState);