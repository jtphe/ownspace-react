import { Router, Scene, ActionConst } from 'react-native-router-flux';
import React from 'react';
import Login from '@components/Login';
import SecondAuthScreen from '@components/Login/secondAuthScreen';
import Home from '@components/Home';
import CreateFile from '@components/Home/createFile';
import SplashScreen from '@components/Scenes/splashScreen';
import UserProfile from '@components/UserProfile/index';
import PasswordModal from '@components/UserProfile/passwordModal';
import ShareModal from '@components/Document/shareModal';

/**
 * AppRouter defines all the routes of OwnSpace app
 */
const AppRouter = () => {
  return (
    <Router>
      <Scene modal key="root">
        <Scene
          key="splashScreen"
          type={ActionConst.REPLACE}
          component={SplashScreen}
          title="SplashScreen"
          hideNavBar
          initial
        />
        <Scene
          key="login"
          type={ActionConst.REPLACE}
          component={Login}
          title="ConnexionScreen"
          hideNavBar
        />
        <Scene
          key="twoFactor"
          type={ActionConst.REPLACE}
          component={SecondAuthScreen}
          title="SecondAuthScreen"
          hideNavBar
        />
        <Scene
          key="home"
          type={ActionConst.REPLACE}
          component={Home}
          title="HomeScreen"
          hideNavBar
        />
        <Scene
          key="createFile"
          type={ActionConst.JUMP}
          component={CreateFile}
          title="CreateFileScreen"
          hideNavBar
        />
        <Scene
          key="userProfile"
          type={ActionConst.PUSH}
          component={UserProfile}
          title="UserProfile"
          hideNavBar
        />
        <Scene
          key="passwordModal"
          type={ActionConst.PUSH}
          component={PasswordModal}
          title="PasswordModal"
          hideNavBar
        />
        <Scene
          key="shareModal"
          type={ActionConst.PUSH}
          component={ShareModal}
          title="ShareModal"
          hideNavBar
        />
      </Scene>
    </Router>
  );
};

export default AppRouter;
