// Kind
export type DoorKind = "Data" | "Process" | "Room";

export type SelectKind = "Nothing" | "Door" | "Stair";

// State
export interface ProcessState {
    name: string,
    content: string,
}

export interface StairState {
    lower_id: string,
    lower_x: number,
    lower_y: number,
}
export interface DoorState {
    id: string,
    name: string,
    kind: DoorKind,
    floor: number,
    process_name: string,
    x: number,
    y: number,
    isCorridor: boolean,
    stairs: StairState[],
}

export interface SelectState {
    select_kind: SelectKind,
    selected_door_id: string,
    selected_stair_index: number,
}
export interface RoomState {
    doors: DoorState[],
    room_width: number,
    room_height: number,
    select_state: SelectState,
}

export interface AppState {
    room: RoomState,
    processes: ProcessState[],
}