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

type ReducerType = typeof redusers
export type AppStateType = ReturnType<ReducerType>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;// (если T это объект, то U будет типом его значений)
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>; //ActionCreator возвращает ф-ю, и принимает набор каких-то аргументов


// Extend the Window interface to include __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  const store = legacy_createStore(redusers, composeEnhancers(applyMiddleware(thunk)));
const store = legacy_createStore(
    redusers,
    undefined,
    composeEnhancers(applyMiddleware(thunk))
);

// let store = legacy_createStore(redusers, applyMiddleware(thunk));
// @ts-ignore
window.__Storage__ = store;
export default store;