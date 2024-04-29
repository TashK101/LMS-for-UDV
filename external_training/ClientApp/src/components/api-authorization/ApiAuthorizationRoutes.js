import React from 'react';
import { Login } from './Login'
import { Logout } from './Logout'
import { ApplicationPaths, LoginActions, LogoutActions } from './ApiAuthorizationConstants';

const ApiAuthorizationRoutes = [
  {
    path: ApplicationPaths.Login,
    element: <Login action={LoginActions.Login}></Login>,
  },
  {
    path: ApplicationPaths.LoginFailed,
    element: <Login action={LoginActions.LoginFailed}></Login>,
  },
  {
    path: ApplicationPaths.LoginCallback,
    element: <Login action={LoginActions.LoginCallback}></Login>,
  },
  {
    path: ApplicationPaths.Profile,
    element: <Login action={LoginActions.Profile}></Login>,
  },
  {
    path: ApplicationPaths.Register,
    element: <Login action={LoginActions.Register}></Login>,
  },
  {
    path: ApplicationPaths.LogOut,
    element: <Logout action={LogoutActions.Logout}></Logout>
  },
  {
    path: ApplicationPaths.LogOutCallback,
    element: <Logout action={LogoutActions.LogoutCallback}></Logout>
  },
  {
    path: ApplicationPaths.LoggedOut,
    element: <Logout action={LogoutActions.LoggedOut}></Logout>
  }
];

export default ApiAuthorizationRoutes;
