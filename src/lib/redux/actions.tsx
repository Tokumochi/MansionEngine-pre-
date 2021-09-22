import { DataState, DoorState, ProcessState } from './states';

// Actions
export enum RoomsActionTypes {
    ADD_NEW_DATA_DOOR    = 'Rooms/ADD_NEW_DATA_DOOR',
    ADD_NEW_PROCESS_DOOR = 'Rooms/ADD_NEW_PROCESS_DOOR',
    SET_DOOR_POS         = 'Rooms/SET_DOOR_POS',
    DELETE_DOOR          = 'Rooms/DELETE_DOOR',
    CONNECT_STAIR        = 'Rooms/CONNECT_STAIR',
}

export const rooms_actions = {
    addNewDataDoor:    (ref_name: string, x: number, y: number)                                            => { return ({ type: RoomsActionTypes.ADD_NEW_DATA_DOOR,    payload: { ref_name: ref_name, x: x, y: y } }) },
    addNewProcessDoor: (process: ProcessState, x: number, y: number)                                       => { return ({ type: RoomsActionTypes.ADD_NEW_PROCESS_DOOR, payload: { process: process, x: x, y: y } }) },
    setDoorPos:        (id: string, x: number, y: number)                                                  => { return ({ type: RoomsActionTypes.SET_DOOR_POS,         payload: { id: id, x: x, y: y } }) },
    deleteDoor:        (id: string)                                                                        => { return ({ type: RoomsActionTypes.DELETE_DOOR,          payload: { id: id } }) },
    connectStair:      (upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number) => { return ({ type: RoomsActionTypes.CONNECT_STAIR,        payload: { upper_id: upper_id, upper_index: upper_index, lower_door: lower_door, lower_index: lower_index } }) },
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