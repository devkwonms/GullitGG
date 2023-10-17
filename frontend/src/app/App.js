import React from "react";
import Router from "../routes";
import "./App.scss";
import { RouterProvider } from "react-router-dom";

function App() {
  // const location = useLocation();
  // const { i18n } = useTranslation();
  // const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  // useEffect(() => {
  //   onRouteChanged();
  // }, [location]);

  // const onRouteChanged = () => {
  //   console.log("ROUTE CHANGED");
  //   // const body = document.querySelector("body");
  //   // if (location.pathname === "/layout/RtlLayout") {
  //   //   body.classList.add("rtl");
  //   //   i18n.changeLanguage("ar");
  //   // } else {
  //   //   body.classList.remove("rtl");
  //   //   i18n.changeLanguage("en");
  //   // }

  //   window.scrollTo(0, 0);

  //   const fullPageLayoutRoutes = [
  //     "/user-pages/login-1",
  //     "/user-pages/login-2",
  //     "/user-pages/register-1",
  //     "/user-pages/register-2",
  //     "/user-pages/lockscreen",
  //     "/error-pages/error-404",
  //     "/error-pages/error-500",
  //     "/general-pages/landing-page",
  //   ];

  //   setIsFullPageLayout(fullPageLayoutRoutes.includes(location.pathname));
  // };

  return <Router />;
}

{
  /* <div className="container-scroller">
{!isFullPageLayout ? (
  <>
    <div className="container-fluid page-body-wrapper" style={{ width: "100%" }}>
      <Navbar />
      <div className="main-panel">
        <div className="content-wrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  </>
) : (
  <div className="container-fluid page-body-wrapper">
    <div className="main-panel">
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  </div>
)}
</div> */
}
export default App;
