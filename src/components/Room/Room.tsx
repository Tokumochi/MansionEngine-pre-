import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { GenerateRoomCode } from '../../lib/CodeGenerator';
import { AppState, ProcessState, RoomState, SelectorState } from '../../lib/redux/states';
import { rooms_actions, selector_actions } from '../../lib/redux/actions';
import { Door } from '../Door/Door'

import './Room.css';

export interface RoomProps {
    room: RoomState,
    processes: ProcessState[],
    selector: SelectorState,
    onAddingNewProcessDoor(process: ProcessState, x: number, y: number): void,
    onDoorPosChanged(id: string, x: number, y: number): void,
    onStairConnected(upper_id: string, upper_index: number, lower_id: string): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Room: FC<RoomProps> = ( { room, processes, selector, onAddingNewProcessDoor, onDoorPosChanged, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: RoomProps ) => {
    const { doors, room_width, room_height } = room;
    const [ targetX, setTargetX ] = useState(-1);
    const [ targetY, setTargetY ] = useState(-1);
    const { selecting_kind, selecting_id, selecting_index, selecting_name, selecting_process } = selector;
    const url: string = "run.html";
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={room_width * 300} height={room_height * 150}>
            <rect className="board"
                //style={{width: room_width * 300, height: room_height * 150}}
                width={room_width * 300} height={room_height * 150} fill="#eef"
                onMouseMove={e => {
                    const newTargetX: number = Math.floor(e.nativeEvent.offsetX / 300);
                    const newTargetY: number = Math.floor(e.nativeEvent.offsetY / 150);
                    if(targetX !== newTargetX || targetY !== newTargetY) {
                        setTargetX(newTargetX);
                        setTargetY(newTargetY);
                    }
                }}
            />
            <rect className="target" x={targetX * 300} y={targetY * 150}
                //style={{left: targetX * 300, top: targetY * 150}}
                onClick={() => {
                    if(selecting_kind === "Door" && selecting_id !== '-1') {
                        onDoorPosChanged(selecting_id, targetX, targetY);
                        onNothingSelected();
                    } else
                    if(selecting_kind === "Process") {
                        onAddingNewProcessDoor(selecting_process, targetX, targetY);
                        onNothingSelected();
                    }
                }}
            />
                { doors.map((door, index) =>
                    {
                        return (
                            <Door key={index} door={door} selector={selector} onDoorPosChanged={onDoorPosChanged} onStairConnected={onStairConnected} onNothingSelected={onNothingSelected} onDoorSelected={onDoorSelected} onStairSelected={onStairSelected}/>
                        );
                    }
                ) }
            <a href={url} target="_blank">
                <rect className="run_button"/>
                <text x="75" y="50" textAnchor="middle" fontSize="20" fill="black">実行</text>
            </a>
            <rect className="save_button" cursor="pointer"
                onClick={() => {
                    localStorage.setItem('RoomCode', GenerateRoomCode(doors, processes));
                }
            }/>
            <text x="200" y="50" textAnchor="middle" fontSize="20" fill="black" pointerEvents="none">保存</text>
        </svg>
    );
}

export default connect(
    (props: AppState) => ({
        room: props.room,
        processes: props.processes,
        selector: props.selector,
    }),
    dispatch => ({
        onAddingNewProcessDoor: (process: ProcessState, x: number, y: number) => dispatch(rooms_actions.addNewDoor(process, x, y)),
        onDoorPosChanged: (id: string, x: number, y: number) => dispatch(rooms_actions.setDoorPos(id, x, y)),
        onStairConnected: (upper_id: string, upper_index: number, lower_id: string) => dispatch(rooms_actions.connectStair(upper_id, upper_index, lower_id)),
        onNothingSelected: () => dispatch(selector_actions.selectNothing()),
        onDoorSelected: (id: string) => dispatch(selector_actions.selectDoor(id)),
        onStairSelected: (id: string, index: number) => dispatch(selector_actions.selectStair(id, index)),
    })
)(Room);