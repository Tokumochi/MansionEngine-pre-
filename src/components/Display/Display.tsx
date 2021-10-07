import { FC } from 'react';
import { Route, Switch} from 'react-router-dom';
import Room from '../Room/Room';
import Process from '../Process/Process';

export const Display: FC = () => {
    return (
        <Switch>
            <Route path='/process/:name' component={Process} />
            <Route path='/'>
                <Room />
            </Route>
        </Switch>
    );
}