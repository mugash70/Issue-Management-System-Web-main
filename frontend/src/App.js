import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'materialize-css'
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/AuthAction'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

//home
import Home from './Components/Homepage'
//Super Admin
import SLogin from './Components/SuperAdm/Login'
import SProfile from './Components/SuperAdm/Update'
import SAddOrg from './Components/SuperAdm/AddOrg'
import SDash from './Components/SuperAdm/Dash'
import SIssues from './Components/SuperAdm/Issues'
import SOrganisations from './Components/SuperAdm/Organisations'
import Updatepw from './Components/SuperAdm/Spassword'

//user Organisation Admin 
import OrgLogin from './Components/orgAdmin/Orglogin'
import OrgProfile from './Components/orgAdmin/UpdateOrg'
import AddUser from './Components/orgAdmin/Adduser'
import OrgDash from './Components/orgAdmin/Orgdash'
// import OrgUpdatePass from './Components/orgAdmin/'
import OrgIssues from './Components/orgAdmin/orgIssues'
import OrgEmployees from './Components/orgAdmin/Employees'
import OrgPassword from './Components/orgAdmin/OrgPassword'

//user employee 
import Login from './Components/User/Userlogin'
import userDash from './Components/User/Userdash'
import Forgot from './Components/update'
import Updatepass from './Components/update'
import UpdateP from './Components/userprofile'

class App extends Component {
  // componentDidUpdate() {
  //   store.dispatch(loadUser())
  // }
  render() {
    return (
      <BrowserRouter>
        <Provider store={store} >
          <div>
            <Switch>
              {/* homepage */}
              <Route exact path='/' component={Home} />

              {/* Super Adminstrator */}
              <Route exact path='/Administrator' component={SLogin} />
              <Route exact path='/Administrator/user/Password' component={Updatepw} />
              <Route exact path='/Administrator/user/AddOrg' component={SAddOrg} />
              <Route exact path='/Administrator/user/Organisations' component={SOrganisations} />
              <Route exact path={'/Administrator/user/:id'} component={SDash} />
              <Route exact path='/Administrator/user/Sprofile' component={SProfile} />
              <Route exact path='/Administrator/user/Issues' component={SIssues} />

              {/* employee */}
              <Route exact path='/user' component={Login} />
              <Route exact path='/updatePassword' component={Updatepass} />
              <Route exact path='/updateProfile' component={UpdateP} />
              <Route exact path={'/user/:id'} component={userDash} />
              <Route exact path='/forgot' component={Forgot} />

              {/* Organisation */}
              <Route exact path='/Organisation' component={OrgLogin} />
              <Route exact path='/Organisation/employees' component={OrgEmployees} />
              <Route exact path={'/Organisation/user/:id'} component={OrgDash} />
              <Route exact path='/Organisation/AddUser' component={AddUser} />
              <Route exact path='/Organisation/Issues' component={OrgIssues} />
              <Route exact path='/Organisation/profile' component={OrgProfile} />
              <Route exact path='/Organisation/password' component={OrgPassword} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>

    )
  }
}

export default App;

