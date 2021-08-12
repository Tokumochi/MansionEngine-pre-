import { createStore } from 'redux';

// Kind
export type DoorKind = "Data" | "Process" | "Room";

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
    visitors: StairState[],
}
export interface RoomState {
    doors: DoorState[],
    room_width: number,
    room_height: number,
    selected_door_id: number,
}

export interface DoorMetaState {
    door_state: DoorState,
    name: string,
    x: number,
    y: number,
}

// Actions
export enum ActionTypes {
    SET_DOOR_POS = 'Door/SET_DOOR_POS',
    SELECT_DOOR = 'Room/SELECT_DOOR',
}

export const actions = {
    setDoorPos: (id: number, x: number, y: number) => { return ({ type: ActionTypes.SET_DOOR_POS, payload: { id: id, x: x, y: y } }) },
    selectDoor: (id: number) => { return ({ type: ActionTypes.SELECT_DOOR, payload: { id: id } }) },
};

// Recuder
function doorPositionReducer() {
    return (state: RoomState, action: { type: string, payload: { id: number, x: number, y: number } } ) => {
        return {
            ...state,
            doors: state.doors.map(door =>
                door.id === action.payload.id ? { ...door, x: action.payload.x, y: action.payload.y } : {
                    ...door,
                    visitors: door.visitors.map(visitor =>
                        visitor.lower_id === action.payload.id ? { ...visitor, lower_x: action.payload.x, lower_y: action.payload.y } : visitor
                    ),
                }
            ),
        }
    }
}

function roomSelectedDoorIDReducer() {
    return (state: RoomState, action: { type: string, payload: { id: number } }) => {
        return {
            ...state,
            selected_door_id: action.payload.id,
        }
    }
}

const defaultDoors: DoorState[] = [
    {id: 1, name: 'test1', kind: "Process", x: 2, y: 3, floor: 1, process_string: "() => { return 3; }", isCorridor: false, visitors: []},
    {id: 2, name: 'test2', kind: "Process", x: 4, y: 3, floor: 1, process_string: "() => { return 2; }", isCorridor: false, visitors: []},
    {id: 3, name: 'test3', kind: "Process", x: 3, y: 1, floor: 2, process_string: "(a, b) => { console.log(a + b); }", isCorridor: false, visitors: [{lower_id: 1, lower_x: 2, lower_y: 3}, {lower_id: 2, lower_x: 4, lower_y: 3}]},
];

const initialState: RoomState = {
    doors: defaultDoors,
    room_width: 10,
    room_height: 6,
    selected_door_id: -1,
}

export const reducer = (state: any, action: any): RoomState => {
    switch(action.type) {
        case ActionTypes.SET_DOOR_POS:
            return doorPositionReducer()(state, action);
        case ActionTypes.SELECT_DOOR:
            return roomSelectedDoorIDReducer()(state, action);
        default:
            return state;
    }
};

export default createStore(reducer, initialState);