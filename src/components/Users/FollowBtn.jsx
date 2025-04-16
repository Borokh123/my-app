import React from 'react';

const FollowBtn = (props) => {
  return (
    <div>
      {props.followed
        ? <button 
            disabled={props.followingInProgress.some(id => id === props.userId)} 
            onClick={() => props.unfollow(props.userId)}>
            Unfollow
          </button>
        : <button 
            disabled={props.followingInProgress.some(id => id === props.userId)} 
            onClick={() => props.follow(props.userId)}>
            Follow
          </button>
      }
    </div>
  );
}

export default FollowBtn;
