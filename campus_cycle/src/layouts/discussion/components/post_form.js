import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography, Collapse, InputAdornment, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';


import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import ImageUpload from './image_upload';

export default function PostForm({ open, setOpen }) {

    // console.log(open)
    return (
        <React.Fragment>
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
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Post title
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput type="text" placeholder="title"/>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Content
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput type="Text" placeholder="Post content here..." multiline rows={4}/>
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Tags
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput type="Text" placeholder="i.e. sports, news etc.."/>
                        </SoftBox>
                        <ImageUpload/>
                    </SoftBox>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' sx={{color:"white !important"}} onClick={setOpen}>Post</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}