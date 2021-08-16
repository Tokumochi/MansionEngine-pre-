import { DoorKind, DoorState, ProcessState } from "./redux/states";

interface InputState {
    id: string,
}

interface CodeState {
    id: string,
    kind: DoorKind,
    floor: number,
    process_content: string,
    inputs: InputState[],
}

export const GenerateRoomCode = (doors: DoorState[], processes: ProcessState[]) => {

    const codeStates: CodeState[] = doors.map((door) => {
        const { id, kind, floor, process_name, stairs } = door;
        const inputs: InputState[] = stairs.map((stair) => {
            return { id: stair.lower_id }
        });
        const process_content = processes.find(process => process.name == process_name)?.content as string;
        return { id: id, kind: kind, floor: floor, process_content: process_content, inputs: inputs };
    });

    codeStates.sort((a, b) => {
        if(a.floor < b.floor) return -1;
        if(a.floor > b.floor) return 1;
        return 0;
    });

    var code: string = "";

    codeStates.forEach((state: CodeState) => {
        code += "const Process" + state.id + " = " + state.process_content + "; ";
        code += "const output" + state.id + " = Process" + state.id + "(";
        state.inputs.forEach((input: InputState) => {
            code += "output" + input.id + ",";
        });
        code += "); "
    });

    return code;
};