import React, { Component, Fragment } from 'react'

import Navb from './Orgnav'
class orgIssues extends Component {

    render() {
        var Issues = (
            <Fragment>
                <h1>Issues</h1>
            </Fragment>
        )
        return (
            <div>
                <Navb />
                <div className="col d-flex justify-content-center ml-4">{Issues}</div>
            </div>
        )
    }
}
export default orgIssues