import { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, ProcessState } from '../../lib/redux/states';

export interface ConstructionProps {
    processes: ProcessState[],
}

export const Construction: FC<ConstructionProps> = ( { processes }: ConstructionProps ) => {
    return (
        <ul>
            {
                processes.map((process) => {
                    const { name, content } = process;
                    const process_url: string = "/process/" + name;
                    return (
                        <Link to={process_url}>
                            <li>{name}</li>
                        </Link>
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