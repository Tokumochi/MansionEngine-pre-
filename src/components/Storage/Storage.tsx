import { FC } from 'react';
import { connect } from 'react-redux';
import { SelectedKind, AppState, DataState } from '../../lib/redux/states';
import { selector_actions } from '../../lib/redux/actions';

import './Storage.css';

export interface StorageProps {
    datas: DataState[],
    selecting_kind: SelectedKind,
    selecting_name: string,
    onDataSelected(name: string): void,
}

export const Storage: FC<StorageProps> = ( { datas, selecting_kind, selecting_name, onDataSelected }: StorageProps ) => {
    return (
        <>
            {
                datas.map((data, index) => {
                    const { name, value } = data;
                    const main_color = ((selecting_kind === "Data" && selecting_name === name) ? 'red' : '#b8d200');
                    return (
                        <div key={index} className="data" style={{background: main_color}}
                            onClick={() => {
                                onDataSelected(name);
                            }}
                        >
                            {name}
                        </div>
                    );
                })
            }
        </>
    );
}

export default connect(
    (props: AppState) => ({
        datas: props.datas,
        selecting_kind: props.selector.selecting_kind,
        selecting_name: props.selector.selecting_name,
    }),
    dispatch => ({
        onDataSelected: (name: string) => dispatch(selector_actions.selectData(name)),
    }),
)(Storage);