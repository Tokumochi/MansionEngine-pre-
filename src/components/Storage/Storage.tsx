import { FC } from 'react';
import { connect } from 'react-redux';
import { SelectedKind, AppState, DataState } from '../../lib/redux/states';
import { datas_actions, selector_actions } from '../../lib/redux/actions';

import './Storage.css';

export interface StorageProps {
    datas: DataState[],
    selecting_kind: SelectedKind,
    selecting_name: string,
    onNumberDataChanged(id: string, value: string): void,
    onDataSelected(name: string): void,
}

const ChildData = (data: DataState, onNumberDataChanged: (id: string, value: string) => void, depth: number = 0): JSX.Element => {
    const background_color = '#b8d200';

    switch(data.type) {
        case "Number":
            return (
                <div className="data" style={{background: background_color, paddingLeft: 10 * depth}}>
                    { data.name + ": " }
                    <input type="number" value={data.value.toString()} onChange={(e) => {
                        onNumberDataChanged(data.id, e.target.value);
                    }}/>
                </div>
            );
        case "Struct":
            return (
                <>
                    <div className="data" style={{background: background_color, paddingLeft: 10 * depth}}>
                        { data.name }
                    </div>
                    { data.members.map((member) => {
                        return ChildData(member, onNumberDataChanged, depth + 1);
                    }) }
                </>
            );
    }
}

export const Storage: FC<StorageProps> = ( { datas, selecting_kind, selecting_name, onNumberDataChanged, onDataSelected }: StorageProps ) => {
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
                            { ChildData(data, onNumberDataChanged) }
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
        onNumberDataChanged: (id: string, value: string) => dispatch(datas_actions.setNumberData(id, value)),
        onDataSelected: (name: string) => dispatch(selector_actions.selectData(name)),
    }),
)(Storage);