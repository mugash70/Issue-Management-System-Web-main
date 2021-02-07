import React, { Component, Fragment } from 'react'
import { Form, Input } from 'reactstrap'
import Navb from './Orgnav'
import { updatePassword } from '../../actions/orgAuthActions'
import { connect } from 'react-redux'
import { findErrors } from '../../actions/errorAction'
import propTypes from 'prop-types'
class OrgPassword extends Component {
    static propTypes = {
        auth: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,
        org: propTypes.object.isRequired
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubImg = (e) => {
        e.preventDefault();
        var { temporary_pw, updated_pw, updated_pw_con } = this.state;
        var user = { temporary_pw, updated_pw, updated_pw_con }
        this.props.updatePassword(user)
    }
    render() {
        var ChangePass = (
            <Fragment>
                <div className="col d-flex justify-content-center ml-4" >

                    <div className="row">
                        <div className="row s12 m8">

                            <div className="card" style={{ marginTop: "50px", float: "none", padding: "40px" }}>
                                <h3 className="col d-flex justify-content-center ml-4" style={{ color: "#42a5f5" }}> Update Password</h3>
                                <div className="card-content">
                                    <Form onSubmit={this.handleSubImg}>
                                        <h5 className="center">Old Password</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                id="temporary_pw"
                                                type="password"
                                                onChange={this.handleInputChange}
                                                name="temporary_pw" />
                                        </div>
                                        <h5 className="center">New Password</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                id="updated_pw"
                                                type="password"
                                                onChange={this.handleInputChange}
                                                name="updated_pw" />
                                        </div>
                                        <h5 className="center">Confrim Password</h5>
                                        <div className="input-field row s6">

                                            <Input
                                                id="updated_pw_con"
                                                type="password"
                                                onChange={this.handleInputChange}
                                                name="updated_pw_con" />
                                        </div>
                                        <div className="center">
                                            <button className="btn waves-effect waves-light deep-purple" type="submit" name="action">Change
                                          {/* <i class="material-icons right">send</i> */}
                                            </button>
                                        </div>

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        return (
            <div>
                <Navb />

                <div>{ChangePass}</div>

            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
})
export default connect(mapStateToProps, { updatePassword, findErrors })(OrgPassword)