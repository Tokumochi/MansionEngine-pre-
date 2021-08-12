import React, { FC } from 'react';
import { DoorState } from '../../lib/redux';

import './Door.css';

interface DoorProps {
    door: DoorState,
    selected_door_id: number,
    onDoorPosChanged(id: number, x: number, y: number): void,
    onDoorSelected(id: number): void,
}

export const Door: FC<DoorProps> = ( { door, selected_door_id, onDoorPosChanged, onDoorSelected }: DoorProps ) => {
    const { id, name, kind, x, y, isCorridor, visitors } = door;
    const border_color: string = (selected_door_id === id ? 'red' : 'lightblue');
    return (
        <>
            <rect className="door_base" 
                //style={{left: 300 * x + 45, top: 150 * y + 20, borderColor: border_color}}
                x={300 * x + 50} y={150 * y + 25} stroke={border_color}
                onClick={ () => {
                    onDoorSelected(id);
                }
            }> 
            </rect>
            <text x={300 * x + 150} y={150 * y + 75} textAnchor="middle" fontSize="30" fill="black">{name}</text>
            { visitors.map((visitor, index) =>
                {
                    const { lower_id, lower_x, lower_y } = visitor;
                    const offset_x = 50 + (index + 1) * 200 / (visitors.length + 1);
                    return (
                        <line className="stair" key={index}  x1={300 * x + offset_x} y1={150 * y + 125} x2={300 * lower_x + 150} y2={150 * lower_y + 25}/>
                    );
                }
            ) }
        </>
    );
}
