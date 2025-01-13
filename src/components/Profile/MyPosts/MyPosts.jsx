import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import FormControl from '../../common/FormsControls/FormsControls'

// window.props = [];
const MyPosts = React.memo(props => {
  console.log('RENDER');
//   window.props.push(props);
//   console.log(props);
  let postElements = props.posts.map(p => <Post message={p.message} like={p.like} />);
  let newPostElement = React.createRef();

  let onAddPost = values => {
    props.addPost(values.newPostText);
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

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
const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {/* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea> */}
                <Field child='textarea' component={FormControl} name="newPostText" placeholder="Enter your post" validate={[required, maxLength10]} />
            </div>
            <div>
                <button>add post</button>
            </div>

        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: "addMyPostForm" })(AddPostForm)


   
  export default MyPosts