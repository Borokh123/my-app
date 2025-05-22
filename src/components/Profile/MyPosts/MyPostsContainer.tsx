import React from 'react'
import { addPostActionCreator } from '../../../redux/ProfileReducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux';
import {AppStateType} from '../../../redux/ReduxStore'


let mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
        
    }
}

let mapDispatchToProps = (dispatch:any) => {
    return {

        
        // updateNewPostText: (text) => {
        //     let action = updateNewPostActionCreator(text);
        //     dispatch(action);
        // },
        addPost: (newPostText:string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }

}



const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer