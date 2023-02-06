import { Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Page404 from '../Pages/Page404';
import AllCar from '../Pages/user-panel/AllCar';
import MyProfile from '../Pages/user-panel/MyProfile';
import MyMessage from '../Pages/user-panel/MyMessage';
import MyChat from '../Pages/user-panel/MyChat';
import MyCar from '../Pages/user-panel/MyCar';
import MyFavorite from '../Pages/user-panel/MyFavorite';
import MyLocation from '../Pages/user-panel/MyLocation';
import Addcar from '../Pages/user-panel/AddCar';
import Editcar from '../Pages/user-panel/EditCar';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Reservation from '../Pages/user-panel/Reservation';
import MyNotification from '../Pages/user-panel/MyNotification';

function Routes() {
  return (
    <div className="">
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/Login">
              <Login />
          </Route>
          <Route path="/Signup">
              <Signup />
          </Route>
          <Route path="/Allcar">
              <AllCar />
          </Route>
          <Route exact path="/Myprofile">
              <MyProfile />
          </Route>
          <Route exact path="/Mychat">
              <MyChat />
          </Route>
          <Route exact path="/Mymessage/:conv">
              <MyMessage />
          </Route>
          <Route exact path="/Mycar">
              <MyCar />
          </Route>
          <Route exact path="/Myfavorite">
              <MyFavorite />
          </Route>
          <Route exact path="/Mylocation">
              <MyLocation />
          </Route>
          <Route exact path="/Mynotification">
              <MyNotification />
          </Route>
          <Route exact path="/Reservation/:immatriculation">
              <Reservation />
          </Route>
          <Route exact path="/Addcar">
              <Addcar />
          </Route>
            <Route exact path="/Editcar/:immatriculation">
              <Editcar />
          </Route>
          <Route path="*">
              <Page404 />
          </Route>
        </Switch>
    </div>
  );
}

export default Routes;
