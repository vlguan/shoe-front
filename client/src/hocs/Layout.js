import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth.ts';

const Layout = ({ children, checkAuthenticated }) => {
    useEffect(() => {
        checkAuthenticated();
    }, []);

    return (
        <Fragment>
            {/* <Navbar /> */}
            {children}
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated })(Layout);