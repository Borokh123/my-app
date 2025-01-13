import React from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
let mapStateToPropsRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {


    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to={'/login'} />
        return <Component {...props} />

    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent); // Двойная обертка двумя компонентами

    return ConnectedAuthRedirectComponent;
}
