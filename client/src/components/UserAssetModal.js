import React, { useState, useEffect } from 'react';
import useModal from '../hooks/useModal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
//api
import { getCategories } from '../api/category';
import { createAsset } from '../api/asset';

import { errorMsgAlert, successMsgAlert } from '../helpers/Message';
import { showLoading } from '../helpers/Loading';

import isEmpty from 'validator/lib/isEmpty';
import isInt from 'validator/lib/isInt';

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
    maxHeight: '88vh',
};

const UserAssetModal = ({children}) => {
    
    const [categories, setCategories] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [assetData, setAssetData] = useState({
        assetImage: null,
        assetName: '',
        assetDsc: '',
        assetPrice: '',
        assetCategory: '',
        assetQty: ''
    
    
    });
    const { openModal, onOpenModal, onCloseModal } = useModal();

    const { 
        assetImage,
        assetName,
        assetDsc,
        assetPrice,
        assetCategory,
        assetQty
    } = assetData;

    /**********************
      LifeCycle Methode 
    **********************/

    useEffect(() => {
        loadCategories();
    }, [loading]);

    const loadCategories = async () => {
        await getCategories()
            .then(response => {
                setCategories(response.data.categories);
                console.log(categories)
            })
            .catch(err => {
                console.log(err)
            });

    };

    const handleMessages = evt => {
        setErrorMsg('');
        setSuccessMsg('');        
    }

    /***********************
      Asset events Handler 
    ************************/

      const handleAssetImage = (evt) => {
        console.log(evt.target.files[0]);
        setAssetData({
            ...assetData,
            [evt.target.name]: evt.target.files[0],
        });
    };

    const handleAssetChange = (evt) => {
        setAssetData({
            ...assetData,
            [evt.target.name]: evt.target.value
        });
    }

    const handleAssetSubmit = (evt) => {
        evt.preventDefault();
        
        if (assetImage === null) {
            setErrorMsg('Please add an image');
        } else if (
            isEmpty(assetName) ||
            isEmpty(assetDsc)
        ) {
           setErrorMsg('All fields are required'); 
        } else if (
            isEmpty(assetPrice) || 
            !isInt(assetPrice)
        ) {
            setErrorMsg('Price required fill a number');
        } else if (
            isEmpty(assetCategory)
        ) {
            setErrorMsg('Please select a category');
        } else if (
            isEmpty(assetQty)
        ) {
           setErrorMsg('Please select a quantity'); 
        } else {

            let formData = new FormData();

            formData.append('assetImage', assetImage);
            formData.append('assetName', assetName);
            formData.append('assetDsc', assetDsc);
            formData.append('assetPrice', assetPrice);
            formData.append('assetCategory', assetCategory);
            formData.append('assetQty', assetQty);

            createAsset(formData)
                .then(response => {
                    setSuccessMsg(response.data.successMessage);
                    setAssetData({
                        assetImage: null,
                        assetName:'',
                        assetDsc:'',
                        assetPrice: '',
                        assetCategory: '',
                        assetQty:'',
                    });
                })
                .catch(err => {
                    setLoading(false);
                    setErrorMsg(err.response.data.errorMessage);
                });
        }
    }

    return (
        <div onClick={handleMessages}>
            <div onClick={onOpenModal}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={onCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <form onSubmit={handleAssetSubmit} noValidate>
                    <Fade in={openModal}>
                        <Box sx={style} className='userdshbrd-modal'>
                            <div className='userdshbrd-modal-header'>
                                Add Asset
                                <button onClick={onCloseModal}><CloseIcon/></button>
                            </div>
                                <div className='userdshbrd-modal-form'>
                                    {errorMsg && errorMsgAlert(errorMsg)}
                                    {successMsg && successMsgAlert(successMsg)}

                                    {
                                        loading ? (
                                            <div style={{textAlign:'center', marginTop: '10px'}}>{showLoading()}</div>
                                        ):(
                                            <>
                                                <Paper
                                                    sx={{ 
                                                        p: '2px 4px', 
                                                        boxShadow:'none', 
                                                        alignItems: 'center', 
                                                        width:'400px' , 
                                                        maxWidth:'100%'
                                                    }}
                                                    className='name-input'
                                                >
                                                    <input
                                                        hidden
                                                        id="product-input-file-collection"
                                                        type="file"
                                                        name='assetImage'
                                                        onChange={handleAssetImage}
                                                    />
                                                        <label htmlFor="product-input-file-collection">
                                                            <h4>Add Image</h4>
                                                            <Skeleton variant="rectangular" width={140} height={65} />
                                                        </label>
                                                </Paper>
                                                <Paper
                                                    sx={{ 
                                                        p: '2px 4px', 
                                                        boxShadow:'none', 
                                                        alignItems: 'center', 
                                                        width:'400px' , 
                                                        maxWidth:'100%'
                                                    }}
                                                    className='name-input'
                                                >
                                                    <label>Name</label>
                                                    <InputBase 
                                                        fullWidth
                                                        name='assetName'
                                                        value={assetName}
                                                        onChange={handleAssetChange}
                                                    />
                                                </Paper>
                                                <Paper
                                                    sx={{  
                                                        p: '2px 4px', 
                                                        boxShadow:'none', 
                                                        alignItems: 'center', 
                                                        width:'400px' , 
                                                        maxWidth:'100%'
                                                    }}
                                                    className='name-input'
                                                >
                                                    <label>Description</label>
                                                    <textarea  
                                                        placeholder="Write something.." 
                                                        name='assetDsc'
                                                        value={assetDsc}
                                                        style={{height:"80px"}} 
                                                        onChange={handleAssetChange}
                                                    />                                                    
                                                </Paper>
                                                <Paper
                                                    sx={{  
                                                        p: '2px 4px', 
                                                        boxShadow:'none', 
                                                        margin: '12px 0', 
                                                        alignItems: 'center', 
                                                        width:'400px' , 
                                                        maxWidth:'100%'
                                                    }}
                                                    className='name-input'
                                                >
                                                    <label>Price</label>
                                                    <InputBase 
                                                        fullWidth
                                                        name='assetPrice'
                                                        value={assetPrice}
                                                        onChange={handleAssetChange}
                                                    />
                                                </Paper>
                                                <Paper
                                                    sx={{
                                                        display: 'flex',  
                                                        p: '2px 4px', 
                                                        boxShadow:'none', 
                                                        margin: '12px 0', 
                                                        alignItems: 'center', 
                                                        width:'400px' , 
                                                        maxWidth:'100%'
                                                    }}
                                                    className='name-input'
                                                >
                                                    <div style={{width: '50%', paddingRight: '5px'}}>
                                                        <label>Category</label>
                                                        <select 
                                                            style={{width: '100%'}} 
                                                            name='assetCategory'
                                                            onChange={handleAssetChange}
                                                        >
                                                            <option value=''>Choose one</option>
                                                            {categories && 
                                                                categories.map((categorys) => (
                                                                <option 
                                                                    key={categorys._id} 
                                                                    value={categorys._id}
                                                                >
                                                                    {categorys.category}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div style={{width: '50%', paddingLeft: '5px'}}>
                                                        <label>Quantity</label>
                                                        <input 
                                                            type='number' 
                                                            name='assetQty'
                                                            value={assetQty}
                                                            style={{width: '100%'}}
                                                            onChange={handleAssetChange}
                                                        />
                                                    </div>
                                                </Paper>
                                            </>
                                        )
                                    }
                                    
                                </div>
                                <div className='userdshbrd-modal-footer'>
                                    <button onClick={onCloseModal} style={{background: '#e1e1e1'}}>Close</button>
                                    <button type='submit' style={{background: 'rgb(3, 169, 244)'}}>Add</button>
                                </div>
                        </Box>
                    </Fade>
                </form>
            </Modal>
        </div>
        
        
    );
};

export default UserAssetModal;
