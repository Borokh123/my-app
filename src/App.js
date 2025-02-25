import React, { Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import News from './components/News/News';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer, { withRouter } from './components/Profile/ProfileContainer';
import { withRouter } from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { getAuthUserData } from './redux/AuthReducer';
import { compose } from 'redux';
import { initializeApp } from './redux/AppReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/ReduxStore'
import { Provider } from 'react-redux';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {
  
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <HashRouter >
        <div className='appWrapper'>
          <HeaderContainer />
          <Navbar sideBar={this.props.state.sideBar} />
          <div class='appWrapperContent '>
            {/* Route видет путь и рендерить компоненту */}
            <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              {/* <Route path='/profile' element={<Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} /> */}
              {/* this.props - match - params,path, url */}
              <Route path='/profile/:userId?' element={<ProfileContainer />} />
              <Route path='/users/' element={<UsersContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news' Component={News} />
              <Route path='/music' Component={Music} />
              <Route path='/settings' Component={Settings} />
              <Route path='/login' Component={Login} />
            </Routes>
            </Suspense>
          </div>
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})





let AppContainer =  compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

 let SamuraiJSApp = (props) => {
   return <Provider store={store}>
        <React.StrictMode>
            <AppContainer state={store.getState()} dispatch={store.dispatch.bind(store)} store={store} />
        </React.StrictMode>
    </Provider>
  }

  export default SamuraiJSApp;