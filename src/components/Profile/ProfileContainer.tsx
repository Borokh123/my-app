import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/ProfileReducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/ReduxStore';

type mapStatePropsType = {
    profile:  object | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: object) => Promise<any>
}

type ownPropsType = {
    match: {
        params: {
            userId: number
        }
    }
}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType
interface WithRouterProps {
    match: {
        params: Record<string, string | undefined>;
    };
}

export function withRouter<P extends WithRouterProps>(Children: React.ComponentType<P>) {
    return (props: Omit<P, keyof WithRouterProps>) => {
        const match = { params: useParams<Record<string, string>>() };
        return <Children {...(props as P)} match={match} />;
    };
}

class ProfileContainer extends React.Component<propsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId || 0; // Provide a fallback value
            // if (!userId) {
            //     this.props.push("/login");
            // }
        }

        this.props.getUserProfile(userId);// ф-я из thunk reducer
        this.props.getStatus(userId);
    }

    componentDidMount() { // срабатывает один раз когда компонента единожда вмонтируется, если меняется state локальный или пропсы приходят другие то компонента не монтируется и перерисовки нет
        this.refreshProfile();


    }
    componentDidUpdate(prevProps: propsType, prevState: any, snapshot?: any) { // срабатывает при каждом изминении пропсов (срабатывает если происходят изм в локальном сторе в локальном state)
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }


    }

    render() {

        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state:AppStateType):mapStatePropsType => {
    // console.log ('mapStateToProps PROFILE');
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId, // в reduxStore ветка auth ветка
        isAuth: state.auth.isAuth

    })
}
export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) // Контейнераная компонента
// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent) // создает обьект в который кладет actioncreator(SetUserProfile) коннект сам автоматически AC вызовет задиспатчит и внего передаст профайл