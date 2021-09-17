import { arch } from 'os';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DoorState, SelectorState } from '../../lib/redux/states';

import './Door.css';

export interface DoorProps {
    door: DoorState,
    selector: SelectorState,
    onDoorPosChanged(id: string, x: number, y: number): void,
    onDeleteDoor(id: string): void,
    onStairConnected(upper_id: string, upper_index: number, lower_id: string): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Door: FC<DoorProps> = ( { door, selector, onDoorPosChanged, onDeleteDoor, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: DoorProps ) => {
    const { id, name, kind, ref_name, x, y, isCorridor, stairs } = door;
    const { selecting_kind, selecting_name, selecting_id, selecting_index } = selector;

    const door_color: string = (() => {
        switch (kind) {
            case "Data":
                return "#b8d200";
            case "Process":
                return "#00afcc";
            case "Room":
                return "#0095d9";
            default:
                return "red";
        }
    })();
    const door_border_color: string = ((selecting_kind === "Door" && selecting_id === id) ? 'red' : door_color);
    const process_url: string = "/process/" + ref_name;
    
    return (
        <>
            <rect className="door_base" 
                x={x - 100} y={y - 50} fill={door_color} stroke={door_border_color}
                onClick={() => {
                    onDoorSelected(id);
                }
            }> 
            </rect>
            <Link to={process_url} >
                <text x={x} y={y} textAnchor="middle" fontSize="30" fill="black">{name}</text>
            </Link>
            <circle className="delete_button" cx={x + 90} cy={y - 40} r="10"
                onClick={() => {
                    onDeleteDoor(id);
                }}
            />
            <circle className="output_point" cx={x} cy={y - 50} r="13"
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
                    const offset_x = (index + 1) * 200 / (stairs.length + 1) - 100;
                    const input_point_color: string = ((selecting_kind === "Stair" && selecting_id === id && selecting_index === index) ? 'red' : 'darkseagreen');
                    return (
                        <>
                            { lower_id === '-1' ? <></> :
                                <line className="stair" key={'l' + index} x1={x + offset_x} y1={y + 50} x2={lower_x} y2={lower_y - 50}/>
                            }
                            <circle key={'c' + index} className="input_point" cx={x + offset_x} cy={y + 50} r="13" fill={input_point_color}
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
