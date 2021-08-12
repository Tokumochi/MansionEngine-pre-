import React, { FC } from 'react';
import { DoorState, SelectState } from '../../lib/redux';

import './Door.css';

interface DoorProps {
    door: DoorState,
    select_state: SelectState,
    onDoorPosChanged(id: number, x: number, y: number): void,
    onStairConnected(upper_id: number, upper_index: number, lower_id: number, lower_x: number, lower_y: number): void,
    onNothingSelected(): void,
    onDoorSelected(id: number): void,
    onStairSelected(id: number, index: number): void,
}

export const Door: FC<DoorProps> = ( { door, select_state, onDoorPosChanged, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: DoorProps ) => {
    const { id, name, kind, x, y, isCorridor, stairs } = door;
    const { select_kind, selected_door_id, selected_stair_index } = select_state;
    const door_border_color: string = ((select_kind === "Door" && selected_door_id === id) ? 'red' : 'lightblue');
    const output_point_color: string = 'darkseagreen';
    return (
        <>
            <rect className="door_base" 
                x={300 * x + 50} y={150 * y + 25} stroke={door_border_color}
                onClick={() => {
                    onDoorSelected(id);
                }
            }> 
            </rect>
            <text x={300 * x + 150} y={150 * y + 75} textAnchor="middle" fontSize="30" fill="black">{name}</text>
            <circle className="input_point" cx={300 * x + 150} cy={150 * y + 25} r="13" fill={output_point_color}
                onClick={() => {
                    if(select_kind === "Stair") {
                        onStairConnected(selected_door_id, selected_stair_index, id, x, y);
                        onNothingSelected();
                    }
                }}
            />
            { stairs.map((stair, index) =>
                {
                    const { lower_id, lower_x, lower_y } = stair;
                    const offset_x = 50 + (index + 1) * 200 / (stairs.length + 1);
                    const input_point_color: string = ((select_kind === "Stair" && selected_door_id === id && selected_stair_index === index) ? 'red' : 'darkseagreen');
                    return (
                        <>
                            { lower_id === -1 ? <></> :
                                <line className="stair" key={index} x1={300 * x + offset_x} y1={150 * y + 125} x2={300 * lower_x + 150} y2={150 * lower_y + 25}/>
                            }
                            <circle className="input_point" cx={300 * x + offset_x} cy={150 * y + 125} r="13" fill={input_point_color}
                                onClick={() => {
                                    onStairSelected(id, index);
                                }}
                            />
                        </>
                    );
                }
            ) }
        </>
    );
}
