import { FC } from 'react';
import { connect } from 'react-redux';
import { AppState, DoorState, ProcessState, RoomState, SelectorState } from '../../lib/redux/states';
import { rooms_actions, selector_actions } from '../../lib/redux/actions';
import { Door } from '../Door/Door'

import './Room.css';

export interface RoomProps {
    room: RoomState,
    selector: SelectorState,
    onAddingNewDataDoor(ref_name: string, x: number, y: number): void,
    onAddingNewProcessDoor(process: ProcessState, x: number, y: number): void,
    onDoorPosChanged(id: string, x: number, y: number): void,
    onDeleteDoor(id: string): void,
    onStairConnected(upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Room: FC<RoomProps> = ( { room, selector, onAddingNewDataDoor, onAddingNewProcessDoor, onDoorPosChanged, onDeleteDoor, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: RoomProps ) => {
    const { doors, room_width, room_height } = room;
    const { selecting_kind, selecting_id, selecting_index, selecting_name, selecting_process } = selector;
    const url: string = "run.html";
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={room_width} height={room_height}>
            <rect className="board"
                width={room_width} height={room_height} fill="#eef"
                onClick={(e) => {
                    if(selecting_kind === "Door" && selecting_id !== '-1') {
                        onDoorPosChanged(selecting_id, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                        onNothingSelected();
                    } else
                    if(selecting_kind == "Data") {
                        onAddingNewDataDoor(selecting_name, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                        onNothingSelected();
                    } else
                    if(selecting_kind === "Process") {
                        onAddingNewProcessDoor(selecting_process, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                        onNothingSelected();
                    }
                }}
            />

            { 
                doors.map((door, index) => {
                    return (
                        <Door key={index} door={door} selector={selector} onDoorPosChanged={onDoorPosChanged} onDeleteDoor={onDeleteDoor} onStairConnected={onStairConnected} onNothingSelected={onNothingSelected} onDoorSelected={onDoorSelected} onStairSelected={onStairSelected}/>
                    );
                }) 
            }
        </svg>
    );
}

export default connect(
    (props: AppState) => ({
        room: props.room,
        datas: props.datas,
        processes: props.processes,
        selector: props.selector,
    }),
    dispatch => ({
        onAddingNewDataDoor: (ref_name: string, x: number, y: number) => dispatch(rooms_actions.addNewDataDoor(ref_name, x, y)),
        onAddingNewProcessDoor: (process: ProcessState, x: number, y: number) => dispatch(rooms_actions.addNewProcessDoor(process, x, y)),
        onDoorPosChanged: (id: string, x: number, y: number) => dispatch(rooms_actions.setDoorPos(id, x, y)),
        onDeleteDoor: (id: string) => dispatch(rooms_actions.deleteDoor(id)),
        onStairConnected: (upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number) => dispatch(rooms_actions.connectStair(upper_id, upper_index, lower_door, lower_index)),
        onNothingSelected: () => dispatch(selector_actions.selectNothing()),
        onDoorSelected: (id: string) => dispatch(selector_actions.selectDoor(id)),
        onStairSelected: (id: string, index: number) => dispatch(selector_actions.selectStair(id, index)),
    })
)(Room);