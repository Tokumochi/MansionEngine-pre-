import { StructState } from "./redux/states";

export const GenerateInitVar = (type: string, structs: StructState[], value: Number[], index: number = 0): [string, number] | undefined => {
    switch(type) {
        case "Number":
            if(value.length <= index)
                return undefined; 
            else
                return [value[index].toString(), index + 1];
        default:
            const struct_type = structs.find(struct => struct.name === type);
            if(struct_type === undefined)
                return undefined;
            else {
                var isfirst = true;
                var code = "";
                code += "{ ";
                for(const member of struct_type?.members) {
                    const member_code = GenerateInitVar(member.type, structs, value, index);
                    if(member_code === undefined)
                        return undefined;
                    else {
                        if(isfirst) {
                            isfirst = false;
                        } else {
                            code += ", "
                        }
                        code += member.name + ": " + member_code[0];
                        index = member_code[1];
                    }
                }
                code += " }";
                return [code, index];
            }
    }
};