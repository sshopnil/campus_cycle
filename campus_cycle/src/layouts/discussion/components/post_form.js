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



import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ColorToggleButton({ handleInput }) {
    const [alignment, setAlignment] = React.useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        event.target.name = "postType";
        handleInput(event);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            name="postType"
        >
            <ToggleButton value="local">Local</ToggleButton>
            <ToggleButton value="global">Global</ToggleButton>
        </ToggleButtonGroup>
    );
}

const MyForm = ({selectedGroup, userId, handleInputChange}) => {

    return (
        <>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Content
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="Text" placeholder="Post content here..." multiline rows={4} name="content" onChange={handleInputChange}/>
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Tags
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="Text" placeholder="i.e. sports, news etc.."/>
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Post Type
                    </SoftTypography>
                </SoftBox>
                <ColorToggleButton handleInput={handleInputChange}/>
            </SoftBox>
        </>
    );
}

// <SoftBox mb={2}>
//                 <SoftBox mb={1} ml={0.5}>
//                     <SoftTypography component="label" variant="caption" fontWeight="bold">
//                         Post title
//                     </SoftTypography>
//                 </SoftBox>
//                 <SoftInput type="text" placeholder="title" />
//             </SoftBox>

export default function PostForm({ open, setOpen, selectedGroup}) {
    // console.log(selectedGroup);
    const grpId = selectedGroup;
    const [en, setEn] = React.useState(true);
    const [showImg, setShowImg] = React.useState(false);
    const [imgId, setImgId] = React.useState();
    const [img, setImage] = React.useState();
    const userId = parseInt(localStorage.getItem("user"));


    const [formData, setFormData] = useState({
        content: '',
        upVote: 0,
        postType: '',
        groupId: grpId,
        userId: userId
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`${LOCAL_ADDR}posts/create`, formData);
            setImgId(response?.data?.id);

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
            const response = await axios.patch(`${LOCAL_ADDR}posts/image_upload/${imgId}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Important for file uploads
                },
              });
            toast.success("Posted!")
            location.reload();
        }
        catch (error) {
            console.error('API error:', error.response);
        }
    };

    // console.log(open)
    return (
        <React.Fragment>
        <ToastContainer
                position="top-center"
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
                        <header style={{ margin: "0px 10px" }}>Create a post</header>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                <SoftBox component="form" role="form" onSubmit={handleFormSubmit2}>
                {showImg ? <ImageUpload setImg={setImage}/> : <MyForm handleInputChange={handleInputChange} />}
                <DialogActions>
            {en && <Button variant='contained' sx={{ color: "white !important" }} onClick={(e) => { setShowImg(!showImg); setEn(!en); handleFormSubmit(e) }}>Next</Button>}
            {!en && <>
                <Button variant='contained' sx={{ color: "white !important" }} onClick={() => { setShowImg(!showImg); setEn(!en); setOpen(false) }}>Cancel</Button>
                <Button type='submit' variant='contained' sx={{ color: "white !important" }} onClick={(e)=>{handleFormSubmit2(e); setOpen(false);}}>Post</Button>
            </>
            }
        </DialogActions>
            </SoftBox>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}