import React from "react";
import { Outlet } from "react-router-dom";
// @mui
// hooks
// config
//

export default function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
