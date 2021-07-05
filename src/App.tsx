import {BrowserRouter,Route, Switch, useParams} from'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import {AuthContextProvider} from './contexts/AuthContext';
import { useRoom } from './hooks/useRoom';

type RoomParams = {
  id: string;
}

function App() {
  // const params = useParams<RoomParams>();
  // const roomId = params.id;


  // const {colorPage}= useRoom(roomId);


  return (

    // <div style ={{"backgroundColor": colorPage?colorPage:"#FFFF"}}> 
    <BrowserRouter>
    <AuthContextProvider>
        <Switch>
          <Route path='/' exact component = {Home} />
          <Route path='/rooms/new' component = {NewRoom} />
          <Route path='/rooms/:id' component = {Room} />
          <Route path='/admin/rooms/:id' component = {AdminRoom} />

        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    // </div>

  );
}

export default App;
