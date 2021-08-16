import { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { DoorState, RoomState, AppState } from '../../lib/redux/states';
import { rooms_actions } from '../../lib/redux/actions';

export interface ProcessProps extends RouteComponentProps<{ id: string }> {
    doors: DoorState[],
    onProcessContentChanged(id: string, content: string): void,
}

export const Process: FC<ProcessProps> = ( props: ProcessProps ) => {
    const id: string = props.match.params.id;
    const { doors } = props;
    const process_content = doors.find(door => door.id === id)?.process_string;

    return (
        <EditProcess id={id} process_content={process_content} onProcessContentChanged={props.onProcessContentChanged} />
    )
}

export interface EditProcessProps {
    id: string,
    process_content: string | undefined,
    onProcessContentChanged(id: string, content: string): void,
}

export const EditProcess: FC<EditProcessProps> = ( { id, process_content, onProcessContentChanged }: EditProcessProps ) => {
    if(process_content == undefined) {
        return (
            <div>
                <text>Not Exit</text>
            </div>
        );
    }

    return (
        <div>
            <textarea value={ process_content } onChange={(e) => onProcessContentChanged(id, e.target.value)} />
        </div>
    );
}

export default connect(
    (props: AppState) => ({
        doors: props.room.doors
    }),
    dispath => ({
        onProcessContentChanged: (id: string, content: string) => dispath(rooms_actions.setProcessContent(id, content)),
    }),
)(Process);