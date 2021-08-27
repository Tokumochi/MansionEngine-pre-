// Actions
export enum RoomsActionTypes {
    SET_DOOR_POS        = 'Rooms/SET_DOOR_POS',
    CONNECT_STAIR       = 'Rooms/CONNECT_STAIR',
}

export const rooms_actions = {
    setDoorPos:        (id: string, x: number, y: number)                        => { return ({ type: RoomsActionTypes.SET_DOOR_POS,        payload: { id: id, x: x, y: y } }) },
    connectStair:      (upper_id: string, upper_index: number, lower_id: string) => { return ({ type: RoomsActionTypes.CONNECT_STAIR,       payload: { upper_id: upper_id, upper_index: upper_index, lower_id: lower_id } }) },
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
}

export const selector_actions = {
    selectNothing: ()                          => { return ({ type: SelectorActionTypes.SELECT_NOTHING, payload: { name: "", id: '-1', index: -1 } }) },
    selectDoor:    (id: string)                => { return ({ type: SelectorActionTypes.SELECT_DOOR,    payload: { name: "", id: id, index: -1 } }) },
    selectStair:   (id: string, index: number) => { return ({ type: SelectorActionTypes.SELECT_STAIR,   payload: { name: "", id: id, index: index } }) },
};