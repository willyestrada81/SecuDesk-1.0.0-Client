import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Col } from "shards-react";

import { AuthContext } from "../../../context/auth";
import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";

const MainSidebar = () => {

  const { user } = useContext(AuthContext);

  const [items, setItems] = useState({
    menuVisible: false,
    sidebarNavItems: Store.getSidebarItems()
  });


    // Store.addChangeListener({onChange});

  // componentWillUnmount() {
  //   Store.removeChangeListener(onChange);
  // }

  const onChange = () => {
    setItems({
      ...items,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }
    if (user) {
      return (
        <Col
          tag="aside"
          className="main-sidebar px-0 col-12"
          lg={{ size: 2 }}
          md={{ size: 3 }}
        >
          <SidebarMainNavbar />
          <SidebarSearch />
          <SidebarNavItems />
        </Col>
      );
    } else {
      return (
        <div></div>
      )
    }
  }

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};




// class MainSidebar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       menuVisible: false,
//       sidebarNavItems: Store.getSidebarItems()
//     };

//     this.onChange = this.onChange.bind(this);
//   }

//   componentWillMount() {
//     Store.addChangeListener(this.onChange);
//   }

//   componentWillUnmount() {
//     Store.removeChangeListener(this.onChange);
//   }

//   onChange() {
//     this.setState({
//       ...this.state,
//       menuVisible: Store.getMenuState(),
//       sidebarNavItems: Store.getSidebarItems()
//     });
//   }

//   render() {
//     const classes = classNames(
//       "main-sidebar",
//       "px-0",
//       "col-12",
//       this.state.menuVisible && "open"
//     );

//     return (
//       <Col
//         tag="aside"
//         className={classes}
//         lg={{ size: 2 }}
//         md={{ size: 3 }}
//       >
//         <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
//         <SidebarSearch />
//         <SidebarNavItems />
//       </Col>
//     );
//   }
// }

// MainSidebar.propTypes = {
//   /**
//    * Whether to hide the logo text, or not.
//    */
//   hideLogoText: PropTypes.bool
// };

// MainSidebar.defaultProps = {
//   hideLogoText: false
// };

export default MainSidebar;
