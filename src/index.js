import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './bootstrap.min.css';
import './animate.css'
import './bootstrap-datepicker.css'
import './owl.carousel.min.css'
import './owl.theme.default.min.css'
import './mediumish.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
