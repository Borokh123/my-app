import React, { FC } from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import FormControl from '../../common/FormsControls/FormsControls'
import { PostType, ProfileType } from '../../../types/types'
type PropsType = {
  posts: Array<PostType>
  addPost: (newPostText: string) => void
  newPostText: string
  profile: ProfileType| null
  
}
// window.props = [];
const MyPosts:FC<PropsType> = React.memo(props => {

  console.log('RENDER');
//   window.props.push(props);
//   console.log(props);
  let postElements = props.posts.map(p => <Post key = {p.id} message={p.message} like={p.like} profile = {props.profile} />);
  let newPostElement = React.createRef<HTMLTextAreaElement>();

  let onAddPost = (values: any) => {
    props.addPost(values.newPostText);
  };

  // let onPostChange = () => {
  //   if (newPostElement.current) {
  //       let text = newPostElement.current.value;
  //       props.updateNewPostText(text);
  //   }
  // };

  return (
   <div className={s.PostsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={onAddPost} />
            {
      /* <div className="">
         <div>
             <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
         </div>
         <div>
             <button onClick={onAddPost}>add post</button>
         </div>
       </div> */
    }

            <div className={s.posts}>
                {postElements}

            </div>
        </div>
  )
});
const maxLength10 = maxLengthCreator(10)
const AddPostForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {/* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea> */}
                <Field className={s.addPost} child='textarea' component={FormControl} name="newPostText" placeholder="What's happening?!" validate={[required, maxLength10]} />
            </div>
            <div className={s.submitBlock}>
                <button>Post</button>
            </div>

        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: "addMyPostForm" })(AddPostForm)


   
  export default MyPosts