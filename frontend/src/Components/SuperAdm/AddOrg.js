import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/orgAuthActions';
import { clearError, findErrors } from '../../actions/errorAction';
import { Alert, Button, Form, Input } from 'reactstrap';
import M from 'materialize-css'
import Navb from './Nav'
class Adduser extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        isSubmitted: false
    };
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(elems, {});
        });
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems, {});
        });
        M.AutoInit();
    }
    componentDidUpdate(preProps) {
        var { error } = this.props
        if (error !== preProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    AddUser = (e) => {
        e.preventDefault();
        // var { token } = this.props.auth
        var { org_name, admin_name, email, admin_password, admin_phone_no, role } = this.state;
        var user = { org_name, admin_name, email, admin_password, admin_phone_no, role };
        this.props.registerUser(user);
    }
    render() {
        var reg = (
            <Fragment>
                <div className="d-flex justify-content-center ml-4" >
                    <div className="row">
                        <div className="row s12 m8">
                            <div className="card" style={{ float: "none", padding: "40px" }}>
                                <h3 className="col d-flex justify-content-center ml-4" style={{ color: "#42a5f5" }}> Add Organisation</h3>
                                <div className="card-content">
                                    <Form onSubmit={this.AddUser}>
                                        {this.state.msg ? (<Alert style={{ textAlignVertical: "center", textAlign: "center", }} className="msg centered-message" color="danger">{this.state.msg} </Alert>) : (null)}
                                        <h5>Organisation Names</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="text"
                                                name="org_name"
                                                placeholder="Enter Org name"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <h5>Administrator's Name</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="text"
                                                name="admin_name"
                                                placeholder="Enter Admin name"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>

                                        <h5>Email address</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        {/* row */}
                                        <div className="col">
                                            <h5>Temporary Password:</h5>
                                            <div className="input-field row s6">
                                                <Input
                                                    type="password"
                                                    name="admin_password"
                                                    placeholder="Enter password"
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <h5>Administrator phone Number:</h5>
                                            <div className="input-field row s6">
                                                <Input
                                                    type="number"
                                                    name="admin_phone_no"
                                                    placeholder="Organisation/Admin phone No"
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <div>

                                                <div className="input-field col s12">
                                                    <h5>Choose Role:</h5>
                                                    <select type="text" name="role" id="role" onChange={this.handleInputChange} defaultValue={'DEFAULT'}>
                                                        {/* <option value="Admin" disabled>Choose your option</option> */}
                                                        <option value="Administrator" onChange={this.handleInputChange}>Administrator</option>
                                                        <option value="3">Option 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="action-items mt-5 float-right ">
                                            <Button className="deep-purple" type="submit">Add Organisation</Button>
                                        </div>
                                    </Form>
                                </div></div></div></div></div>
            </Fragment >
        )
        return (
            <div>
                <Navb />
                {reg}
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
});
export default connect(mapStateToProps, { findErrors, registerUser, clearError })(Adduser);