// Actions
export enum RoomsActionTypes {
    ADD_NEW_DOOR        = 'Rooms/ADD_NEW_DOOR',
    SET_DOOR_POS        = 'Rooms/SET_DOOR_POS',
    CONNECT_STAIR       = 'Rooms/CONNECT_STAIR',
}

export const rooms_actions = {
    addNewDoor:        (process_name: string, x: number, y: number)              => { return ({ type: RoomsActionTypes.ADD_NEW_DOOR,  payload: { process_name: process_name, x: x, y: y } }) },
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
    SELECT_NOTHING      = "Selector/SELECT_NOTHING",
    SELECT_DOOR         = "Selector/SELECT_DOOR",
    SELECT_STAIR        = "Selector/SELECT_STAIR",
    SELECT_CONSTRUCTION = "Selector/SELECT_CONSTRUCTION",
}

export const selector_actions = {
    selectNothing:      ()                          => { return ({ type: SelectorActionTypes.SELECT_NOTHING,      payload: { name: "", id: '-1', index: -1 } }) },
    selectDoor:         (id: string)                => { return ({ type: SelectorActionTypes.SELECT_DOOR,         payload: { name: "", id: id, index: -1 } }) },
    selectStair:        (id: string, index: number) => { return ({ type: SelectorActionTypes.SELECT_STAIR,        payload: { name: "", id: id, index: index } }) },
    selectConstruction: (name: string)              => { return ({ type: SelectorActionTypes.SELECT_CONSTRUCTION, payload: { name: name, id: '-1', index: -1 } }) },
};