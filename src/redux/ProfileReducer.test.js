import ProfileReducer, { addPostActionCreator, deletePost } from "./ProfileReducer";

let state = {
    posts: [
        { id: 1, message: 'Hello', like: '5' },
        { id: 2, message: 'How are you', like: '6' },
        { id: 3, message: 'Nice to meet you', like: '7' },
        { id: 4, message: 'How are you doing', like: '8' },
    ]
};

it('posts are incremented in 1', () => {
    // Начальные данные (state и action)
    let action = addPostActionCreator('it-kamasutra.com');
        // Выполняем действие
    let newState = ProfileReducer(state, action);

    // Проверка
    console.log(newState.posts); // Отладка, чтобы посмотреть, что внутри posts
    expect(newState.posts.length).toBe(5); // Длина массива должна стать 5
      // expect(newState.posts[4].like).toBe(0); // Проверяем, что лайки у нового поста равны 0
});

it('message of new post should be it-kamasutra.com', () => {
    // Начальные данные (state и action)
    let action = addPostActionCreator('it-kamasutra.com');
        // Выполняем действие
    let newState = ProfileReducer(state, action);

    // Проверка
    console.log(newState.posts); // Отладка, чтобы посмотреть, что внутри posts
    expect(newState.posts[4].message).toBe('it-kamasutra.com'); // Проверяем текст нового поста
    
});

it('post is decremented in 1', () => {
    // Начальные данные (state и action)
    let action = deletePost(1);
        // Выполняем действие
    let newState = ProfileReducer(state, action);

    // Проверка
    expect(newState.posts.length).toBe(3);
     
});

it('after deleting, post is not decremented if id incorrect', () => {
    // Начальные данные (state и action)
    let action = deletePost(1000);
        // Выполняем действие
    let newState = ProfileReducer(state, action);

    // Проверка
    expect(newState.posts.length).toBe(4);
     
});