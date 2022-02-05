import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

import isEmpty from 'validator/lib/isEmpty';

//api
import { createCategory } from '../api/category';

import { errorMsgAlert, successMsgAlert } from '../helpers/Message';
import { showLoading } from '../helpers/Loading';

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

const AdminCategoryModal = () => {
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

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
                    setCategory('');
                })
                .catch(err => {
                    setLoading(false);
                    setErrorMsg(err.response.data.errorMessage);
                })
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    
    return (
        <div>
            <form onSubmit={ handleCategorySubmit } noValidate>
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
                                    <>
                                        <p>Category</p>
                                        <input 
                                            type='text'
                                            onChange={handleCategoryChange} 
                                            name='category'
                                            value={category}
                                        />
                                    </>
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
    )
}

export default AdminCategoryModal;
