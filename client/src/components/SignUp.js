import React, { useState } from 'react'
import { errorMsgAlert, successMsgAlert } from '../helpers/Message';
import { showLoading } from '../helpers/Loading';
import { signup } from '../api/auth'
import { Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';

const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        password2: '',
        loading: false,
        successMsg: false,
        errorMsg: false
    });

    const { 
        fullName, 
        email, 
        password, 
        password2, 
        loading, 
        successMsg, 
        errorMsg 
    } = formData;

    const handleChange = (evt) => {
        //console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg:'',
            errorMsg:'', 
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        //client side validation

        if (isEmpty(fullName) || 
            isEmpty(email) || 
            isEmpty(password) || 
            isEmpty(password2)) {
            setFormData({
                ...formData, 
                errorMsg:'All fields are required'
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg:'Invalid email'
            });
        } else if (!equals(password, password2)) {
            setFormData({
                ...formData,
                errorMsg:'Passwords do not mach'
            });
        } else {
            const { fullName, email, password } = formData
            const data = { fullName, email, password }
            
            setFormData({
                ...formData,
                loading: true,
            });

            signup(data)
                .then(response => {
                    console.log(response);
                    console.log('Axios signup success', response);
                    setFormData({
                        fullName:'',
                        email:'',
                        password:'',
                        password2:'',
                        loading:false,
                        successMsg: response.data.successMessage,
                    });
                })
                .catch(err => {
                    console.log('Axios signup error', err);
                    setFormData({
                        ...formData,
                        loading:false,
                        errorMsg: err.response.data.errorMessage
                    });
                })
        }
    };

    /*const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; */

    console.log(formData);
    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={ handleSubmit } noValidate>
                {successMsg && successMsgAlert(successMsg)}
                {errorMsg && errorMsgAlert(errorMsg)}
                {loading && showLoading()}
                <Paper
                    sx={{ p: '2px 4px', margin: '12px', display: 'flex', alignItems: 'center', width:'400px' , maxWidth:'100%'}}
                    className='name-input'
                >
                    <PersonIcon/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputBase
                        fullWidth
                        name='fullName'
                        id="outlined-adornment-weight"
                        value={fullName}
                        placeholder='Full Name'
                        onChange={ handleChange }
                    />
                </Paper>
                <Paper
                    sx={{ p: '2px 4px', margin: '12px', display: 'flex', alignItems: 'center', width: 400, maxWidth:'100%' }}
                >
                    <MailOutlineIcon/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputBase
                        fullWidth
                        name='email'
                        value={email}
                        onChange={ handleChange }
                        placeholder='Email address'
                    />
                </Paper>
                <Paper
                    sx={{ p: '2px 4px', margin: '12px', display: 'flex', alignItems: 'center', width: 400, maxWidth:'100%' }}
                >
                    <LockIcon/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputBase
                        fullWidth
                        name='password'
                        value={password}
                        onChange={ handleChange }
                        placeholder='Password'
                    />
                </Paper>
                <Paper
                    sx={{ p: '2px 4px', margin: '12px', display: 'flex', alignItems: 'center', width: 400, maxWidth:'100%' }}
                >
                    <LockIcon/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputBase
                        fullWidth
                        name='password2'
                        value={password2}
                        onChange={ handleChange }
                        placeholder='Confirm password'
                    />
                </Paper>
                <Button 
                    variant="contained" 
                    type="submit" 
                    aria-label="signup"
                    sx={{ p: '6px 4px', margin: '5px 0', alignItems: 'center', width: 400, maxWidth:'100%' }}
                >
                    Sign Up
                </Button>
                <Typography sx={{ p: '6px 4px', margin: '5px 0', color:'#fff', display: 'flex', justifyContent: 'center', width: 400, maxWidth:'100%' }}>
                    Have an account? 
                    <Link 
                        to='/signin'
                    >
                        Login
                    </Link>
                </Typography>
            </form>
            {/* <div style={{position:'relative', top:'-30px', color:'white'}}>{JSON.stringify(formData)}</div> */}
        </div>
    )
}

export default SignUp;