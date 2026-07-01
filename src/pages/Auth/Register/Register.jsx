import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';




const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();


    const handleRegistration = async (data) => {
        try {
            const profileImg = data.photo[0];

            // Step 1: Register user with Firebase Auth
            await registerUser(data.email, data.password);
            console.log('✅ User registered with Firebase Auth');

            // Step 2: Upload image to ImgBB
            const formData = new FormData();
            formData.append('image', profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload}`;
            
            const imgResponse = await axios.post(image_API_URL, formData);
            const photoURL = imgResponse.data.data.url;
            console.log('✅ Image uploaded to ImgBB');

            // Step 3: Update Firebase profile
            const userProfile = {
                displayName: data.name,
                photoURL: photoURL
            };
            await updateUserProfile(userProfile);
            console.log('✅ Firebase profile updated');

            // Step 4: Create user in database (wait for AuthContext to update user state)
            // Small delay to ensure auth.currentUser is updated with new profile
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoURL
            };
            const dbResponse = await axiosSecure.post('/users', userInfo);
            
            if (dbResponse.data.insertedId) {
                console.log('✅ User created in database');
            } else {
                console.log('ℹ️ User already exists in database');
            }

            // Step 5: Navigate to home/dashboard
            console.log('✅ Registration complete, navigating...');
            navigate(location.state || '/');
            
        } catch (error) {
            console.error('❌ Registration error:', error);
            alert(`Registration failed: ${error.message || 'Unknown error'}`);
        }
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
            <p className='text-center'>Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text"
                        {...register('name', { required: true })}
                        className="input"
                        placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    {/* photo image field */}
                    <label className="label">Photo</label>

                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />

                    {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 characters or longer
                        </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;