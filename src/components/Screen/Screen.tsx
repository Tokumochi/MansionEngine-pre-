import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Display } from '../Display/Display';
import { Mansion } from '../Mansion/Mansion';
import TopMenu from '../TopMenu/TopMenu';
import Storage from '../Storage/Storage';
import Construction from '../Construction/Construction';

import './Screen.css';

export const Screen: FC = () => {
    return (
        <BrowserRouter>
            <header>
                <TopMenu />
                <Mansion />
                <Storage />
                <Construction />
            </header>
            <main>
                <Display />
            </main>
        </BrowserRouter>
    );
}