import { Fragment, useEffect } from 'react';
import type { RouteObject } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Subscription } from 'rxjs';
import './App.css';
import { PagerMessage, SubAppPagerCollect } from './core/app.pager';
import logo from './logo.svg';
import routes from './routes';

// @ts-ignore
const __qiankun__ = !!window.__POWERED_BY_QIANKUN__;

const renderRoutes = (routesData: RouteObject[]) => {
  return routesData.map((item: RouteObject) => {
    const { children, path, caseSensitive, element } = item;
    if (Array.isArray(children) && children.length > 0) {
      return (
        <Route
          key={path}
          path={path}
          caseSensitive={caseSensitive}
          element={element}
        >
          {renderRoutes(children)}
        </Route>
      );
    }
    return (
      <Route
        key={path}
        path={path}
        caseSensitive={caseSensitive}
        element={element}
      />
    );
  });
};




function App() {



  let pagerSub: Subscription = new Subscription();

  useEffect(() => {
    pagerSub = SubAppPagerCollect().subscribe((msg: PagerMessage) => {
      if (msg) {
        console.log("app5 接收到主应用消息 : ", msg.data);
      }
    });

    return componentWillUnmount;
  }, []);

  const componentWillUnmount = () => {

    pagerSub?.unsubscribe?.();
  }


  return (
    <Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>App5 Component</h1>
      </header>
      <BrowserRouter basename={__qiankun__ ? '/portal/app5' : '/'}>
        <Routes>{renderRoutes(routes)}</Routes>
      </BrowserRouter>
    </Fragment >
  );
}

export default App;
