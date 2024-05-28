import * as React from 'react';
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button, IconButton, LinearProgress } from "@mui/material";
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
import { useSoftUIController, setPosts } from "context";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ColorToggleButton({ handleInput }) {
    const [alignment, setAlignment] = React.useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (event && event.target) {
            event.target.name = "postType";
            handleInput(event);
        }
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

const MyForm = ({ handleInputChange }) => {
    return (
        <>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Content
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="Text" placeholder="Post content here..." multiline rows={4} name="content" onChange={handleInputChange} />
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Tags
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="Text" placeholder="i.e. sports, news etc.." />
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Post Type
                    </SoftTypography>
                </SoftBox>
                <ColorToggleButton handleInput={handleInputChange} />
            </SoftBox>
        </>
    );
}

export default function PostForm({ open, setOpen }) {
    const [controller, dispatch] = useSoftUIController();
    const [en, setEn] = React.useState(true);
    const [showImg, setShowImg] = React.useState(false);
    const [imgId, setImgId] = React.useState();
    const [img, setImage] = React.useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const userId = parseInt(localStorage.getItem("user"));
    const { selected_group, posts } = controller;

    const [formData, setFormData] = useState({
        content: '',
        upVote: 0,
        postType: '',
        groupId: selected_group,
        userId: userId
    });

    // Update formData.groupId whenever selected_group changes
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            groupId: selected_group
        }));
    }, [selected_group]);

    const handleInputChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(selected_group);

        try {
            const response = await axios.post(`${LOCAL_ADDR}posts/create`, formData);
            setImgId(response?.data?.id);
        } catch (error) {
            console.error('API error:', error.response);
        }
    };

    const handleFormSubmit2 = async (e) => {
        e.preventDefault();
        if (!imgId) {
            console.error('Image ID is not set.');
            return;
        }

        const formData2 = new FormData();
        formData2.append('image', img);

        try {
            const response = await axios.patch(`${LOCAL_ADDR}posts/image_upload/${imgId}`, formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            toast.success("Posted!");
            const updatedPosts = await axios.get(`${LOCAL_ADDR}posts/group/${selected_group}`);
            setPosts(dispatch, updatedPosts.data);  // Update posts in context
            setOpen(false);
            setUploadProgress(0);  // Reset the progress bar
        } catch (error) {
            console.error('API error:', error.response);
        }
    };
    const handleSubmit3 = async(e) =>{
        e.preventDefault();
        toast.success("Posted!");
        let updatedPosts = null;
        try{
            updatedPosts = await axios.get(`${LOCAL_ADDR}posts/group/${selected_group}`);

        }
        catch(e){
            console.error('API error:', error.response);

        }
        finally{
            setPosts(dispatch, updatedPosts.data);
        }
        setEn(!en); 
        setOpen(false);
        setUploadProgress(0);

    }

    return (
        <React.Fragment>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
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
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='end'
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <header style={{ margin: "0px 10px" }}>Create a post</header>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <SoftBox component="form" role="form" onSubmit={handleFormSubmit2}>
                        {showImg ? <ImageUpload setImg={setImage} /> : <MyForm handleInputChange={handleInputChange} />}
                        {uploadProgress > 0 && (
                            <SoftBox mt={2}>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                                <SoftTypography variant="caption" display="block" gutterBottom>
                                    {uploadProgress}%
                                </SoftTypography>
                            </SoftBox>
                        )}
                        <DialogActions>
                            {en && <Button variant='contained' sx={{ color: "white !important" }} onClick={(e) => { setShowImg(!showImg); setEn(!en); handleFormSubmit(e) }}>Next</Button>}
                            {!en && <>
                                <Button variant='contained' sx={{ color: "white !important" }} onClick={() => { setShowImg(!showImg); setEn(!en); setOpen(false) }}>Cancel</Button>
                                <Button type='submit' variant='contained' sx={{ color: "white !important" }} onClick={handleFormSubmit2}>Post</Button>
                                <Button type='submit' variant='contained' color="warning" onClick={handleSubmit3}>Post without Image</Button>
                            </>}
                        </DialogActions>
                    </SoftBox>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
