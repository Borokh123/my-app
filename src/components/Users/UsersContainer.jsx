import React from 'react'
import { connect } from 'react-redux'
import { follow, requestUsers, setCurrentPage, toogleFollowingProgress, unfollow } from '../../redux/UsersReducer'
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/UsersSelectors.js';

class UsersContainer extends React.Component {
  // constructor(props) { // если конструктор  не делает ничего кроме того как перебрасывание в супер класса от которого он наследуется, то его можна не писать
  //     super(props);
  // }

  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize); // не thunk creator попадает сюда, а callback
    // this.props.toogleIsFetching(true);
    // usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then(data => {

    //   this.props.toogleIsFetching(false);
    //   this.props.setUsers(data.items) // компонента, она работает через колбэки и постоянно берет у пропсов что нибудь
    //   this.props.setTotalUsersCount(data.totalCount) // колбэки приходят из mapDispatch to props
    // });
  }
  // requestUsers = () => {

  // }
  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
    // this.props.setCurrentPage(pageNumber);
    // this.props.toogleIsFetching(true);

    // usersAPI.requestUsers(pageNumber, this.props.pageSize).then(data => {
    //   this.props.toogleIsFetching(false);
    //   this.props.setUsers(data.items)

    // });
  }

  render() {
 console.log ('RENDER USERS');
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          // toogleFollowingProgress = {this.props.toogleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    )
  }
}





const mapStateToProps = (state) => { // из стейта достает данные
    console.log ('mapStateToProps users');
  return {
    
    users: getUsers(state), // импорт из UserSelectors
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)

    // users: state.usersPage.users,
    // pageSize: state.usersPage.pageSize,
    // totalUsersCount: state.usersPage.totalUsersCount,
    // currentPage: state.usersPage.currentPage,
    // isFetching: state.usersPage.isFetching,
    // followingInProgress: state.usersPage.followingInProgress

  }
}

// const mapDispatchToProps = (dispatch) => { // ф-я возвращающая обьект в которой есть колбэки //приходит из react-redux библиотеки задача которой скрыть store subscribe dispatch
//   return {                                 // каждый callback диспатчит что то в store
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber)); //Мы диспатчим то что нам возвращает вызов ActionCreator
//       console.log(setCurrentPageAC(pageNumber));                                        // Вызов ActionCreator всегда возвращает action обьект. 
//       //SetcurrentPage используется в клике на span в Users.   
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount));
//     },

//     toogleIsFetching: (isFetching) => {
//       dispatch (toogleIsFetchingAC(isFetching)); // ActionCretor возвращает action - обьект,в нем  должен быть тип, что он мог достать этот тип и сделать нужное действие
//     }

//   }
// }

export default compose(
  // withAuthRedirect,
  connect(mapStateToProps, {                                 // каждый callback диспатчит что то в store
    setCurrentPage,
    toogleFollowingProgress,
    follow,
    unfollow,
    requestUsers

  })

)(UsersContainer)

// export default connect(mapStateToProps, {                                 // каждый callback диспатчит что то в store
//   followSucces,                                                                 // connect автоматически создает колбэк ф-ю в которой он вызывает follow Action Creator, AC возвращает action и этот action диспатчится
//   unfollowSucces,
//   setCurrentPage,
//   toogleFollowingProgress,
//   follow,
//   unfollow,
//   requestUsers

// })(UsersContainer); // закидываем пропсы с помощью этих супер ф-й
//Мы диспатчим то что нам возвращает вызов ActionCreator
// Вызов ActionCreator всегда возвращает action обьект.
//SetcurrentPage используется в клике на span в Users.
// в пропсы прийжет не сам AC. Connect из этого AC сам создаст колбэк, который внутри задиспатчит т что вернет ActionCreator.
