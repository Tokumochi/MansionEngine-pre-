import { read } from 'fs';
import { FC } from 'react';
import { connect } from 'react-redux';

import { AppState, DataState, DoorState, ProcessState, RoomState, SelectorState } from '../../lib/redux/states';
import { GenerateRoomCode } from '../../lib/CodeGenerator';

import './TopMenu.css';

interface RoomHeaderProps {
    rooms: RoomState[],
    datas: DataState[],
    processes: ProcessState[],
}

export const RoomHeader: FC<RoomHeaderProps> = ( { rooms, datas, processes }: RoomHeaderProps ) => {
    const { doors } = rooms[0];
    const url: string = "run.html";

    return (
        <div className="room_header">
            <div className="run_button" onClick={() => { window.open(url); }}>
                実行
            </div>
            <div className="save_button" onClick={() => { localStorage.setItem('RoomCode', GenerateRoomCode(doors, datas, processes)); }}>
                保存
            </div>
        </div>
    );
}

export default connect(
    (props: AppState) => ({
        rooms: props.rooms,
        datas: props.datas,
        processes: props.processes,
    }),
)(RoomHeader);