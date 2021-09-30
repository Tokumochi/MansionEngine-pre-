// Kind
export type DoorKind = "Data" | "Process" | "Room";

export type SelectedKind = "Nothing" | "Door" | "Stair" | "Data" | "Process";

// States
export interface StructState {
    name: string,
    members: { name: string, type: string }[],
}

export interface DataState {
    name: string,
    type: string,
    value: Number[],
}

export interface ProcessState {
    name: string,
    content: string,
    inputs: { name: string, type: string }[],
    outputs: { name: string, type: string }[],
    floor: number,
}

export interface StairState {
    lower_door: DoorState | undefined,
    lower_index: number,
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
    num_of_output: number,
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
    structs: StructState[],
    datas: DataState[],
    processes: ProcessState[],
    selector: SelectorState,
}