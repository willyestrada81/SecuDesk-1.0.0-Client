import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './utilities/styles/secudesk.1.1.0.min.css'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'
import MainNavbar from './components/layout/MainNavbar/MainNavbar'

import MainSidebar from './components/layout/MainSidebar/MainSidebar'
import Dashboard from './views/Dashboard'
import LoginForm from './views/LoginForm'
import Tenants from './views/Tenants'
import Incidents from './views/Incidents'
import Errors from './views/Errors'
import SearchTenantForm from './components/tenants/SearchTenantForm'
import TenantsSearchResult from './views/TenantsSearchResult'
import Tenant from './views/Tenant'
import EmployeeAccount from './views/EmployeeAccount'

function App () {
  return (
    <AuthProvider>
      <Router>
        <div>
          <MainSidebar />
          <MainNavbar />
          <AuthRoute exact path='/login' component={LoginForm} />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/tenants' component={Tenants} />
          <Route exact path='/tenant/:id' component={Tenant} />
          <Route exact path='/user-profile' component={EmployeeAccount} />
          <Route exact path='/incident-logs' component={Incidents} />
          <Route exact path='/search-resident' component={SearchTenantForm} />\
          <Route exact path='/error' component={Errors} />
          <Route exact path='/search-result' component={TenantsSearchResult} />
          {/* <Route exact path='/reset-password/:id' component={ResetPassord} /> */}
          <AuthRoute exact path='/accounts/resident-registration/:id' component={LoginForm} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
