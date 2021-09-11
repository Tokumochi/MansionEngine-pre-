import { DataState, ProcessState } from './states';

// Actions
export enum RoomsActionTypes {
    ADD_NEW_DOOR        = 'Rooms/ADD_NEW_DOOR',
    SET_DOOR_POS        = 'Rooms/SET_DOOR_POS',
    CONNECT_STAIR       = 'Rooms/CONNECT_STAIR',
}

export const rooms_actions = {
    addNewDoor:        (process: ProcessState, x: number, y: number)             => { return ({ type: RoomsActionTypes.ADD_NEW_DOOR,  payload: { process: process, x: x, y: y } }) },
    setDoorPos:        (id: string, x: number, y: number)                        => { return ({ type: RoomsActionTypes.SET_DOOR_POS,  payload: { id: id, x: x, y: y } }) },
    connectStair:      (upper_id: string, upper_index: number, lower_id: string) => { return ({ type: RoomsActionTypes.CONNECT_STAIR, payload: { upper_id: upper_id, upper_index: upper_index, lower_id: lower_id } }) },
};

export enum ProcessesActionTypes {
    SET_PROCESS_CONTENT = 'Processes/SET_PROCESS_CONTENT',
}

export const processes_actions = {
    setProcessContent: (name: string, content: string) => { return ({ type: ProcessesActionTypes.SET_PROCESS_CONTENT, payload: { name: name, content: content } }) },
}

export enum SelectorActionTypes {
    SELECT_NOTHING = "Selector/SELECT_NOTHING",
    SELECT_DOOR    = "Selector/SELECT_DOOR",
    SELECT_STAIR   = "Selector/SELECT_STAIR",
    SELECT_DATA    = "Selector/SELECT_DATA", 
    SELECT_PROCESS = "Selector/SELECT_PROCESS",
}

export const selector_actions = {
    selectNothing: ()                          => { return ({ type: SelectorActionTypes.SELECT_NOTHING, payload: { name: "", id: '-1', index: -1, process: null } }) },
    selectDoor:    (id: string)                => { return ({ type: SelectorActionTypes.SELECT_DOOR,    payload: { name: "", id: id, index: -1, process: null } }) },
    selectStair:   (id: string, index: number) => { return ({ type: SelectorActionTypes.SELECT_STAIR,   payload: { name: "", id: id, index: index, process: null } }) },
    selectData:    (name: string)              => { return ({ type: SelectorActionTypes.SELECT_DATA,    payload: { name: name, id: '-1', index: -1, process: null } }) },
    selectProcess: (process: ProcessState)     => { return ({ type: SelectorActionTypes.SELECT_PROCESS, payload: { name: "", id: '-1', index: -1, process: process } }) },
};