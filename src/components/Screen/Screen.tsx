import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Display } from '../Display/Display';
import { Sidebar } from '../Sidebar/Sidebar';

import './Screen.css';

export const Screen: FC = () => {
    return (
        <div className="screen">
            <BrowserRouter>
                <header>
                    <Sidebar />
                </header>
                <main>
                    <Display />
                </main>
            </BrowserRouter>
        </div>
    );
}