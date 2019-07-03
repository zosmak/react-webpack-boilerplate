import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import MainContainer from "./components/container/MainContainer";

ReactDOM.render(
    <MainContainer />,
    document.getElementById('root')
);

module.hot.accept();