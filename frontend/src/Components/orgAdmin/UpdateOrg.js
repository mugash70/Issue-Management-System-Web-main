import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Form, Input } from 'reactstrap'
import { findErrors } from '../../actions/errorAction'
import { updateOrg } from '../../actions/orgAuthActions'
import Navb from './Orgnav'
class UpdateOrg extends Component {
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
        var { profile_photo, email, tel, home, info } = this.state;
        var user = { profile_photo, email, tel, home, info }
        this.props.updateOrg(user)
    }

    render() {
        var Profile = (
            <Fragment>
                <Form className="form-horizontal" onSubmit={this.handleSubImg}>
                    <fieldset className="fieldset" style={{ marginLeft: "100px" }}>
                        <h3 className="fieldset-title">Organisation Info</h3>
                        <h5>Logo :</h5>
                        <div className="form-group avatar">
                            <figure className="figure col-md-2 col-sm-3 col-xs-12">
                                <img className="img-rounded img-responsive" src="https://i.pinimg.com/236x/ed/91/ac/ed91ac131f85b86c3e3fa7816c3af156.jpg " alt="" />
                            </figure>
                            <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                                <Input type="file" className="file-uploader pull-left" onChange={this.handleInputChange} name="profile_photo" id="profile_photo" />
                            </div>
                        </div>
                    </fieldset>

                    <div className="col s5 pull-s7" style={{ marginLeft: "100px" }}>
                        <div className="form-group">
                            <h5 className="col-md-2  col-sm-3 col-xs-12 control-label">Add Email:</h5>
                            <div className="col-md-10 col-sm-9 col-xs-12">
                                <Input id="email" type="email" className="form-control" onChange={this.handleInputChange} name="email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <h5 className="col-md-2  col-sm-3 col-xs-12 control-label">Phone Number:</h5>
                            <div className="col-md-10 col-sm-9 col-xs-12">
                                <Input id="tel" type="tel" className="form-control" name="tel" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <h5 className="col-md-2  col-sm-3 col-xs-12 control-label">Organisation Mission:</h5>
                            <div className="col-md-10 col-sm-9 col-xs-12">
                                <Input id="home" type="text" className="form-control" onChange={this.handleInputChange} name="home" />
                            </div>
                        </div>
                        <div class="form-group form-floating">
                            <div class="input-field col s12">
                                <h5 className="col-md-2  col-sm-3 col-xs-12 control-label">Some Organisation Infomation:</h5>
                                <textarea id="info" type="text" className="form-control" style={{ height: "100px" }} onChange={this.handleInputChange} name="info" data-length="120"></textarea>

                            </div>
                        </div>

                        <div className="form-group col d-flex justify-content-center ml-4">
                            <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                                <Input className="btn btn-primary deep-purple" type="submit" value="Update Profile" />

                            </div>
                        </div>
                    </div>


                </Form>
            </Fragment >
        )
        return (
            <div>
                <Navb />
                <div className="col d-flex justify-content-center ml-5">{Profile}</div>
            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth
})
export default connect(mapStateToProps, { updateOrg, findErrors })(UpdateOrg)