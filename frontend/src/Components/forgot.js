import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { clearError } from '../actions/errorAction'
import {
    Alert,
    Input,
    Form
} from 'reactstrap'
import { reset } from '../actions/AuthAction'
import propTypes from 'prop-types'
class forgot extends Component {
    static propTypes = {
        auth: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,
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
    componentWillMount() {
        this.props.clearError()
    }


    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleReset = (e) => {
        e.preventDefault();
        var { email } = this.state;
        var user = { email }

        this.props.reset(user);
    }

    render() {
        var { msg } = this.props.error
        console.log(msg)
        var forgotp = (
            <Fragment>
                <div className="col d-flex justify-content-center" >
                    <div className="row">
                        <div className="row s12 m8">
                            <div className="card" style={{ marginTop: "50px", float: "none" }}>
                                <div className="card-content">
                                    <Form onSubmit={this.handleReset}>
                                        <div className="card-panel deep-purple">
                                            <h5 style={{ color: "white" }}>
                                                "We Sometimes forget....but We gat you coverd
                                                just type in your Email for the reset."</h5> </div>
                                        {msg ? (<Alert style={{ textAlignVertical: "center", textAlign: "center", }} className="msg centered-message" color="danger">{msg.id} </Alert>) : null}
                                        <h4 className="center">Email:</h4>
                                        <div className="input-field row s6">
                                            <i className="material-icons prefix">account_circle</i>
                                            <Input
                                                id="email"
                                                type="email"
                                                onChange={this.handleInputChange}
                                                name="email" />
                                        </div>
                                        <div className="center">
                                            <button className="btn waves-effect waves-light" type="submit" name="action">Change
                                </button>
                                        </div>
                                    </Form>
                                </div></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )

        return (
            <div>
                {forgotp}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth

});
export default connect(mapStateToProps, { reset, clearError })(forgot)