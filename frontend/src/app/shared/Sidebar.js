import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

function Sidebar() {
  const location = useLocation();
  const [menuState, setMenuState] = useState({});

  const toggleMenuState = (menu) => {
    setMenuState((prevMenuState) => ({
      ...Object.keys(prevMenuState).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prevMenuState[menu] || true,
    }));
  };

  const isPathActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      {/* ... (rest of your code) */}
      <li className={isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
        <Link className="nav-link" to="/dashboard">
          <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
          <span className="menu-title"><Trans>Dashboard</Trans></span>
        </Link>
      </li>
      <li className={isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
        <div
          className={menuState.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
          onClick={() => toggleMenuState('basicUiMenuOpen')}
        >
          <span className="menu-icon">
            <i className="mdi mdi-laptop"></i>
          </span>
          <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
          <i className="menu-arrow"></i>
        </div>
        <Collapse in={menuState.basicUiMenuOpen}>
          <div>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'}
                  to="/basic-ui/buttons"
                >
                  <Trans>Buttons</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'}
                  to="/basic-ui/dropdowns"
                >
                  <Trans>Dropdowns</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'}
                  to="/basic-ui/typography"
                >
                  <Trans>Typography</Trans>
                </Link>
              </li>
            </ul>
          </div>
        </Collapse>
      </li>
      {/* ... (continue with other menu items) */}
    </nav>
  );
}

export default Sidebar;