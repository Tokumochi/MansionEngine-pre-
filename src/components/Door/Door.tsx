import { arch } from 'os';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DoorState, SelectorState } from '../../lib/redux/states';

import './Door.css';

export interface DoorProps {
    door: DoorState,
    selector: SelectorState,
    onDoorPosChanged(room_id: string, id: string, x: number, y: number): void,
    onDeleteDoor(room_id: string, id: string): void,
    onStairConnected(room_id: string, upper_id: string, upper_index: number, lower_door: DoorState, lower_index: number): void,
    onNothingSelected(): void,
    onDoorSelected(id: string): void,
    onStairSelected(id: string, index: number): void,
}

export const Door: FC<DoorProps> = ( { door, selector, onDoorPosChanged, onDeleteDoor, onStairConnected, onNothingSelected, onDoorSelected, onStairSelected }: DoorProps ) => {
    const { id, name, kind, ref_name, x, y, isCorridor, stairs, num_of_output } = door;
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
                    onDeleteDoor('1', id);
                }}
            />
            { Array.from({ length: num_of_output }).map((_, index) =>
                {
                    const offset_x = (index + 1) * 200 / (num_of_output + 1) - 100;
                    return (
                        <circle key={'o' + index} className="output_point" cx={x + offset_x} cy={y - 50} r="13"
                            onClick={() => {
                                if(selecting_kind === "Stair") {
                                    onStairConnected('1', selecting_id, selecting_index, door, index);
                                    onNothingSelected();
                                }
                            }}
                        />
                    );
                }
            ) }
            { stairs.map((stair, index) =>
                {
                    const { lower_door, lower_index } = stair;
                    const upper_offset_x = (index + 1) * 200 / (stairs.length + 1) - 100;
                    const lower_offset_x = lower_door === undefined ? -1 : (lower_index + 1) * 200 / (lower_door.num_of_output + 1) - 100;
                    const input_point_color: string = ((selecting_kind === "Stair" && selecting_id === id && selecting_index === index) ? 'red' : 'darkseagreen');
                    return (
                        <>
                            { lower_door === undefined ? <></> :
                                <line className="stair" key={'l' + index} x1={x + upper_offset_x} y1={y + 50} x2={lower_door.x + lower_offset_x} y2={lower_door.y - 50}/>
                            }
                            <circle key={'c' + index} className="input_point" cx={x + upper_offset_x} cy={y + 50} r="13" fill={input_point_color}
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
