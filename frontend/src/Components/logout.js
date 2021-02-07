import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { logout } from '../actions/AuthAction'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
export class Logout extends Component {
    static propTypes = {
        logout: propTypes.func.isRequired
    }
    render() {
        return (
            <Fragment>
                <Link onClick={this.props.logout} to='/'>Logout</Link>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout)