import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { employeeTable } from '../../actions/orgAuthActions'
import Navb from './Orgnav'
import { connect } from 'react-redux'

class Employees extends Component {
    state = {
        isOpen: false
    }
    componentDidMount() {
        this.props.employeeTable()
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        var { users } = this.props.org
        console.log(this.props)
        var list = (
            <Fragment>

                <div >
                    <table className="table responsive-table   " >
                        <thead className="thead-dark">
                            <tr>
                                <th style={{ fontSize: "25px" }}>Id</th>
                                <th style={{ fontSize: "25px" }}>Name</th>
                                <th style={{ fontSize: "25px" }}>Email</th>
                                <th style={{ fontSize: "25px" }}>Role</th>
                                <th style={{ fontSize: "25px" }}>Issue</th>

                            </tr>
                        </thead>

                        <tbody>


                            {this.props.org.users.map(({ id, name, email, role }) => (
                                <CSSTransition>
                                    <tr key={id}>
                                        <td style={{ fontSize: "18px" }}>{id}</td>
                                        <td style={{ fontSize: "18px" }}>  {name}</td>
                                        <td style={{ fontSize: "18px" }}>{email}</td>
                                        <td style={{ fontSize: "18px" }}>{role}</td>
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
                    <h4 style={{ marginRight: '80px' }}>Add Employee</h4>
                    <Link className="btn-floating btn-large deep-purple" to="/Organisation/AddUser" ><i className="material-icons">add</i></Link>
                </div>

            </Fragment>
        )

        return (
            <div>
                <Navb />
                <h3 className="row d-flex justify-content-center ml-4">List of employeees & Issues</h3>
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
export default connect(mapStateToProps, { employeeTable })(Employees)