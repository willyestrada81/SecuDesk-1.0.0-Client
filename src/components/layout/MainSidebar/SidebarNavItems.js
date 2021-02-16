import React, { useState } from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

function SidebarNavItems () {

  const [navItems, SetNavItems] = useState(Store.getSidebarItems());

  // const onChange = () => {
  //   SetNavItems(Store.getSidebarItems())
  // }

  return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {navItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
}

export default SidebarNavItems;
