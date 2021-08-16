import { FC } from 'react';
import { Display } from '../Display/Display';
import { Sidebar } from '../Sidebar/Sidebar';

import './Screen.css';

export const Screen: FC = () => {
    return (
        <div className="screen">
            <header>
                <Sidebar />
            </header>
            <main>
                <Display />
            </main>
        </div>
    );
}