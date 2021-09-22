import { combineReducers, createStore } from 'redux';

import { SelectedKind, DoorState, RoomState, AppState, ProcessState, SelectorState, DoorKind, DataState, StructState } from './states';
import { RoomsActionTypes, ProcessesActionTypes, SelectorActionTypes } from './actions';

// Recuder
function AddNewDataDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { ref_name: string, x: number, y: number } } ) => {
        const door_kind: DoorKind = "Data";
        return {
            ...state,
            doors: [...state.doors, {
                id: Math.random().toString(32).substring(2),
                name: action.payload.ref_name + '(data)',
                kind: door_kind,
                x: action.payload.x,
                y: action.payload.y,
                floor: 0,
                ref_name: action.payload.ref_name,
                isCorridor: false,
                stairs: [],
                num_of_output: 1,
            } ],
        }
    }
}
function AddNewProcessDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { process: ProcessState, x: number, y: number } } ) => {
        const door_kind: DoorKind = "Process";
        return {
            ...state,
            doors: [...state.doors, {
                id: Math.random().toString(32).substring(2),
                name: action.payload.process.name + '(process)',
                kind: door_kind,
                x: action.payload.x,
                y: action.payload.y,
                floor: action.payload.process.floor,
                ref_name: action.payload.process.name,
                isCorridor: false,
                stairs: Array.from(Array(action.payload.process.inputs.length), () => { return { lower_door: undefined, lower_index: -1 } }),
                num_of_output: action.payload.process.outputs.length,
            } ],
        }
    }
}
function SetDoorPositionReducer() {
    return (state: RoomState, action: { type: string, payload: { id: string, x: number, y: number } } ) => {
        return {
            ...state,
            doors: state.doors.map(door =>
                door.id === action.payload.id ? { ...door, x: action.payload.x, y: action.payload.y } : {
                    ...door,
                    stairs: door.stairs.map(stair => 
                        ( stair.lower_door !== undefined && stair.lower_door.id === action.payload.id ) ? {
                            ...stair,
                            lower_door: {
                                ...stair.lower_door,
                                x: action.payload.x,
                                y: action.payload.y
                            } 
                        }: stair
                    ),
                }
            ),
        }
    }
}
function DeleteDoorReducer() {
    return (state: RoomState, action: { type: string, payload: { id: string } } ) => {
        return {
            ...state,
            doors: state.doors.filter(door => {
                return door.id !== action.payload.id;
            })
            .map(door => {
                return {
                    ...door,
                    stairs: door.stairs.map(stair =>
                        (stair.lower_door !== undefined && stair.lower_door.id === action.payload.id) ? { lower_door: undefined, lower_index: -1 } : stair
                    ),
                }
            }),
        }
    }
}
function ConnectStairReducer() {
    return (state: RoomState, action: { type: string, payload: { upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number } } ): RoomState => {
        const lower_floor: number = action.payload.lower_door.floor;

        return {
            ...state,
            doors: state.doors.map(door =>
                (door.id === action.payload.upper_id && lower_floor < door.floor) ? {
                    ...door,
                    stairs: door.stairs.map((stair, index) =>
                        (index === action.payload.upper_index) ? { lower_door: action.payload.lower_door, lower_index: action.payload.lower_index } : stair
                    ),
                } : door
            ),
        }
    }
}

const defaultDoors: DoorState[] = [];

const initialRoomsState: RoomState = {
    doors: defaultDoors,
    room_width: 2000,
    room_height: 1000,
};

export const rooms_reducer = (state: any = initialRoomsState, action: any): RoomState => {
    switch(action.type) {
        case RoomsActionTypes.ADD_NEW_DATA_DOOR:
            return AddNewDataDoorReducer()(state, action);
        case RoomsActionTypes.ADD_NEW_PROCESS_DOOR:
            return AddNewProcessDoorReducer()(state, action);
        case RoomsActionTypes.SET_DOOR_POS:
            return SetDoorPositionReducer()(state, action);
        case RoomsActionTypes.DELETE_DOOR:
            return DeleteDoorReducer()(state, action);
        case RoomsActionTypes.CONNECT_STAIR:
            return ConnectStairReducer()(state, action);
        default:
            return state;
    }
};

const initialStructsState: StructState[] = [
    { name: "Vector2d", members: [
        { name: "x", type: "Number" },
        { name: "y", type: "Number" },
    ] },
];

export const structs_reducer = (state: any = initialStructsState, action: any): StructState[] => {
    switch(action.type) {
        default:
            return state;
    }
};

const initialDatasState: DataState[] = [
    { name: 'ball1_position', type: "Vector2d", value: [400, 300] },
    { name: 'ball2_position', type: "Vector2d", value: [200, 200] },
    { name: 'ball1_velocity', type: "Vector2d", value: [0, 0] },
    { name: 'ball2_velocity', type: "Vector2d", value: [4, 3] },
    { name: 'ball_acceleration', type: "Number", value: 1 },
];

export const datas_reducer = (state: any = initialDatasState, action: any): DataState[] => {
    switch(action.type) {
        default:
            return state;
    }
};

function SetProcessContent() {
    return (state: ProcessState[], action: { type: string, payload: { name: string, content: string } } ): ProcessState[] => {
        return state.map(process => 
            process.name === action.payload.name ? {
                ...process,
                content: action.payload.content,
            } : process
        );
    }
}

const initialProcessesState: ProcessState[] = [
    { name: 'Impulse', 
      content: 
        "if(Math.pow(a_pos.x - b_pos.x, 2) + Math.pow(a_pos.y - b_pos.y, 2) <= Math.pow(50 + 50, 2)) {\n" +
        "    const relativeVelocity = Math.sqrt(Math.pow(b_vel.x - a_vel.x, 2) + Math.pow(b_vel.y - a_vel.y, 2));\n" +
        "    const d = { x: b_pos.x - a_pos.x, y: b_pos.y - a_pos.y };\n" +
        "    const len = Math.sqrt(d.x * d.x + d.y * d.y);\n" +
        "    const collisionNormal = { x: d.x / len, y: d.y / len };\n" +
        "    const J = - relativeVelocity * (1 + 1) / (1 / 1 + 1 / 1);\n" +
        "    updated_a_vel = { x: a_vel.x + J * collisionNormal.x / 1, y: a_vel.y + J * collisionNormal.y / 1 };\n" +
        "    updated_b_vel = { x: b_vel.x - J * collisionNormal.x / 1, y: b_pos.y - J * collisionNormal.y / 1 };\n" +
        "} else {\n" +
        "    updated_a_vel = a_pos;\n" +
        "    updated_b_vel = b_pos;\n" +
        "}\n",
      floor: 2,
      inputs: [ { name: "a_pos", type: "Vector2d" }, { name: "b_pos", type: "Vector2d" }, { name: "a_vel", type: "Vector2d" }, { name: "b_vel", type: "Vector2d" } ],
      outputs: [ { name: "updated_a_vel", type: "Vector2d" }, { name: "updated_b_vel", type: "Vector2d" } ]
    },
    { name: 'add', content: "c = a + b;\n", floor: 2,
      inputs: [ { name: "a", type: "Number" }, { name: "b", type: "Number" } ],
      outputs: [ { name: "c", type: "Number" } ]
    },
    { name: 'add_vector2d', content: "c = { x: a.x + b.x, y: a.y + b.y };\n", floor: 3,
      inputs: [ { name: "a", type: "Vector2d" }, { name: "b", type: "Vector2d" } ],
      outputs: [ { name: "c", type: "Vector2d" } ]
    },
    { name: 'sub_vector2d', content: "c = { x: a.x - b.x, y: a.y - b.y };\n", floor: 3,
      inputs: [ { name: "a", type: "Vector2d" }, { name: "b", type: "Vector2d" } ],
      outputs: [ { name: "c", type: "Vector2d" } ]
    },
    { name: 'fill_back', content: "const background = new Path2D(); background.rect(0, 0, 800, 600); ctx.fillStyle = 'black'; ctx.fill(background);\n", floor: 3, inputs: [], outputs: [] },
    { name: 'fill_ball_vector2d', content: "const circle = new Path2D(); circle.arc(v.x, v.y, 50, 0, 2 * Math.PI); ctx.fillStyle = 'blue'; ctx.fill(circle);\n", floor: 4,
      inputs: [ { name: "v", type: "Vector2d" } ], outputs: [] 
    },
    { name: 'update_ball1_position', content: "Setball1_position(pos);\n", floor: 4,
      inputs: [ { name: "pos", type: "Vector2d" } ], outputs: []
    },
    { name: 'update_ball2_position', content: "Setball2_position(pos);\n", floor: 4,
      inputs: [ { name: "pos", type: "Vector2d" } ], outputs: []
    },
    { name: 'update_ball1_velocity', content: "Setball1_velocity(vel);\n", floor: 4,
      inputs: [ { name: "vel", type: "Vector2d" } ], outputs: []
    },
    { name: 'update_ball2_velocity', content: "Setball2_velocity(vel);\n", floor: 4,
      inputs: [ { name: "vel", type: "Vector2d" } ], outputs: [] 
    },
];

export const processes_reducer = (state: any = initialProcessesState, action: any): ProcessState[] => {
    switch(action.type) {
        case ProcessesActionTypes.SET_PROCESS_CONTENT:
            return SetProcessContent()(state, action);
        default: 
            return state;
    }
};

function SelectSomething(kind: SelectedKind) {
    return (state: SelectorState, action: { type: string, payload: { name: string, id: string, index: number, process: ProcessState } } ): SelectorState => {
        return {
            selecting_kind: kind,
            selecting_name: action.payload.name,
            selecting_id: action.payload.id,
            selecting_index: action.payload.index,
            selecting_process: action.payload.process,
        }
    }
}

const initialSelectorState: SelectorState = {
    selecting_kind: "Nothing",
    selecting_name: "",
    selecting_id: "-1",
    selecting_index: -1,
    selecting_process: { name: '', content: "", floor: -1, inputs: [], outputs: [] },
};

export const selector_reducer = (state: any = initialSelectorState, action: any): SelectorState => {
    switch(action.type) {
        case SelectorActionTypes.SELECT_NOTHING:
            return SelectSomething("Nothing")(state, action);
        case SelectorActionTypes.SELECT_DOOR:
            return SelectSomething("Door")(state, action);
        case SelectorActionTypes.SELECT_STAIR:
            return SelectSomething("Stair")(state, action);
        case SelectorActionTypes.SELECT_DATA:
            return SelectSomething("Data")(state, action);
        case SelectorActionTypes.SELECT_PROCESS:
            return SelectSomething("Process")(state, action);
        default:
            return state;
    }
};

const reducers = combineReducers<AppState>({
    room: rooms_reducer,
    structs: structs_reducer,
    datas: datas_reducer,
    processes: processes_reducer,
    selector: selector_reducer,
});

export default createStore(reducers);