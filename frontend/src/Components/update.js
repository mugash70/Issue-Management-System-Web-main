import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Container, Input } from 'reactstrap'
import Navb from './usernav'
class update extends Component {
    state = {
        password: '',
        email: '',
        username: '',
        msg: null,
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        var change = (
            <Fragment>
                <div className="col d-flex justify-content-center ml-4" >

                    <div className="row">
                        <div className="row s12 m8">

                            <div className="card" style={{ marginTop: "50px", float: "none", padding: "40px" }}>
                                <h3 style={{ color: "#42a5f5" }}> Update Password</h3>
                                <div className="card-content">

                                    <Form>
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
                <Container>
                    {change}
                </Container>

            </div>)
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth,
})
export default connect(mapStateToProps)(update);