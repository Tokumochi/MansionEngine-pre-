// Kind
export type DoorKind = "Data" | "Process" | "Room";

export type SelectedKind = "Nothing" | "Door" | "Stair" | "Construction";

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

export interface RoomState {
    doors: DoorState[],
    room_width: number,
    room_height: number,
}

export interface SelectorState {
    selecting_kind: SelectedKind,
    selecting_name: string,
    selecting_id: string,
    selecting_index: number,
}

export interface AppState {
    room: RoomState,
    processes: ProcessState[],
    selector: SelectorState,
}