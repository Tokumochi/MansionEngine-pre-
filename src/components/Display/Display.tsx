import { FC } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Room from '../Room/Room';
import Process from '../Process/Process';

export const Display: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/process/:id' component={Process} />
                <Route path='/'>
                    <Room />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}