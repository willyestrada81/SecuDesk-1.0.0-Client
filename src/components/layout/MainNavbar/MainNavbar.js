import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import { AuthContext } from "../../../context/auth";
import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";

const MainNavbar = () => {
  const classes = classNames(
    "main-navbar",
    "bg-white"
  );

  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className={classes}>
        <Container className="p-0">
          <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
            <NavbarSearch />
            <NavbarNav />
            <NavbarToggle />
          </Navbar>
        </Container>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
