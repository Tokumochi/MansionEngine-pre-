import { DoorKind, DoorState, DataState, ProcessState, StructState } from "./redux/states";

interface InputState {
    id: string,
    kind: DoorKind,
    index: number,
}

interface CodeState {
    id: string,
    kind: DoorKind,
    floor: number,
    ref_name: string,
    inputs: InputState[],
}

export const GenerateRoomCode = (doors: DoorState[], structs: StructState[], datas: DataState[], processes: ProcessState[]) => {

    const codeStates: CodeState[] = doors.map((door) => {
        const { id, kind, floor, ref_name, stairs } = door;
        const inputs: InputState[] = stairs.map((stair) => {
            const input_id: string = ( stair.lower_door === undefined ) ? "" : stair.lower_door.id;
            const input_kind: DoorKind = ( stair.lower_door === undefined ) ? "Data" : stair.lower_door.kind;
            return { id: input_id, kind: input_kind, index: stair.lower_index }
        });

        return { id: id, kind: kind, floor: floor, ref_name: ref_name, inputs: inputs };
    });

    codeStates.sort((a, b) => {
        if(a.floor < b.floor) return -1;
        if(a.floor > b.floor) return 1;
        return 0;
    });

    var code: string = "";

    processes.forEach((process: ProcessState) => {
        const { name, content, inputs, outputs } = process;
        code += "const Process" + name + " = (";
        inputs.forEach(input => {
            const { name } = input;
            code += name + ",";
        });
        code += ") => {\n" + content + "return [";
        outputs.forEach(output => {
            const { name } = output;
            code += name + ",";
        })
        code += "];\n}\n";
    });

    datas.forEach((data: DataState) => {
        const { name, type, value } = data;
        if(type === "Number") {
            code += "var Data" + name + " = " + value + ";\n";
        } else {
            const struct_type = structs.find(struct => struct.name === type);
            const value_array = value as Number[];
            code += "var Data" + name + " = { ";
            struct_type?.members.forEach((member, index) => {
                code += member.name + ": " + value_array[index] + ", ";
            });
            code += "};\n";
        }
        code += "function Set" + name + "(val) { Data" + name + " = val; }\n";
    });

    code += "const canvas = document.createElement('canvas');\n";
    code += "canvas.width = 800;\n";
    code += "canvas.height = 600;\n";
    code += "document.body.appendChild(canvas);\n";
    code += "const ctx = canvas.getContext('2d');\n";
    
    code += "const tick = () => {\n";
    code += "requestAnimationFrame(tick);\n";

    codeStates.forEach((state: CodeState) => {
        switch(state.kind) {
            case "Data":
                code += "const output" + state.id + " = Data" + state.ref_name + ";\n";
                break;
            case "Process":
                code += "const output" + state.id + " = Process" + state.ref_name + "(";
                state.inputs.forEach((input: InputState) => {
                    if(input.kind === "Data") {
                        code += "output" + input.id + ",";
                    } else {
                        code += "output" + input.id + "[" + input.index + "],";
                    }
                });
                code += ");\n"
                break;
        }
    });

    code += "};\n";
    code += "tick();\n";

    return code;
};