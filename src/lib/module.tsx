import { DataState, DoorState } from "./redux/states"

const gen_data_id = (datas: DataState[]): string => {
    var data_id = "";
    do {
        data_id = Math.random().toString(32).substring(2);
    } while(datas.find(data => data.id === data_id) === undefined);

    return data_id;
}

const gen_door_id = (doors: DoorState[]): string => {
    var door_id = "";
    do {
        door_id = Math.random().toString(32).substring(2);
    } while(doors.find(door => door.id === door_id) === undefined);

    return door_id;
}