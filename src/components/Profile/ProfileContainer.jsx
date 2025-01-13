import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getStatus, getUserProfile, updateStatus } from '../../redux/ProfileReducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// перед классовой компонентой ProfileContainer

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
        userId = this.props.authorizedUserId;
        
        }

        this.props.getUserProfile(userId);// ф-я из thunk reducer
        // setTimeout(() => {

        // }, 1000);
        this.props.getStatus(userId);
        // profileAPI.getProfile(userId)
        //     .then(data => {

        //         this.props.setUserProfile(data) // компонента, она работает через колбэки и постоянно берет у пропсов что нибудь
        //         // колбэки приходят из mapDispatch to props // данные всегда в response.data если с помощью axios
        //     }); // в пропсах где то этот колбэк должен появится с помощью mapdispatchToProps, тоесть мы делаем еще одну котейнерную компоненту над нашей конт. комп. с помощью коннекта

    }

    render() {
        // console.log ('RENDER PROFILE');
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => {
    // console.log ('mapStateToProps PROFILE');
    return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId, // в reduxStore ветка auth ветка
    isAuth: state.auth.isAuth

})
}
export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
     withAuthRedirect
)(ProfileContainer);
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) // Контейнераная компонента
// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent) // создает обьект в который кладет actioncreator(SetUserProfile) коннект сам автоматически AC вызовет задиспатчит и внего передаст профайл