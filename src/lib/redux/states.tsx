// Kind
export type DoorKind = "Data" | "Process" | "Room";

export type SelectedKind = "Nothing" | "Door" | "Stair" | "Data" | "Process";

// State
export interface ProcessState {
    name: string,
    content: string,
    floor: number,
    num_of_inputs: number,
}

export interface DataState {
    name: string,
    value: number,
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
    ref_name: string,
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
    selecting_process: ProcessState,
}

export interface AppState {
    room: RoomState,
    datas: DataState[],
    processes: ProcessState[],
    selector: SelectorState,
}