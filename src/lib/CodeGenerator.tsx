import { DoorKind, DoorState, RoomState } from "./redux/states";

interface InputState {
    id: string,
}

interface CodeState {
    id: string,
    kind: DoorKind,
    floor: number,
    //process_src: string,
    process_string: string,
    inputs: InputState[],
}

export const GenerateRoomCode = (doors: DoorState[]) => {

    const codeStates: CodeState[] = doors.map((door) => {
        const { id, kind, floor, process_string, stairs } = door;
        const inputs: InputState[] = stairs.map((stair) => {
            return { id: stair.lower_id }
        });
        return { id: id, kind: kind, floor: floor, process_string: process_string, inputs: inputs };
    });

    codeStates.sort((a, b) => {
        if(a.floor < b.floor) return -1;
        if(a.floor > b.floor) return 1;
        return 0;
    });

    var code: string = "";

    codeStates.forEach((state: CodeState) => {
        code += "const Process" + state.id + " = " + state.process_string + "; ";
        code += "const output" + state.id + " = Process" + state.id + "(";
        state.inputs.forEach((input: InputState) => {
            code += "output" + input.id + ",";
        });
        code += "); "
    });

    return code;
};