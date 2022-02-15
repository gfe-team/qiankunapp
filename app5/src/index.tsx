import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './public_path';
import { setPager } from './core/app.pager';


function render(props: any) {
  const { container,pager } = props;
  setPager(pager);
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
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



