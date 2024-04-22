import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,IconButton} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import ImageUpload from './image_upload';



import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ColorToggleButton() {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="local">Local</ToggleButton>
            <ToggleButton value="global">Global</ToggleButton>
        </ToggleButtonGroup>
    );
}

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
                            <SoftInput type="text" placeholder="title" />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Description
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput type="Text" placeholder="Post content here..." multiline rows={4} />
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
                            <ColorToggleButton />
                        </SoftBox>
                        <ImageUpload />
                    </SoftBox>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' sx={{ color: "white !important" }} onClick={setOpen}>Post</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}