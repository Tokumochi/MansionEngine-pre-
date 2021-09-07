import { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SelectedKind, AppState, ProcessState } from '../../lib/redux/states';
import { selector_actions } from '../../lib/redux/actions';

import './Construction.css';

export interface ConstructionProps {
    processes: ProcessState[],
    selecting_kind: SelectedKind,
    selecting_name: string,
    onConstructionSelected(name: string): void,
}

export const Construction: FC<ConstructionProps> = ( { processes, selecting_kind, selecting_name, onConstructionSelected }: ConstructionProps ) => {
    return (
        <>
            {
                processes.map((process) => {
                    const { name, content } = process;
                    const process_url: string = "/process/" + name;
                    const main_color = ((selecting_kind === "Construction" && selecting_name === name) ? 'red' : '#ffaf65');
                    return (
                        <div className="construction" style={{background: main_color}}
                            onClick={() => {
                                onConstructionSelected(name);
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
        selecting_name: props.selector.selecting_name,
    }),
    dispatch => ({
        onConstructionSelected: (name: string) => dispatch(selector_actions.selectConstruction(name)),
    }),
)(Construction);