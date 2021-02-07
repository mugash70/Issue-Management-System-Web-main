import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import M from 'materialize-css'
import { findErrors } from '../actions/errorAction'
import { logout } from '../actions/AuthAction'
import { Redirect } from "react-router-dom"
import Logout from './logout'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem,
    Container

} from 'reactstrap'
import Usersidebar from './usersidebar'
class usernav extends Component {
    state = {
        isOpen: false
    }
    static propTypes = {
        auth: propTypes.object.isRequired,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {});
        var collapsibleElem = document.querySelector('.collapsible');
        M.Collapsible.init(collapsibleElem, {});
    }
    render() {
        var { isAuthenticated, user } = this.props.auth
        // var home = (
        //     <Redirect to="/"></Redirect>
        // )

        var org = (
            <Fragment>
                <span className="navbar-text">
                    <strong style={{ color: "black" }}>Org: Tric or treat</strong></span>
            </Fragment>
        )
        var auth = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text">
                        <strong style={{ color: "black" }}>User :{user ? ` ${user.name}` : null}</strong></span>
                </NavItem>
            </Fragment>
        )
        var auth2 = (
            <Fragment>
                <NavItem >
                    <Logout />
                    {/* <NavLink onClick={this.props.logout} href="#" style={{ color: "white" }}>logout</NavLink> */}
                </NavItem>
            </Fragment>
        )
        var sidebar = (
            <Fragment>
                <NavItem>
                    <a href="#!" data-target="nav-mobile" className="top-nav sidenav-trigger waves-effect waves-light circle hide-on-large-only"><i className="material-icons">menu</i></a>
                </NavItem>
            </Fragment>
        )
        var Nav3 = user ? (
            <Fragment>
                <Navbar color=' deep-purple' dark expand="sm" className="mb" >
                    <Usersidebar />
                    <Container>
                        {isAuthenticated ? sidebar : null}
                        {isAuthenticated ? org : null}
                        {isAuthenticated ? auth : null}
                    </Container>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? auth2 : null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment >
        ) : (null)
        return (
            <div>
                { Nav3}
            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth,
})
export default connect(mapStateToProps, { findErrors, logout })(usernav);