import { FC } from 'react';
import { connect } from 'react-redux';
import { SelectedKind, AppState, DataState } from '../../lib/redux/states';
import { selector_actions } from '../../lib/redux/actions';

import './Storage.css';
import { datas_reducer } from '../../lib/redux/reducers';

export interface StorageProps {
    datas: DataState[],
    selecting_kind: SelectedKind,
    selecting_name: string,
    onDataSelected(name: string): void,
}

const ChildData = (data: DataState, depth: number = 0): JSX.Element => {
    const background_color = '#b8d200';

    switch(data.type) {
        case "Number":
            return (
                <div className="data" style={{background: background_color, paddingLeft: 10 * depth}}>
                    { data.name + ": " + data.value }
                </div>
            );
        case "Struct":
            return (
                <>
                    <div className="data" style={{background: background_color, paddingLeft: 10 * depth}}>
                        { data.name }
                    </div>
                    { data.members.map((member) => {
                        return ChildData(member, depth + 1);
                    }) }
                </>
            );
    }
}

export const Storage: FC<StorageProps> = ( { datas, selecting_kind, selecting_name, onDataSelected }: StorageProps ) => {
    return (
        <div className="storage_base">
            {
                datas.map((data, index) => {
                    const { name, value } = data;
                    const main_color = ((selecting_kind === "Data" && selecting_name === name) ? 'red' : '#b8d200');
                    return (
                        <div key={index} className="data_base" style={{background: main_color}}
                            onClick={() => {
                                onDataSelected(name);
                            }}
                        >
                            { ChildData(data) }
                        </div>
                    );
                })
            }
        </div>
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