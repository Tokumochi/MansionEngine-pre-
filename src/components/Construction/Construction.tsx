import { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SelectedKind, AppState, ProcessState } from '../../lib/redux/states';
import { selector_actions } from '../../lib/redux/actions';

import './Construction.css';

export interface ConstructionProps {
    processes: ProcessState[],
    selecting_kind: SelectedKind,
    selecting_process: ProcessState,
    onProcessSelected(process: ProcessState): void,
}

export const Construction: FC<ConstructionProps> = ( { processes, selecting_kind, selecting_process, onProcessSelected }: ConstructionProps ) => {
    return (
        <>
            {
                processes.map((process) => {
                    const { name, content } = process;
                    const process_url: string = "/process/" + name;
                    const main_color = ((selecting_kind === "Process" && selecting_process.name === name) ? 'red' : '#ffaf65');
                    return (
                        <div className="construction" style={{background: main_color}}
                            onClick={() => {
                                onProcessSelected(process);
                            }}
                        >
                            <Link to={process_url}>
                                {name}
                            </Link>
                        </div>
                    );
                })
            }
        </>
    );
}


export default connect(
    (props: AppState) => ({
        processes: props.processes,
        selecting_kind: props.selector.selecting_kind,
        selecting_process: props.selector.selecting_process,
    }),
    dispatch => ({
        onProcessSelected: (process: ProcessState) => dispatch(selector_actions.selectProcess(process)),
    }),
)(Construction);