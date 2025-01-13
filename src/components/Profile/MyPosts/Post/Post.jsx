import React from 'react'
import s from './Post.module.css'

const Post = (props) => {
    return (


        <div className={s.item}>
            <img src="https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2022-12/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-12-14%20%D0%B2%2021.33.12.png.jpg?itok=oY07F9bQ" alt="" />
            { props.message }
            <div>
                <span>Лайков:{props.like}</span>
            </div>
        </div>




    )
}

export default Post