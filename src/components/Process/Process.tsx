import { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ProcessState, AppState } from '../../lib/redux/states';
import { processes_actions } from '../../lib/redux/actions';

export interface ProcessProps extends RouteComponentProps<{ name: string }> {
    processes: ProcessState[],
    onProcessContentChanged(name: string, content: string): void,
}

export const Process: FC<ProcessProps> = ( props: ProcessProps ) => {
    const name: string = props.match.params.name;
    const { processes } = props;
    const content = processes.find(process => process.name === name)?.content;

    return (
        <EditProcess name={name} content={content} onProcessContentChanged={props.onProcessContentChanged} />
    )
}

export interface EditProcessProps {
    name: string,
    content: string | undefined,
    onProcessContentChanged(name: string, content: string): void,
}

export const EditProcess: FC<EditProcessProps> = ( { name, content, onProcessContentChanged }: EditProcessProps ) => {
    if(content == undefined) {
        return (
            <div>
                <text>Not Exit</text>
            </div>
        );
    }

    return (
        <div>
            <text>{ name }</text><br/>
            <textarea rows={100} cols={100} value={ content } onChange={(e) => onProcessContentChanged(name, e.target.value)} />
        </div>
    );
}

export default connect(
    (props: AppState) => ({
        processes: props.processes,
    }),
    dispath => ({
        onProcessContentChanged: (name: string, content: string) => dispath(processes_actions.setProcessContent(name, content)),
    }),
)(Process);