import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button, IconButton } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import ImageUpload from './image_upload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import axios from 'axios';

function ColorToggleButton({ handleInput }) {
    const [alignment, setAlignment] = React.useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        event.target.name = "groupType";
        handleInput(event);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            name="groupType"
        >
            <ToggleButton name="" value="local">Local</ToggleButton>
            <ToggleButton value="global">Global</ToggleButton>
        </ToggleButtonGroup>
    );
}


const MyForm = ({ handleInputChange }) => {
    return (
        <>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Group Name
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="title" name="name" onChange={handleInputChange} />
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Group Type
                    </SoftTypography>
                </SoftBox>
                <ColorToggleButton handleInput={handleInputChange} />
            </SoftBox>
        </>
    );
}

export default function CreateGroup({ open, setOpen, updateGroup, groups}) {

    const [en, setEn] = React.useState(true);
    const [showImg, setShowImg] = React.useState(false);
    const [imgId, setImgId] = React.useState();
    const [img, setImage] = React.useState();
    const [formImg, setFormImg] = React.useState({
        image: null
    });

    const [formData, setFormData] = useState({
        name: '',
        groupType: ''
    });
    // const []

    // console.log(open)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // fetchData();
        // console.log(formData);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.post(`${LOCAL_ADDR}groups/create`, formData);
            setImgId(response?.data?.id);
            updateGroup([...groups, formData]);

        }
        catch (error) {
            console.error('API error:', error.response);
        }
    };
    const handleFormSubmit2 = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', img);

        // console.log(formData);

        try {
            const response = await axios.patch(`${LOCAL_ADDR}groups/image_upload/${imgId}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Important for file uploads
                },
              });
            toast.success('Successfully Created!');
            // location.reload();
        }
        catch (error) {
            console.error('API error:', error.response);
        }
    };
    return (
        <React.Fragment>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: "400px" }}
            />
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",  // Set your width here
                        },
                    },
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='end'
                            color="inherit"
                            onClick={setOpen}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <header style={{ margin: "0px 10px" }}>New Group</header>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <SoftBox component="form" role="form" onSubmit={handleFormSubmit2}>
                        {showImg ? <ImageUpload setImg={setImage}/> : <MyForm handleInputChange={handleInputChange} />}
                        <DialogActions>
                    {en && <Button variant='contained' sx={{ color: "white !important" }} onClick={(e) => { setShowImg(!showImg); setEn(!en); handleFormSubmit(e) }}>Next</Button>}
                    {!en && <>
                        <Button variant='contained' sx={{ color: "white !important" }} onClick={() => { setShowImg(!showImg); setEn(!en); setOpen(false) }}>Cancel</Button>
                        <Button type='submit' variant='contained' sx={{ color: "white !important" }} onClick={(e)=>{handleFormSubmit2(e); setOpen(false);}}>Create Group</Button>
                    </>
                    }
                </DialogActions>
                    </SoftBox>
                </DialogContent>
                
            </Dialog>
        </React.Fragment>
    );
}