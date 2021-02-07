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
import { Slogin } from '../../actions/SuperAdmin'
import { findErrors, clearError } from '../../actions/errorAction'
import propTypes from 'prop-types'
class Login extends Component {

    static propTypes = {
        isAuthenticated: propTypes.bool,
        Slogin: propTypes.func.isRequired
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            var { user } = nextProps.auth
            this.props.history.push(`/Administrator/user/${user.id}`)
        }
    }
    componentWillMount() {
        this.props.clearError()
    }
    componentDidUpdate(preProps) {
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
        this.props.Slogin(user);
    }

    render() {

        var Login_card = (
            <Fragment>
                <div className="col d-flex justify-content-center " >
                    <div className="row">
                        <div className="row s12 m8">
                            <div className="card  " style={{ marginTop: "50px", float: "none" }}>
                                <div className="card-content">
                                    <Form onSubmit={this.handleLogin}>
                                        <h3 className="center" >Administrator</h3>
                                        {this.state.msg ? (<Alert style={{ textAlignVertical: "center", textAlign: "center", }} className="msg centered-message" color="danger">{this.state.msg} </Alert>) : null}
                                        <div className="col">
                                            <h5>Email:</h5>
                                            <div className="input-field row s6">
                                                <i className="material-icons prefix">account_circle</i>
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    onChange={this.handleInputChange}
                                                    name="email" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5>Password:</h5>
                                            <div className="input-field row s6"><i className="material-icons prefix">security</i>
                                                <Input id="password" type="password" onChange={this.handleInputChange} name="password" />
                                            </div>
                                        </div>
                                        <div className="center">
                                            <Button className=" white-text accent-4 purple"  >Login</Button>

                                            <br></br>
                                            <Link className="forgot" to="/forgot2">Forgot password</Link>
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
                {Login_card}
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps, { Slogin, findErrors, clearError })(Login)