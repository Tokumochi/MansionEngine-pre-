import { combineReducers, createStore } from 'redux';

import { SelectedKind, DoorState, RoomState, AppState, ProcessState, SelectorState, DoorKind, DataState } from './states';
import { RoomsActionTypes, ProcessesActionTypes, SelectorActionTypes, DatasActionTypes } from './actions';

// Recuder
function AddNewDataDoorReducer() {
    return (state: RoomState[], action: { type: string, payload: { room_id: string, ref_name: string, x: number, y: number } } ): RoomState[] => {
        const door_kind: DoorKind = "Data";
        return state.map(room =>
            (room.id === action.payload.room_id) ? {
                ...room,
                doors: [...room.doors, {
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
            } : room
        )
    }
}
function AddNewProcessDoorReducer() {
    return (state: RoomState[], action: { type: string, payload: { room_id: string, process: ProcessState, x: number, y: number } } ): RoomState[] => {
        const door_kind: DoorKind = "Process";
        return state.map(room =>
            (room.id === action.payload.room_id) ? {
                ...room,
                doors: [...room.doors, {
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
            } : room
        )
    }
}
function SetDoorPositionReducer() {
    return (state: RoomState[], action: { type: string, payload: { room_id: string, id: string, x: number, y: number } } ): RoomState[] => {
        return state.map(room =>
            (room.id === action.payload.room_id) ? {
                ...room,
                doors: room.doors.map(door =>
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
            } : room
        )
    }
}
function DeleteDoorReducer() {
    return (state: RoomState[], action: { type: string, payload: { room_id: string, id: string } } ): RoomState[] => {
        return state.map(room =>
            (room.id === action.payload.room_id) ? {
                ...room,
                doors: room.doors.filter(door => {
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
            } : room
        )
    }
}
function ConnectStairReducer() {
    return (state: RoomState[], action: { type: string, payload: { room_id: string, upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number } } ): RoomState[] => {
        const lower_floor: number = action.payload.lower_door.floor;
        return state.map(room =>
            (room.id === action.payload.room_id) ? {
                ...room,
                doors: room.doors.map(door =>
                    (door.id === action.payload.upper_id && lower_floor < door.floor) ? {
                        ...door,
                        stairs: door.stairs.map((stair, index) =>
                            (index === action.payload.upper_index) ? { lower_door: action.payload.lower_door, lower_index: action.payload.lower_index } : stair
                        ),
                    } : door
                ),
            } : room
        );
    }
}

const defaultDoors: DoorState[] = [];

const initialRoomsState: RoomState[] = [{
    id: '1',
    name: "entrance",
    doors: defaultDoors,
    room_width: 2000,
    room_height: 1000,
    children: [
        {   id: '11',
            name: "moving_ball",
            doors: [],
            room_width: 2000,
            room_height: 1000,
            children: [], 
        },
    ],
}];

export const rooms_reducer = (state: any = initialRoomsState, action: any): RoomState[] => {
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

function SetNumberDataReducer() {
    return (state: DataState[], action: { type: string, payload: { id: string, value: string } } ): DataState[] => {
        const SetNumberData = (data: DataState): DataState => {
            switch(data.type) {
                case "Number":
                    return (data.id === action.payload.id) ? {
                        ...data,
                        value: Number(action.payload.value) === NaN ? data.value : Number(action.payload.value),
                    } : data;
                case "Struct":
                    return {
                        ...data,
                        members: data.members.map(member => SetNumberData(member)),
                    };
                default:
                    return data;
            }
        }
        return state.map(data => SetNumberData(data));
    }
}

const initialDatasState: DataState[] = [
    { id: '1', name: 'ball1', type: "Struct", value: -1, members: [
        { id: '11', name: 'GameObject', type: "Struct", value: -1, members: [
            { id: '111', name: 'position', type: "Struct", value: -1, members: [
                { id: '1111', name: 'x', type: "Number", value: 400, members: [] },
                { id: '1112', name: 'y', type: "Number", value: 300, members: [] },
            ]},
            { id: '112', name: 'radius', type: "Number", value: 50, members: [] },
        ]},
        { id: '12', name: 'Rigidbody', type: "Struct", value: -1, members: [
            { id: '121', name: 'velocity', type: "Struct", value: -1, members: [
                { id: '1211', name: 'x', type: "Number", value: 0, members: [] },
                { id: '1212', name: 'y', type: "Number", value: 0, members: [] },
            ]},
            { id: '122', name: 'mass', type: "Number", value: 200, members: [] },
            { id: '123', name: 'bounce', type: "Number", value: 0.5, members: [] },
        ]},
    ]},
    { id: '2', name: 'ball2', type: "Struct", value: -1, members: [
        { id: '21', name: 'GameObject', type: "Struct", value: -1, members: [
            { id: '211', name: 'position', type: "Struct", value: -1, members: [
                { id: '2111', name: 'x', type: "Number", value: 200, members: [] },
                { id: '2112', name: 'y', type: "Number", value: 200, members: [] },
            ]},
            { id: '212', name: 'radius', type: "Number", value: 80, members: [] },
        ]},
        { id: '22', name: 'Rigidbody', type: "Struct", value: -1, members: [
            { id: '221', name: 'velocity', type: "Struct", value: -1, members: [
                { id: '2211', name: 'x', type: "Number", value: 4, members: [] },
                { id: '2212', name: 'y', type: "Number", value: 3, members: [] },
            ]},
            { id: '222', name: 'mass', type: "Number", value: 100, members: [] },
            { id: '223', name: 'bounce', type: "Number", value: 0.5, members: [] },
        ]},
    ]},
];

export const datas_reducer = (state: any = initialDatasState, action: any): DataState[] => {
    switch(action.type) {
        case DatasActionTypes.SET_NUMBER_DATA:
            return SetNumberDataReducer()(state, action);
        default:
            return state;
    }
};

function SetProcessContentReducer() {
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
        "    const d = { x: b.GameObject.position.x - a.GameObject.position.x, y: b.GameObject.position.y - a.GameObject.position.y };\n" +
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
            return SetProcessContentReducer()(state, action);
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
    rooms: rooms_reducer,
    datas: datas_reducer,
    processes: processes_reducer,
    selector: selector_reducer,
});

export default createStore(reducers);