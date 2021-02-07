import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Foo_ter from './footer'
import homeimg from '../image/a.jpg'
import M from 'materialize-css'
class Home extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.parallax');
        M.Parallax.init(elems, {});
    }
    render() {
        var nav = (
            <Fragment>
                <nav>
                    <div className="nav-wrapper white">
                        {/* <Link href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></link> */}
                        <Link className=" black-text text-darken-2" href="#" className="brand-logo">Akasi~</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li ><Link className=" blue-text text-darken-2" to="/user">User</Link></li>
                            <li ><Link className=" blue-text text-darken-2" to="/organisation">Organisation</Link></li>
                            <li ><Link className=" blue-text text-darken-2" to="/Administrator">Administrator</Link></li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
        var Cont1 = (
            <Fragment>
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <br /><br />
                            <h1 className="header center indigo-text text-lighten-2">Akasi Systems</h1>
                            <div className="row center">
                                <h5 className="header col s12 light">Bhal bhal .................................................................!!!</h5>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                    <div className="parallax">
                        <img src={homeimg} alt="1" style={{}} />
                    </div>
                </div>
            </Fragment>
        )
        var Cont2 = (
            <Fragment>
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                                    <h5 className="center">Speeds up development</h5>

                                    <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                                    <h5 className="center">User Experience Focused</h5>

                                    <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                                    <h5 className="center">Easy to work with</h5>

                                    <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
        return (
            <div>
                {nav}
                {Cont1}
                {Cont2}

                <Foo_ter />
            </div>

        )
    }
}
export default Home;