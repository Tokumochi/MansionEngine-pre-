// Kind
export type TypeKind = "Number" | "Struct";

export type DoorKind = "Data" | "Process" | "Room";

export type SelectedKind = "Nothing" | "Door" | "Stair" | "Data" | "Process";

export interface DataState {
    name: string,
    type: TypeKind,
    value: Number,
    members: DataState[],
}

export interface ProcessState {
    name: string,
    content: string,
    inputs: { name: string }[],
    outputs: { name: string }[],
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
    datas: DataState[],
    processes: ProcessState[],
    selector: SelectorState,
}