import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { setPager } from './core/app.pager';
import './public_path';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



function render(props: any) {
  const { container, pager } = props;
  // setApp(app);
  setPager(pager);

  ReactDOM.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <App />,
    getSubRootContainer(container)
  );
}

function getSubRootContainer(container: any) {

  return container ? container.querySelector('#root') : document.querySelector('#root');
}


// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {

}
export async function mount(props: any) {

  render(props)
}
export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(getSubRootContainer(container));
}
