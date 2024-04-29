import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import {Link, useNavigation} from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import '../application-details/application-details.css'
import {Header} from "../header/header";

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = `${ApplicationPaths.LogOut}`;
      const logoutState = { local: true };
      return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {

    return (<Fragment>
      <Header/>
      <div className='application-details'>
            <div className='topic-text logoutText'> Вы уверены, что хотите выйти из аккаунта?</div>
            {/*<NavItem>*/}
            {/*  <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>*/}
            {/*</NavItem>*/}
            {/*<NavItem>*/}
        {<div className='flex'> <NavLink replace tag={Link} className="logoutBtn" to={logoutPath} state={logoutState}>Выйти</NavLink></div>}
            {/*</NavItem>*/}
      </div>
    </Fragment>);
  }

  anonymousView(registerPath, loginPath) {
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
      </NavItem>
    </Fragment>);
  }
}

