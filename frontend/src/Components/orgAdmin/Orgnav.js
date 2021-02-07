import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import M from 'materialize-css'
import { findErrors } from '../../actions/errorAction'
import { logout } from '../../actions/AuthAction'
import Logout from '../logout'
import { Redirect } from "react-router-dom"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import OrgSide from './OrgSide'
class Orgnav extends Component {
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
        var home = (
            <Redirect to="/organisation"></Redirect>
        )


        var org = (
            <Fragment>
                <span className="navbar-text">
                    <strong style={{ color: "black" }}>Org: {user ? ` ${user.org_name}` : null}</strong></span>
            </Fragment>
        )
        var auth = isAuthenticated ? (
            <Fragment>
                <NavItem>
                    <span className="navbar-text">
                        <strong style={{ color: "black" }}>Admin :{user ? ` ${user.name}` : null}</strong></span>
                </NavItem>
            </Fragment>
        ) : (home)
        var auth2 = (
            <Fragment>
                <NavItem >
                    <Logout />
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
        var Nav3 = (
            <Fragment>
                <Navbar color=' deep-purple' dark expand="sm" className="mb" >
                    <OrgSide />
                    <Container>
                        {sidebar}
                        {org}
                        {auth}
                    </Container>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {auth2}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment >
        )
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
export default connect(mapStateToProps, { findErrors, logout })(Orgnav);