import * as React from 'react';

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

function ColorToggleButton() {
    const [alignment, setAlignment] = React.useState('local');

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


const MyForm = () => {
    return (
        <>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Group Name
                    </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="title" />
            </SoftBox>
            <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Group Type
                    </SoftTypography>
                </SoftBox>
                <ColorToggleButton />
            </SoftBox>
        </>
    );
}

export default function CreateGroup({ open, setOpen }) {

    const [en, setEn] = React.useState(true);
    const [showImg, setShowImg] = React.useState(false);
    // const []

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
                        <header style={{ margin: "0px 10px" }}>New Group</header>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <SoftBox component="form" role="form">
                        {showImg ? <ImageUpload /> : <MyForm/>}
                    </SoftBox>
                </DialogContent>
                <DialogActions>
                    { en && <Button variant='contained' sx={{ color: "white !important" }} onClick={()=>{setShowImg(!showImg); setEn(!en)}}>Next</Button>}
                    { !en && <>
                        <Button variant='contained' sx={{ color: "white !important" }} onClick={()=>{setShowImg(!showImg); setEn(!en)}}>Back</Button>
                        <Button type='submit' variant='contained' sx={{ color: "white !important" }} onClick={setOpen}>Create Group</Button>
                        </>
                        }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}