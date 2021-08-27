import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DoorState, SelectorState } from '../../lib/redux/states';

import './Door.css';

export interface DoorProps {
    door: DoorState,
    selector: SelectorState,
    onDoorPosChanged(id: string, x: number, y: number): void,
    onStairConnected(upper_id: string, upper_index: number, lower_id: string): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Door: FC<DoorProps> = ( { door, selector, onDoorPosChanged, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: DoorProps ) => {
    const { id, name, kind, process_name, x, y, isCorridor, stairs } = door;
    const { selecting_kind, selecting_name, selecting_id, selecting_index } = selector;

    const door_border_color: string = ((selecting_kind === "Door" && selecting_id === id) ? 'red' : 'lightblue');
    const process_url: string = "/process/" + process_name;
    
    return (
        <>
            <rect className="door_base" 
                x={300 * x + 50} y={150 * y + 25} stroke={door_border_color}
                onClick={() => {
                    onDoorSelected(id);
                }
            }> 
            </rect>
            <Link to={process_url} >
                <text x={300 * x + 150} y={150 * y + 75} textAnchor="middle" fontSize="30" fill="black">{name}</text>
            </Link>
            <circle className="output_point" cx={300 * x + 150} cy={150 * y + 25} r="13"
                onClick={() => {
                    if(selecting_kind === "Stair") {
                        onStairConnected(selecting_id, selecting_index, id);
                        onNothingSelected();
                    }
                }}
            />
            { stairs.map((stair, index) =>
                {
                    const { lower_id, lower_x, lower_y } = stair;
                    const offset_x = 50 + (index + 1) * 200 / (stairs.length + 1);
                    const input_point_color: string = ((selecting_kind === "Stair" && selecting_id === id && selecting_index === index) ? 'red' : 'darkseagreen');
                    return (
                        <>
                            { lower_id === '-1' ? <></> :
                                <line className="stair" key={'l' + index} x1={300 * x + offset_x} y1={150 * y + 125} x2={300 * lower_x + 150} y2={150 * lower_y + 25}/>
                            }
                            <circle key={'c' + index} className="input_point" cx={300 * x + offset_x} cy={150 * y + 125} r="13" fill={input_point_color}
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
