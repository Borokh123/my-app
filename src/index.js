import reportWebVitals from './reportWebVitals';
import store from './redux/ReduxStore'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import SamuraiJSApp from './App';
// addMessage('addMessage');

const root = ReactDOM.createRoot(document.getElementById('root'));

// setInterval(() => {
//     store.dispatch({ type: 'FAKE' })
// }, 1000)

root.render(
    // <Provider store={store}>
    //     <React.StrictMode>
    //         <App state={store.getState()} dispatch={store.dispatch.bind(store)} store={store} />
    //     </React.StrictMode>
    // </Provider>
    <SamuraiJSApp/>
);








// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
