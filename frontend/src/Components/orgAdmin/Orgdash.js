import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getOrgdetails } from '../../actions/orgAuthActions'
import { findErrors } from '../../actions/errorAction'
import Navb from './Orgnav'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
class Userdash extends Component {

    static propTypes = {
        auth: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,
    }
    componentDidMount() {
        // this.props.getOrgdetails();
    }
    render() {
        var { user } = this.props.auth
        console.log(user)
        var card1 = (
            <Fragment>
                <div className=" d-flex justify-content-end w-50 ">
                    <div className="row">
                        <div className="col s12 m5">
                            <div className="card-panel ">
                                <h5 className="card-title"> Add Issue:</h5>
                                <h6>
                                    issue can be shared throught the organisation
                                </h6>
                                <Link className="btn-floating btn-large deep-purple" to="/Organisation/Issues" ><i class="material-icons">add</i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>)
        var card2 = (
            <Fragment>

                <div className="card w-50">
                    <div className="card-body">
                        <h4 className="card-title">New Info:</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item blue">new Issues:50
                            {/* {noIssues} */}
                            </li>
                            <li className="list-group-item">No of employees:1000
                            {/* {noEmployee} */}
                            </li>
                            <li className="list-group-item teal">Organisation:
                             {user ? ` ${user.org_name}` : null}
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>)

        var card3 = (
            <Fragment>
                <div className="row  w-50" >
                    <div className="col s12 m5">
                        <div className="card-panel deep-purple">
                            <h5 className="card-title "> Organisation:</h5>
                            <p className="white-text">
                                what its overall goal is, identifying the goal of its operations: what kind of product or service it provides, .....
                                </p>
                            {/* {info} */}
                        </div></div>
                </div>

            </Fragment >)
        var card4 = (
            <Fragment>
                <div className="card w-50">
                    <div className="card-body">
                        <h5 className="card-title">Contact</h5>
                        <p className="card-text">Email: {user ? ` ${user.email}` : null}</p>
                        <p className="card-text">Phone: {user ? ` ${user.phone}` : null}</p>
                    </div>
                </div>
            </Fragment>)
        return (
            <div>
                <Navb />

                <Container style={{ marginLeft: "300px" }} >
                    <div className="row d-flex justify-content-center ml-5">
                        {card1}
                        {card2}
                    </div>
                    <div className="row d-flex justify-content-center ml-5" >
                        {card3}
                        {card4}
                    </div>
                </Container>
            </div >

        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
})
export default connect(mapStateToProps, { getOrgdetails, findErrors })(Userdash)