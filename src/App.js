import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './utilities/styles/secudesk.1.1.0.min.css'

import { AuthProvider } from './context/auth'
import { ToastMessageProvider } from './context/toastMessage'
import AuthRoute from './utils/AuthRoute'
import MainNavbar from './components/navigation/MainNavbar/MainNavbar'

import MainSidebar from './components/navigation/MainSidebar/MainSidebar'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Tenants from './views/Tenants'
import Incidents from './views/Incidents'
import Errors from './views/Errors'
import SearchTenantForm from './components/tenants/SearchTenantForm'
import TenantsSearchResult from './views/TenantsSearchResult'
import Tenant from './views/Tenant'
import EmployeeAccount from './views/EmployeeAccount'
import ToastMessages from './components/common/ToastMessages'
import Packages from './views/Packages'
import AdminPanel from './views/AdminPanel'
import ManageEmployees from './views/ManageEmployees'

function App () {
  return (
    <AuthProvider>
      <Router>
        <ToastMessageProvider>
          <MainNavbar />
          <MainSidebar />
          <ToastMessages />
          <AuthRoute exact path='/login' component={Login} />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/tenants' component={Tenants} />
          <Route exact path='/packages' component={Packages} />
          <Route exact path='/tenant/:id' component={Tenant} />
          <Route exact path='/user-profile' component={EmployeeAccount} />
          <Route exact path='/incident-logs' component={Incidents} />
          <Route exact path='/search-resident' component={SearchTenantForm} />
          <Route exact path='/error' component={Errors} />
          <Route exact path='/search-result' component={TenantsSearchResult} />
          <Route exact path='/admin-panel' component={AdminPanel} />
          <Route exact path='/manage-employees' component={ManageEmployees} />
          <AuthRoute exact path='/activate-user/:activationCode' component={Login} />
          <AuthRoute exact path='/accounts/:resetPassword' component={Login} />
        </ToastMessageProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
