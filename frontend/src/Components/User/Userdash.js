import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { findErrors } from '../../actions/errorAction'
import Navb from '../usernav'

class Userdash extends Component {

    static propTypes = {
        auth: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        console.log(this.props.auth)
        return (
            <div>
                <Navb />
                <h3>Dashboard</h3>
            </div>

        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
})
export default connect(mapStateToProps, { findErrors })(Userdash)