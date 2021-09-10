import { FC } from 'react';
import { DataState } from '../../lib/redux/states';

import './Storage.css';

export interface StorageProps {
    datas: DataState[],
}

export const Storage: FC<StorageProps> = ( { datas }: StorageProps ) => {
    return (
        <>
            {
                datas.map((data) => {
                    const { name, value } = data;
                    const main_color = '#b8d200';
                    return (
                        <div className="data" style={{background: main_color}}>
                            {name}
                        </div>
                    );
                })
            }
        </>
    );
}