import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { GenerateRoomCode } from '../../lib/CodeGenerator';
import { actions, RoomState } from '../../lib/redux';
import { Door } from '../Door/Door'

import './Room.css';

export interface RoomProps extends RoomState {
    onDoorPosChanged(id: string, x: number, y: number): void,
    onStairConnected(upper_id: string, upper_index: number, lower_id: string): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Room: FC<RoomProps> = ( { doors, room_width, room_height, select_state, onDoorPosChanged, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: RoomProps ) => {
    const [ targetX, setTargetX ] = useState(-1);
    const [ targetY, setTargetY ] = useState(-1);
    const { select_kind, selected_door_id, selected_stair_index } = select_state;
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
                    if(select_kind == "Door" && selected_door_id !== '-1') {
                        onDoorPosChanged(selected_door_id, targetX, targetY);
                        onNothingSelected();
                    }
                }}
            />
                { doors.map((door, index) =>
                    {
                        return (
                            <Door key={index} door={door} select_state={select_state} onDoorPosChanged={onDoorPosChanged} onStairConnected={onStairConnected} onNothingSelected={onNothingSelected} onDoorSelected={onDoorSelected} onStairSelected={onStairSelected}/>
                        );
                    }
                ) }
            <a href={url} target="_blank">
                <rect className="run_button"/>
                <text x="75" y="50" textAnchor="middle" fontSize="20" fill="black">実行</text>
            </a>
            <rect className="save_button" cursor="pointer"
                onClick={() => {
                    localStorage.setItem('RoomCode', GenerateRoomCode(doors));
                }
            }/>
            <text x="200" y="50" textAnchor="middle" fontSize="20" fill="black" pointerEvents="none">保存</text>
        </svg>
    );
}

export default connect(
    (props: RoomProps) => ({
        doors: props.doors,
        room_width: props.room_width,
        room_height: props.room_height,
        //selected_door_id: props.selected_door_id,
        select_state: props.select_state,
    }),
    dispatch => ({
        onDoorPosChanged: (id: string, x: number, y: number) => dispatch(actions.setDoorPos(id, x, y)),
        onStairConnected: (upper_id: string, upper_index: number, lower_id: string) => dispatch(actions.connectStair(upper_id, upper_index, lower_id)),
        onNothingSelected: () => dispatch(actions.selectNothing()),
        onDoorSelected: (id: string) => dispatch(actions.selectDoor(id)),
        onStairSelected: (id: string, index: number) => dispatch(actions.selectStair(id, index)),
    })
)(Room);