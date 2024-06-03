// src/components/EventFormDialog.js
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import SoftInput from 'components/SoftInput';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ImageUpload from './image_upload';
import { useSoftUIController, setEvents} from "context";


const EventFormDialog = ({ open, onClose }) => {
    const userId = parseInt(localStorage.getItem("user"));
    const [imgId, setImgId] = React.useState();
    const [img, setImage] = React.useState();
    const [controller, dispatch] = useSoftUIController();
    const { selected_group, topic } = controller;


    
    const [formData, setFormData] = useState({
        eventName: '',
        startTime: '',
        endTime: '',
        details: '',
        organizerId: userId,
        universityId: "1"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        console.log(formData);
        try {
            const response = await axios.post(`${LOCAL_ADDR}events/create-event/${userId}`, formData);
            
            const formData2 = new FormData();
            formData2.append('image', img);

            const response2 = await axios.patch(`${LOCAL_ADDR}events/image_upload/${response.data.id}`, formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });


            const updatedEvents = await axios.get(`${LOCAL_ADDR}events`);
            setEvents(dispatch, updatedEvents.data);
            toast.success('Event created successfully');
            onClose();
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Failed to create event');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Organize an Event</DialogTitle>
            <DialogContent>
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Event Name
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        margin="dense"
                        name="eventName"
                        label="Event Name"
                        type="text"
                        fullWidth
                        value={formData.eventName}
                        onChange={handleChange}
                    />
                </SoftBox>


                <SoftBox mb={2}>
                    <ImageUpload setImg={setImage} />
                </SoftBox>


                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Select Start Time
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        name="startTime"
                        label="Start Time"
                        type="date"
                        fullWidth
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                </SoftBox>


                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Select End Time
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        name="endTime"
                        label="End Time"
                        type="date"
                        fullWidth
                        value={formData.endTime}
                        onChange={handleChange}
                    />
                </SoftBox>


                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Details
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        margin="dense"
                        name="details"
                        label="Details"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.details}
                        onChange={handleChange}
                    />
                </SoftBox>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventFormDialog;
