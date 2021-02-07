import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import { OrgTable } from '../../actions/SuperAdmin'
import { registerUser } from '../../actions/orgAuthActions';
import { clearError, findErrors } from '../../actions/errorAction';
import Navb from './Nav'
import { connect } from 'react-redux'
import M from 'materialize-css'
import { Button, Form, Input, Alert } from 'reactstrap';

class Employees extends Component {
    state = {
        isOpen: false,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        isSubmitted: false
    }
    componentDidMount() {

        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
        });
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems, {});
        });
        this.props.OrgTable()
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
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        var { users } = this.props.org

        console.log(this.props.org.users)
        var m2odal = (
            <Fragment>
                <div class="modal fade" id="Status_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Issue Status</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
      </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary green" data-dismiss="modal">Resolve issue</button>
                                <br />
                                <button type="button" class="btn btn-primary red">Ignore</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        var list = (
            <Fragment>

                <div >
                    <table className="table responsive-table   " >
                        <thead className="thead-dark">
                            <tr>
                                <th style={{ fontSize: "25px" }}>Org ID</th>
                                <th style={{ fontSize: "25px" }}>Org Name</th>
                                <th style={{ fontSize: "25px" }}>Administrator</th>
                                <th style={{ fontSize: "25px" }}>Email</th>
                                <th style={{ fontSize: "25px" }}>Issue</th>

                            </tr>
                        </thead>

                        <tbody>

                            {users.users.map(({ org_id, org_name, admin_name, admin_email }) => (
                                <CSSTransition>
                                    <tr key={org_id}>
                                        <td style={{ fontSize: "18px" }}>{org_id}</td>
                                        <td style={{ fontSize: "18px" }}>  {org_name}</td>
                                        <td style={{ fontSize: "18px" }}>{admin_name}</td>
                                        <td style={{ fontSize: "18px" }}>{admin_email}</td>
                                        <tb>
                                            <button type="button" class="btn btn-primary blue" data-toggle="modal" data-target="#Status_model">Status</button>
                                        </tb>
                                        <td>{m2odal}</td>
                                    </tr>

                                </CSSTransition>
                            ))}

                        </tbody>
                    </table>

                </div>
            </Fragment>
        )

        var Addemployee = (
            <Fragment>

                <div className="float-right mr-5 mt-5 ">
                    <h4 style={{ marginRight: '80px' }}>Add Organisation</h4>
                    <Link className="btn-floating btn-large deep-purple" to="/Administrator/user/AddOrg" ><i className="material-icons">add</i></Link>
                </div>

            </Fragment>
        )


        return (
            <div>
                <Navb />
                <h3 className="row d-flex justify-content-center ml-4">List of Organisations</h3>
                <div className="col d-flex justify-content-center ml-4">{list}</div>
                {Addemployee}
            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    auth: state.auth,
    org: state.org
})
export default connect(mapStateToProps, { OrgTable, clearError, findErrors, registerUser })(Employees)