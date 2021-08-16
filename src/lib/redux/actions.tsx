// Actions
export enum RoomsActionTypes {
    SET_DOOR_POS = 'SET_DOOR_POS',
    CONNECT_STAIR = 'CONNECT_STAIR',
    SELECT_NOTHING = 'SELECT_NOTHING',
    SELECT_DOOR = 'SELECT_DOOR',
    SELECT_STAIR = 'SELECT_STAIR',
    SET_PROCESS_CONTENT = 'SET_PROCESS_CONTENT',
}

export const rooms_actions = {
    setDoorPos:        (id: string, x: number, y: number)                        => { return ({ type: RoomsActionTypes.SET_DOOR_POS,        payload: { id: id, x: x, y: y } }) },
    connectStair:      (upper_id: string, upper_index: number, lower_id: string) => { return ({ type: RoomsActionTypes.CONNECT_STAIR,       payload: { upper_id: upper_id, upper_index: upper_index, lower_id: lower_id } }) },
    selectNothing:     ()                                                        => { return ({ type: RoomsActionTypes.SELECT_NOTHING,      payload: { id: '-1', index: -1 } }) },
    selectDoor:        (id: string)                                              => { return ({ type: RoomsActionTypes.SELECT_DOOR,         payload: { id: id, index: -1 } }) },
    selectStair:       (id: string, index: number)                               => { return ({ type: RoomsActionTypes.SELECT_STAIR,        payload: { id: id, index: index } }) },
    setProcessContent: (id: string, content: string)                             => { return ({ type: RoomsActionTypes.SET_PROCESS_CONTENT, payload: { id: id, content: content } }) },
};

export enum ProcessesActionTypes {

}

export const processes_actions = {

};