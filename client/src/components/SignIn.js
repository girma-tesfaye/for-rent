import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signin } from '../api/auth'
import { errorMsgAlert } from '../helpers/Message';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import { showLoading } from '../helpers/Loading';
import { Button, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';


const SignIn = () => {
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) { 
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard');
        }
    }, [history]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loading: false,
        errorMsg: false,

    });

    const { 
        email, 
        password, 
        loading, 
        errorMsg,
    } = formData;

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg:'', 
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (isEmpty(email) || 
            isEmpty(password)
        ) {
            setFormData({
                ...formData, 
                errorMsg:'All fields are required'
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg:'Invalid email'
            });
        } else {
            const { email, password } = formData
            const data = { email, password }
            
            setFormData({
                ...formData,
                loading: true,
            });

            signin(data)
                .then(response => {
                    setAuthentication(response.data.token, response.data.user);
                    
                    if (isAuthenticated() && isAuthenticated().role === 1) { 
                        history.push('/admin/dashboard');
                    } else {
                        history.push('/user/dashboard');
                    }
                })
                .catch(err => {
                    console.log('signin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                })
        }
    };


    return (
        <div className='signin-container'>
            <form className='signup-form' onSubmit={ handleSubmit } noValidate>
                {errorMsg && errorMsgAlert(errorMsg)}
                {loading && showLoading()}
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
                <Button 
                    variant="contained" 
                    type="submit" 
                    sx={{ p: '6px 4px', margin: '5px 0', alignItems: 'center', width: 400, maxWidth:'100%' }}
                >
                    Signin
                </Button>
                <Typography sx={{ p: '6px 4px', margin: '5px 0', color:'#fff', display: 'flex', justifyContent: 'center', width: 400, maxWidth:'100%' }}>
                    Don't have an account? 
                    <Link 
                        to='/signup'
                    >
                        Register
                    </Link>
                </Typography>
            </form>
            {/* <div style={{position:'relative', top:'-30px', color:'white'}}>{JSON.stringify(formData)}</div> */}
        </div>
    )
}

export default SignIn;