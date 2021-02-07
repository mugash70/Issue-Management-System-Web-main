// ./src/components/login.js
import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import {
    Button,
    Input,
    Form,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux';
// import { validateFields } from '../../actions/validate'
import { Userlogin } from '../../actions/AuthAction'
import { findErrors, clearError } from '../../actions/errorAction'
import propTypes from 'prop-types'
class Login extends Component {

    static propTypes = {
        isAuthenticated: propTypes.bool
    }
    state = {
        password: '',
        email: '',
        username: '',
        msg: null,
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        this.props.clearError()
    }
    componentDidUpdate(preProps) {
        if (preProps.auth.isAuthenticated) {
            var { user } = preProps.auth
            this.props.history.push(`/user/${user.id}`)
        }
        var { error } = this.props
        if (error !== preProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        var { email, password } = this.state;
        var user = { email, password }
        this.props.Userlogin(user);
    }
    render() {
        var Login_card = (
            <Fragment>
                <div className="col d-flex justify-content-center" >
                    <div className="row">
                        <div className="row s12 m8">
                            <div className="card" style={{ marginTop: "50px", float: "none" }}>
                                <div className="card-content">
                                    <Form onSubmit={this.handleLogin}>
                                        <h3 className="center">Login</h3>
                                        {this.state.msg ? (<Alert style={{ textAlignVertical: "center", textAlign: "center", }} className="msg centered-message" color="danger">{this.state.msg} </Alert>) : null}
                                        <div className="col">
                                            <h5 >Email:</h5>
                                            <div className="input-field row s6">
                                                <i className="material-icons prefix">account_circle</i>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    onChange={this.handleInputChange}
                                                    required
                                                    name="email" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5 >Password:</h5>
                                            <div className="input-field row s6"><i className="material-icons prefix">security</i>
                                                <Input id="password" type="password" onChange={this.handleInputChange} name="password" required />
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-3 text-danger text-capitalize font-weight-normal">
                                            {this.props.error.msg.message}
                                        </div>
                                        <div className="center">
                                            <Button className=" white-text indigo accent-4"  >Login</Button>
                                            <br></br>
                                            <Link className="forgot" to="/forgot">Forgot password</Link>
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
            <div className="center">
                {/* <Navb /> */}
                {Login_card}
            </div>

        )
    }
}
export const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
});

// export const mapDispatchToProps = (dispatch) => ({
//     UserLogin: userData => dispatch(Userlogin(userData)),
// });
export default connect(mapStateToProps, { Userlogin, findErrors, clearError })(Login);