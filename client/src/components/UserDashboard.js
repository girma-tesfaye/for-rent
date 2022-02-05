import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import GroupIcon from '@mui/icons-material/Group';

import UserAssetModal from './UserAssetModal';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserDahboard = ({handleOpen}) => {

    /* const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true); */

    return (
        <div style={{ background: 'azure'}} className='user-dashboard-container' >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ 
                    justifyContent: 'center', 
                    margin: '0 auto', 
                    padding: '20px' 
                }}
            >
                <Item
                    sx={{ 
                        maxWidth: '250px', 
                        width: '100%', 
                        background: 'rgb(3, 169, 244)', 
                        alignSelf: 'center', 
                        padding: '0px' 
                    }}
                >
                    <div>
                        <UserAssetModal>
                            <button 
                                className='btn-1' 
                                onClick={handleOpen}
                            >
                                <AddIcon />
                                Add Asset
                            </button>
                        </UserAssetModal>
                    </div>
                </Item>
                <Item
                    sx={{ 
                        maxWidth: '250px', 
                        width: '100%', 
                        background: 'rgb(46, 125, 50)', 
                        alignSelf: 'center', 
                        padding: '0px' 
                    }}
                >
                    <div>                   
                        <button className='btn-1'>
                            <ViewCozyIcon />
                            Add Asset
                        </button>
                    </div>
                </Item>
                <Item
                    sx={{ maxWidth: '250px', width: '100%', background: '#1976d2', alignSelf: 'center', padding: '0px' }}
                >
                    <button className='btn-1'> 
                        <GroupIcon />
                        View Profile
                    </button>
                </Item>
            </Stack>
        </div>
    )
}

export default UserDahboard;
