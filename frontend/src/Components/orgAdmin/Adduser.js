import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/orgAuthActions';
import { clearError, findErrors } from '../../actions/errorAction';
import { Alert, Button, Form, Input } from 'reactstrap';
import M from 'materialize-css'
import Navb from './Orgnav'
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
        var { token } = this.props.auth
        var { name, email, password, role } = this.state;
        var user = { name, email, password, role, token };
        this.props.registerUser(user);
    }
    render() {
        var reg = (
            <Fragment>
                <div className="d-flex justify-content-center ml-4" >
                    <div className="row">
                        <div className="row s12 m8">
                            <div className="card" style={{ marginTop: "50px", float: "none", padding: "40px" }}>
                                <h3 className="col d-flex justify-content-center ml-4" style={{ color: "#42a5f5" }}> Add Employee/User</h3>
                                <div className="card-content">
                                    <Form onSubmit={this.AddUser}>
                                        {this.state.msg ? (<Alert style={{ textAlignVertical: "center", textAlign: "center", }} className="msg centered-message" color="danger">{this.state.msg} </Alert>) : (null)}
                                        <h5>Full Names</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="text"
                                                name="name"
                                                placeholder="Enter first name"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        {/* <h5>Last name</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="text"
                                                name="last_name"
                                                placeholder="Enter last name"
                                                onChange={this.handleInputChange}
                                            />
                                        </div> */}

                                        <h5>Email address</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>

                                        <h5>Temporary Password:</h5>
                                        <div className="input-field row s6">
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <h5>Choose Role:</h5>
                                                <select type="text" name="role" id="role" onChange={this.handleInputChange} defaultValue={'DEFAULT'}>
                                                    <option value="DEFAULT" disabled>Choose your option</option>
                                                    <option value="manager" onChange={this.handleInputChange}>Manager</option>
                                                    <option value="employee" onChange={this.handleInputChange}>Employee</option>
                                                    <option value="3">Option 3</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="action-items mt-5 float-right ">
                                            <Button className="deep-purple" type="submit">Add User/Employee</Button>
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