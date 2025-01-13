import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import ProfileReducer from "./ProfileReducer";
import DialogsReducer from "./DialogsReducer";
import SideBarReducer from "./SideBarReducer";
import UsersReducer from "./UsersReducer";
import AuthReducer from "./AuthReducer";
import { reducer as formReducer } from 'redux-form' 
// import thunkMiddleware from "redux-thunk";
import { thunk } from "redux-thunk";
import AppReducer from "./AppReducer";
import { compose } from "redux";
let redusers = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    sideBar: SideBarReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer

});


 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = legacy_createStore(redusers, composeEnhancers(applyMiddleware(thunk)));

// let store = legacy_createStore(redusers, applyMiddleware(thunk));
// window.__Storage__ = store;
export default store;