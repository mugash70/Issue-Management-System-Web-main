import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import propTypes from 'prop-types'
import { Form, Container, Input } from 'reactstrap'
import Navb from './usernav'
class userprofile extends Component {

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubImg = (e) => {
        e.preventDefault();
        var { profile_photo, email, tel, home } = this.state;
        console.log(profile_photo, email, tel, home)
    }

    render() {
        var Profile = (
            <Fragment>
                <Form className="form-horizontal" onSubmit={this.handleSubImg}>
                    <fieldset className="fieldset" style={{ marginLeft: "100px" }}>
                        <h3 className="fieldset-title">Personal Info</h3>
                        <div className="form-group avatar">
                            <figure className="figure col-md-2 col-sm-3 col-xs-12">
                                <img className="img-rounded img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </figure>
                            <div className="form-inline col-md-10 col-sm-9 col-xs-12">
                                <Input type="file" className="file-uploader pull-left" onChange={this.handleInputChange} name="profile_photo" id="profile_photo" />
                                {/* <button type="submit" className="btn btn-sm btn-default-alt pull-left deep-purple">Update Image</button> */}
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
                            <h5 className="col-md-2  col-sm-3 col-xs-12 control-label">Residence:</h5>
                            <div className="col-md-10 col-sm-9 col-xs-12">
                                <Input id="home" type="text" className="form-control" onChange={this.handleInputChange} name="home" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group col d-flex justify-content-center ml-4">
                        <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                            <Input className="btn btn-primary deep-purple" type="submit" value="Update Profile" />
                        </div>
                    </div>

                </Form>
            </Fragment >
        )
        return (
            <div>
                <Navb />
                <Container>

                    {Profile}
                </Container>

            </div>
        )
    }
}
var mapStateToProps = (state) => ({
    error: state.error,
    auth: state.auth,
})
export default connect(mapStateToProps)(userprofile)