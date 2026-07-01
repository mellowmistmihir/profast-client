import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx/AuthContext';


const UseAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo
};

export default UseAuth;