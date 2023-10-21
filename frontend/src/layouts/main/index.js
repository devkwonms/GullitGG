import React from "react";
import { Outlet } from "react-router-dom";
// @mui
// hooks
// config
//

export default function MainLayout(param) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
