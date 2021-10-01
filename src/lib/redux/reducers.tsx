import { combineReducers, createStore } from 'redux';

import { SelectedKind, DoorState, RoomState, AppState, ProcessState, SelectorState, DoorKind, DataState } from './states';
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

const initialDatasState: DataState[] = [
    { name: 'ball1', type: "Struct", value: -1, members: [
        { name: 'GameObject', type: "Struct", value: -1, members: [
            { name: 'position', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 400, members: [] },
                { name: 'y', type: "Number", value: 300, members: [] },
            ]},
            { name: 'radius', type: "Number", value: 50, members: [] },
        ]},
        { name: 'Rigidbody', type: "Struct", value: -1, members: [
            { name: 'velocity', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 0, members: [] },
                { name: 'y', type: "Number", value: 0, members: [] },
            ]},
            { name: 'mass', type: "Number", value: 200, members: [] },
            { name: 'bounce', type: "Number", value: 0.5, members: [] },
        ]},
    ]},
    { name: 'ball2', type: "Struct", value: -1, members: [
        { name: 'GameObject', type: "Struct", value: -1, members: [
            { name: 'position', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 200, members: [] },
                { name: 'y', type: "Number", value: 200, members: [] },
            ]},
            { name: 'radius', type: "Number", value: 80, members: [] },
        ]},
        { name: 'Rigidbody', type: "Struct", value: -1, members: [
            { name: 'velocity', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 4, members: [] },
                { name: 'y', type: "Number", value: 3, members: [] },
            ]},
            { name: 'mass', type: "Number", value: 100, members: [] },
            { name: 'bounce', type: "Number", value: 0.5, members: [] },
        ]},
    ]},
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
    { name: 'move_ball',
      content:
        "ball.GameObject.position.x += ball.Rigidbody.velocity.x;\n" +
        "ball.GameObject.position.y += ball.Rigidbody.velocity.y;\n" +
        "moved_ball = ball;\n",
      floor: 2,
      inputs: [ { name: "ball" } ],
      outputs: [ { name: "moved_ball" } ],
    },
    { name: 'Impulse', 
      content: 
        "updated_a = a;" +
        "updated_b = b;" +
        "if(Math.pow(a.GameObject.position.x - b.GameObject.position.x, 2) + Math.pow(a.GameObject.position.y - b.GameObject.position.y, 2) <= Math.pow(a.GameObject.radius + b.GameObject.radius, 2)) {\n" +
        "    const relativeVelocity = Math.sqrt(Math.pow(b.Rigidbody.velocity.x - a.Rigidbody.velocity.x, 2) + Math.pow(b.Rigidbody.velocity.y - a.Rigidbody.velocity.y, 2));\n" +
        "    const d = { x: b.position.x - a.position.x, y: b.position.y - a.position.y };\n" +
        "    const len = Math.sqrt(d.x * d.x + d.y * d.y);\n" +
        "    const collisionNormal = { x: d.x / len, y: d.y / len };\n" +
        "    const J = - relativeVelocity * (a.Rigidbody.bounce + b.Rigidbody.bounce) / (1 / a.Rigidbody.mass + 1 / b.Rigidbody.mass);\n" +
        "    updated_a.Rigidbody.velocity = { x: a.Rigidbody.velocity.x + J * collisionNormal.x / a.Rigidbody.mass, y: a.Rigidbody.velocity.y + J * collisionNormal.y / a.Rigidbody.mass };\n" +
        "    updated_b.Rigidbody.velocity = { x: b.Rigidbody.velocity.x - J * collisionNormal.x / b.Rigidbody.mass, y: b.Rigidbody.velocity.y - J * collisionNormal.y / b.Rigidbody.mass };\n" +
        "}\n",
      floor: 5,
      inputs: [ { name: "a" }, { name: "b" } ],
      outputs: [ { name: "updated_a" }, { name: "updated_b" } ]
    },
    { name: 'add', content: "c = a + b;\n", floor: 3,
      inputs: [ { name: "a" }, { name: "b" } ],
      outputs: [ { name: "c" } ]
    },
    { name: 'add_vector2d', content: "c = { x: a.x + b.x, y: a.y + b.y };\n", floor: 3,
      inputs: [ { name: "a" }, { name: "b" } ],
      outputs: [ { name: "c" } ]
    },
    { name: 'sub_vector2d', content: "c = { x: a.x - b.x, y: a.y - b.y };\n", floor: 3,
      inputs: [ { name: "a" }, { name: "b" } ],
      outputs: [ { name: "c" } ]
    },
    { name: 'fill_back', content: "const background = new Path2D(); background.rect(0, 0, 800, 600); ctx.fillStyle = 'black'; ctx.fill(background);\n", floor: 9, inputs: [], outputs: [] },
    { name: 'fill_ball', content: "const circle = new Path2D(); circle.arc(ball.GameObject.position.x, ball.GameObject.position.y, ball.GameObject.radius, 0, 2 * Math.PI); ctx.fillStyle = 'blue'; ctx.fill(circle);\n", floor: 10,
      inputs: [ { name: "ball" } ], outputs: [] 
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
    datas: datas_reducer,
    processes: processes_reducer,
    selector: selector_reducer,
});

export default createStore(reducers);