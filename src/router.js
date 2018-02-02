import React from "react";
import dva from "dva";
import { Router, Switch, Redirect } from "dva/router";
import Route from "react-router-hooks";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";

import weixin from "@/utils/weixin";
import logger from "@/utils/logger";
import Error from "./routes/Error";
import ProxyLoginComponent from "./routes/ProxyLogin";
import LoginComponent from "./routes/Login";
// import SignUp from "./routes/SignUp";
// import HomeQianDao from "./routes/Home/QianDao";
// import Invited from "./routes/Home/Invited";

const DefaultLayoutComponent = ({ routes }) => (
  routes.map((route, i) => (
    <RouteWithSubRoutes key={i} {...route}/>
  ))
);

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => {
  if (route.redirect) {
    return (
      <Redirect to={route.redirect}/>
    );
  }
  return (
    <Route
      exact={route.exact}
      path={route.path}
      onEnter={route.onEnter}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}
    />
  );
};

const forceLogin = (routerProps, replace, callback) => {
  if (dva.app._store.getState().auth.isLogin) {
    callback();
    return;
  }
  const redirect = window.location.pathname;
  logger.log("forceLogin", redirect, dva.app, routerProps);
  dva.app._store.dispatch({
    type: "auth/redirectLogin",
    payload: redirect
  }).then((res) => {
    logger.log("forceLogin res", res);
    // callback();
  }).catch(err => {
    logger.log("forceLogin err", err);
    replace("/error");
    // callback();
  });
};

const configWeiXin = (routerProps, replace, callback) => {
  logger.log("configWeiXin", routerProps);
  const p = window.location.origin + routerProps.path;
  // alert(p + window.location.href);
  weixin(p).then((res) => {
    logger.log("configWeiXin res", res);
    callback();
  }).catch(err => {
    logger.log("configWeiXin err", err);
    replace("/error");
    callback();
  });
};

const RouterConfig = ({ history, app }) => {
  const SignUp = dynamic({
    app,
    component: () => import("./routes/SignUp"),
  });
  const HomeQianDao = dynamic({
    app,
    component: () => import("./routes/Home/QianDao"),
  });
  const Trailer = dynamic({
    app,
    component: () => import("./routes/Trailer"),
  });
  const Programme = dynamic({
    app,
    component: () => import("./routes/Programme"),
  });
  const HomeQianDaoTest = dynamic({
    app,
    component: () => import("./routes/Home/QianDao/index_test"),
  });
  const Invited = dynamic({
    app,
    component: () => import("./routes/Home/Invited"),
  });
  const ChouJiang = dynamic({
    app,
    component: () => import("./routes/PC/ChouJiang"),
  });
  const PCQianDao = dynamic({
    app,
    component: () => import("./routes/PC/QianDao"),
  });

  // //////////////////////////////////////////////////////////
  // then our route config
  const routes = [
    {
      path: "/",
      exact: true,
      onEnter: forceLogin,
      redirect: "/home/invited",
    },
    {
      path: "/signup",
      component: SignUp,
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/proxy_login",
      component: ProxyLoginComponent,
    },
    {
      path: "/trailer",
      component: Trailer,
    },
    {
      path: "/programme",
      component: Programme,
    },
    {
      path: "/home",
      component: DefaultLayoutComponent,
      onEnter: forceLogin,
      routes: [
        {
          path: "/home/invited",
          component: Invited,
        },
        {
          path: "/home/qiandao",
          component: HomeQianDao,
        },
        {
          path: "/home/qiandao_test",
          component: HomeQianDaoTest,
        },
      ],
    },
    {
      path: "/pc",
      component: DefaultLayoutComponent,
      routes: [
        {
          path: "/pc/choujiang",
          component: ChouJiang,
        },
        {
          path: "/pc/qiandao",
          component: PCQianDao,
        },
      ],
    },
    {
      component: Error,
    },
  ];

  return (
    <Router history={history}>
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))
        }
      </Switch>
    </Router>
  );
};


RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};
export default RouterConfig;
