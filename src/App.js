import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import MainNavbar from "./components/layout/MainNavbar/MainNavbar";

import MainSidebar from "./components/layout/MainSidebar/MainSidebar";
// import UserProfileLite from "./views/UserProfileLite";
import ComponentsOverview from "./views/ComponentsOverview";
import Dashboard from "./views/Dashboard";
import LoginForm from "./views/LoginForm";
import Tenants from "./views/Tenants";
import BlogPosts from "./views/BlogPosts";
import AddNewTenant from "./views/AddNewTenant";
import Incidents from "./views/Incidents";
import Errors from "./views/Errors";
import NewIncidentByTenantId from "./views/NewIncidentByTenantId";
import SearchTenantForm from "./views/SearchTenantForm";
import TenantsSearchResult from "./views/TenantsSearchResult";
import UserProfileLite from "./views/UserProfileLite";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <MainSidebar />
          <MainNavbar />
          <AuthRoute exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/tenants" component={Tenants} />
          <Route exact path="/user-profile" component={UserProfileLite} />
          <Route
            exact
            path="/components-overview"
            component={ComponentsOverview}
          />
          <Route exact path="/blog-posts" component={BlogPosts} />
          <Route exact path="/new-tenant" component={AddNewTenant} />
          <Route exact path="/incident-logs" component={Incidents} />
          <Route exact path="/search-resident" component={SearchTenantForm} />
          <Route exact path="/new-incident/:id" component={NewIncidentByTenantId} />
          <Route exact path="/error" component={Errors} />
          <Route exact path="/search-result" component={TenantsSearchResult} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
