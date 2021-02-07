import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { findErrors } from '../../actions/errorAction'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import dp from '../../image/side.jpg'
import icon from '../../image/icon.png'
import { NavbarBrand } from 'reactstrap'
class OrgSide extends Component {
    static propTypes = {
        isAuthenticated: propTypes.bool,
    }
    componentDidUpdate() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {});
        });
    }

    render() {
        var { isAuthenticated, user } = this.props.auth
        var userid = (
            <Fragment>
                <a href="#id"><h6 style={{ color: "orange" }}>Name:{user ? user.name : null}</h6></a>
                <a href="#id"><h6 style={{ color: "orange" }}>Employee id:{user ? user.id : null}</h6></a>
            </Fragment>
        )
        var sidebar1 = (
            <Fragment>
                <ul id="nav-mobile" className="sidenav sidenav-fixed">
                    <li><div className="user-view " >
                        <NavbarBrand href="/organisation" style={{ color: "#ffb300" }}>Akasi Systems</NavbarBrand>
                        <div className="background">
                            <img src={dp} alt="sidebarimage" style={{ width: "250px" }} />
                        </div>
                        <a href="#user"><img className="circle" src={icon} alt="employee" /></a>
                        {isAuthenticated ? userid : null}
                    </div></li>
                    <li><Link className="waves-effect" href="#!" to={`/Organisation/user/${user.id}`}>Home</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link className="waves-effect" href="#!" to="/Organisation/Issues">Issues</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link className="waves-effect" href="#!" to="/Organisation/employees">Employees</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link className="waves-effect" href="#!" to="/Organisation/profile">Update Organisation</Link></li>
                    <li><div className="divider"></div></li>
                    <li><Link className="waves-effect" href="#!" to="/Organisation/Password">Change Organisation password</Link></li>
                </ul>
            </Fragment>
        )
        return (
            <div>
                {sidebar1}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth

});
export default connect(mapStateToProps, { findErrors })(OrgSide);