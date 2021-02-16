import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import NavbarActions from "./NavbarActions";

function NavbarNav() {
  const quickActionItems = [
    {
      text: "Register new resident",
      icon: '',
      path: "/new-tenant"
    },
    {
      text: "Add an Incident",
      icon: '',
      path: "/search-resident"
    }
  ];
  return <NavbarActions actions={quickActionItems} />;
}
export default NavbarNav;
