import { FC } from 'react';
import Construction from '../Construction/Construction';
import Storage from '../Storage/Storage';

import './Sidebar.css';

export const Sidebar: FC = () => {
    return (
        <div className='side-bar'>
            <Construction />
            <Storage />
        </div>
    );
}