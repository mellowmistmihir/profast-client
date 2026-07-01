import React from 'react';
import UseAuth from '../hooks/UseAuth';

import useRole from '../hooks/useRole';

import Loading from '../Component/Loading/Loading';
import Forbidden from '../Component/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = UseAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;