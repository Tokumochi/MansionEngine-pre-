import { FC } from 'react';
import { Route, Switch} from 'react-router-dom';
import Room from '../Room/Room';
import Process from '../Process/Process';
import RoomHeader from '../RoomHeader/RoomHeader';

export const Display: FC = () => {
    return (
        <Switch>
            <Route path='/process/:name' component={Process} />
            <Route path='/'>
                <RoomHeader />
                <Room />
            </Route>
        </Switch>
    );
}