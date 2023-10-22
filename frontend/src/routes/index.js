import React, { Suspense, lazy } from "react";
import { useLocation, useRoutes, Routes, Route, useNavigate } from "react-router-dom";

import MainLayout from "../layouts/main";
import Spinner from "../app/shared/Spinner";
import Home from "../pages/Home";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {
  console.log("Router");
  const navigate = useNavigate();
  return useRoutes([
    // Dashboard Routes
    {
      path: "/",
      element: <MainLayout text={"텍스트"} asfjkl={"aa"} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/user/:nickname",
          element: <Dashboard />,
        },
        {
          path: "/basic-ui/buttons",
          element: <Buttons />,
        },
        {
          path: "/user-pages/login-1",
          element: <Login />,
        },
      ],
    },
    <Router fallback={<Spinner />}>
      <Routes>
        {/* Uncomment this if you have a Home component */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basic-ui/buttons" element={<Buttons />} />
        <Route path="/basic-ui/dropdowns" element={<Dropdowns />} />
        <Route path="/basic-ui/typography" element={<Typography />} />
        <Route path="/form-Elements/basic-elements" element={<BasicElements />} />
        <Route path="/tables/basic-table" element={<BasicTable />} />
        <Route path="/icons/mdi" element={<Mdi />} />
        <Route path="/charts/chart-js" element={<ChartJs />} />
        <Route path="/user-pages/login-1" element={<Login />} />
        <Route path="/user-pages/register-1" element={<Register1 />} />
        <Route path="/error-pages/error-404" element={<Error404 />} />
        <Route path="/error-pages/error-500" element={<Error500 />} />
        <Route path="*" element={() => navigate("/dashboard")} />
      </Routes>
    </Router>,
  ]);
}

const Dashboard = Loadable(lazy(() => import("../app/dashboard/Dashboard")));
const Buttons = Loadable(lazy(() => import("../app/basic-ui/Buttons")));
const Dropdowns = Loadable(lazy(() => import("../app/basic-ui/Dropdowns")));
const Typography = Loadable(lazy(() => import("../app/basic-ui/Typography")));
const BasicElements = Loadable(lazy(() => import("../app/form-elements/BasicElements")));
const BasicTable = Loadable(lazy(() => import("../app/tables/BasicTable")));
const Mdi = Loadable(lazy(() => import("../app/icons/Mdi")));
const ChartJs = Loadable(lazy(() => import("../app/charts/ChartJs")));
const Error404 = Loadable(lazy(() => import("../app/error-pages/Error404")));
const Error500 = Loadable(lazy(() => import("../app/error-pages/Error500")));
const Login = Loadable(lazy(() => import("../app/user-pages/Login")));
const Register1 = Loadable(lazy(() => import("../app/user-pages/Register")));
