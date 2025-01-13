let initialState = {
  friends: [
    { id: 1, name: 'User 1', imgSrc: 'https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2022-12/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-12-14%20%D0%B2%2021.33.12.png.jpg?itok=oY07F9bQ' },
    { id: 2, name: 'User 2', imgSrc: 'https://pbs.twimg.com/media/GPrpm6fWMAA5G7r?format=jpg&name=large' },
    { id: 3, name: 'User 3', imgSrc: 'https://pbs.twimg.com/media/FqnhvIoXwAEHUL8?format=jpg&name=900x900' },

  ]
};
const SideBarReducer = (state = initialState, action) => {
  return state;
}
export default SideBarReducer;