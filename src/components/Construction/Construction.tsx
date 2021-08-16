import { FC } from 'react';
import { connect } from 'react-redux';
import { AppState, ProcessState } from '../../lib/redux/states';

export interface ConstructionProps {
    processes: ProcessState[],
}

export const Construction: FC<ConstructionProps> = ( { processes }: ConstructionProps ) => {
    return (
        <ul>
            {
                processes.map((process) => {
                    const { process_name, process_content } = process;
                    return (
                        <li>{process_name}</li>
                    );
                })
            }
        </ul>
    );
}


export default connect(
    (props: AppState) => ({
        processes: props.processes,
    }),
    dispath => ({
    }),
)(Construction);