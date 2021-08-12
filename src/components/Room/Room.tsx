import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { GenerateRoomCode } from '../../lib/CodeGenerator';
import { actions, RoomState } from '../../lib/redux';
import { Door } from '../Door/Door'

import './Room.css';

export interface RoomProps extends RoomState {
    onDoorPosChanged(id: number, x: number, y: number): void
    onDoorSelected(id: number): void
}

export const Room: FC<RoomProps> = ( { doors, room_width, room_height, selected_door_id, onDoorPosChanged, onDoorSelected }: RoomProps ) => {
    const [ targetX, setTargetX ] = useState(-1);
    const [ targetY, setTargetY ] = useState(-1);
    const url: string = "run.html";
    return (
        <svg version="1.1" width={room_width * 300} height={room_height * 150}>
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
                    if(selected_door_id !== -1) {
                        onDoorPosChanged(selected_door_id, targetX, targetY);
                        onDoorSelected(-1);
                    }
                }}
            />
                { doors.map((door, index) =>
                    {
                        return (
                            //<div className="door">
                                <Door key={index} door={door} selected_door_id={selected_door_id} onDoorPosChanged={onDoorPosChanged} onDoorSelected={onDoorSelected}/>
                            //</div>
                        );
                    }
                ) }
            <text x="75" y="50" textAnchor="middle" fontSize="20" fill="black">実行</text>
            <rect className="run_button"
                onClick={() => {
                    window.open(url, "_blank");
                }
            }/>
            <text x="200" y="50" textAnchor="middle" fontSize="20" fill="black">保存</text>
            <rect className="save_button"
                onClick={() => {
                    localStorage.setItem('RoomCode', GenerateRoomCode(doors));
                }
            }/>
        </svg>
    );
}

export default connect(
    (props: RoomProps) => ({
        doors: props.doors,
        room_width: props.room_width,
        room_height: props.room_height,
        selected_door_id: props.selected_door_id,
    }),
    dispatch => ({
        onDoorPosChanged: (id: number, x: number, y: number) => dispatch(actions.setDoorPos(id, x, y)),
        onDoorSelected: (id: number) => dispatch(actions.selectDoor(id)),
    })
)(Room);