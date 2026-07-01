import React from 'react';
import { Outlet } from 'react-router';


import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/NavBar/NavBar';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;