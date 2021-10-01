import { FC } from 'react';
import { connect } from 'react-redux';

import { AppState, DataState, DoorState, ProcessState, RoomState, SelectorState } from '../../lib/redux/states';
import { GenerateRoomCode } from './../../lib/CodeGenerator';

import './RoomHeader.css';

interface RoomHeaderProps {
    room: RoomState,
    datas: DataState[],
    processes: ProcessState[],
}

export const RoomHeader: FC<RoomHeaderProps> = ( { room, datas, processes }: RoomHeaderProps ) => {
    const { doors } = room;
    const url: string = "run.html";
    return (
        <div className="room_header">
            <div className="run_button"onClick={() => { window.open(url); }}>
                実行
            </div>
            <div className="save_button"
                onClick={() => {
                    localStorage.setItem('RoomCode', GenerateRoomCode(doors, datas, processes));
                }
            }>
                保存
            </div>
        </div>
    );
}

export default connect(
    (props: AppState) => ({
        room: props.room,
        datas: props.datas,
        processes: props.processes,
    }),
)(RoomHeader);