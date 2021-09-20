import { DoorKind, DoorState, DataState, ProcessState, StructState } from "./redux/states";

interface InputState {
    id: string,
}

interface CodeState {
    id: string,
    kind: DoorKind,
    floor: number,
    data_name: string,
    process_content: string,
    inputs: InputState[],
}

export const GenerateRoomCode = (doors: DoorState[], structs: StructState[], datas: DataState[], processes: ProcessState[]) => {

    const codeStates: CodeState[] = doors.map((door) => {
        const { id, kind, floor, ref_name, stairs } = door;
        const inputs: InputState[] = stairs.map((stair) => {
            return { id: stair.lower_id }
        });

        const data_name = (kind === "Data" ? ref_name : "");
        const process_content = (kind === "Process" ? processes.find(process => process.name === ref_name)?.content as string : "");
        return { id: id, kind: kind, floor: floor, data_name: data_name, process_content: process_content, inputs: inputs };
    });

    codeStates.sort((a, b) => {
        if(a.floor < b.floor) return -1;
        if(a.floor > b.floor) return 1;
        return 0;
    });

    var code: string = "";

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
                code += "const output" + state.id + " = Data" + state.data_name + ";\n";
                break;
            case "Process":
                code += "const Process" + state.id + " = " + state.process_content + ";\n";
                code += "const output" + state.id + " = Process" + state.id + "(";
                state.inputs.forEach((input: InputState) => {
                    code += "output" + input.id + ",";
                });
                code += ");\n"
                break;
        }
    });

    code += "};\n";
    code += "tick();\n";

    return code;
};