import { FC } from 'react';
import { connect } from 'react-redux';
import {  AppState, RoomState } from '../../lib/redux/states';

import "./Mansion.css"

export interface MansionProps {
    rooms: RoomState[],
}

const ChildRoom = (room: RoomState, depth: number = 0): JSX.Element => {
    return (
        <div key={room.id}>
            <div className="room" style={{paddingLeft: 10 * depth}}>
                { room.name }
            </div>
            { room.children.map((child) => {
                return ChildRoom(child, depth + 1);
            }) }
        </div>
    );
}

export const Mansion: FC<MansionProps> = ({ rooms }: MansionProps) => {
    return (
        <div className="mansion_base">
            {
                rooms.map((room, index) => {
                    const { name } = room;
                    return (
                        <div key={index} className="room_base">
                            { ChildRoom(room) }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default connect(
    (props: AppState) => ({
        rooms: props.rooms,
    }),
)(Mansion);