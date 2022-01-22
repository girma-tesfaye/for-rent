import React, { useState, Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import GroupIcon from '@mui/icons-material/Group';

//modal components
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

//api
import { createCategory } from '../api/category';

import { errorMsgAlert, successMsgAlert } from '../helpers/Message';
import { showLoading } from '../helpers/Loading';
import isEmpty from 'validator/lib/isEmpty';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    width: '100%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 0,
    borderRadius: '5px',
};


const AdminDahboard = () => {
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMessages = evt => {
        setErrorMsg('');
        setSuccessMsg('');        
    }

    const handleCategoryChange = (evt) => {
        setErrorMsg('');
        setSuccessMsg('');
        setCategory(evt.target.value);
    }

    const handleCategorySubmit = (evt) => {
        evt.preventDefault();
        
        if (isEmpty(category)) {
            setErrorMsg('Please add a category');
        } else {
            const data = { category }

            setLoading(true);
            createCategory(data)
                .then(response => {
                    setLoading(false);
                    setSuccessMsg(response.data.successMessage);
                })
                .catch(err => {
                    setLoading(false);
                    setErrorMsg(err.response.data.errorMessage);
                })
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{ background: 'azure'}} className='admin-dashboard-container' onClick={handleMessages}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ justifyContent: 'center', margin: '0 auto', padding: '20px' }}
            >
                <Item
                    sx={{ maxWidth: '250px', width: '100%', background: 'rgb(3, 169, 244)', alignSelf: 'center', padding: '0px' }}
                >

                    <div>
                        <form
                            onClick={handleCategorySubmit}
                        >
                            <button 
                                className='btn-1' 
                                onClick={handleOpen}
                            >
                                <AddIcon />
                                Add Category
                            </button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                <Box sx={style}>
                                    <div className='admndshbrd-modal-header'>
                                        Add Category
                                        <button onClick={handleClose}><CloseIcon/></button>
                                    </div>
                                    <div className='admndshbrd-modal-form'>
                                        {errorMsg && errorMsgAlert(errorMsg)}
                                        {successMsg && successMsgAlert(successMsg)}

                                        {
                                            loading ? (
                                                <div style={{textAlign:'center', marginTop: '10px'}}>{showLoading()}</div>
                                            ):(
                                                <Fragment>
                                                    <p>Category</p>
                                                    <input 
                                                        type='text'
                                                        onChange={handleCategoryChange} 
                                                        name='category'
                                                        value={category}
                                                    />
                                                </Fragment>
                                            )
                                        }
                                       
                                    </div>
                                    <div className='admndshbrd-modal-footer'>
                                        <button onClick={handleClose} style={{background: '#e1e1e1'}}>Close</button>
                                        <button type='submit' style={{background: 'rgb(3, 169, 244)'}}>Add</button>
                                    </div>
                                </Box>
                                </Fade>
                            </Modal>
                        </form>
                    </div>
                </Item>
                <Item
                    sx={{ maxWidth: '250px', width: '100%', background: 'rgb(46, 125, 50)', alignSelf: 'center', padding: '0px' }}
                >
                    <button className='btn-1'>
                        <ViewCozyIcon />
                        View Assets
                    </button>
                </Item>
                <Item
                    sx={{ maxWidth: '250px', width: '100%', background: '#1976d2', alignSelf: 'center', padding: '0px' }}
                >
                    <button className='btn-1'> 
                        <GroupIcon />
                        View Users
                    </button>
                </Item>
            </Stack>
        </div>
    )
}

export default AdminDahboard;