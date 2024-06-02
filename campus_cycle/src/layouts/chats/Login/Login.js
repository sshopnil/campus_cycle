// src/Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import { FormatAlignJustify, Margin } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [defusername, setDefUsername] = useState('');

    const navigate = useNavigate();
    const userID = parseInt(localStorage.getItem("user"));

    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const res = await axios.get(`${LOCAL_ADDR}users/${userID}`);
                // console.log(res);
                setDefUsername(res.data.name);
                setUsername(res.data.name);
            }catch(e){
                console.log(e);
            }
        }
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5001/login', { username });
        const { user_id, username: returnedUsername } = response.data;
        setUser({ user_id, username: returnedUsername });
    };

    return (
        <SoftBox 
        style={{
            width: "500px",
            margin: "auto",
            textAlign: "center"
        }}
        >
            <form onSubmit={handleSubmit}>
                <SoftBox>
                    <SoftButton sx={{width: "500px"}} onClick={(e)=>{setUsername(defusername); handleSubmit(e);}}>Join with {defusername}</SoftButton>
                </SoftBox>
                <Typography sx={{marginTop: 15, marginBottom: 15}}>OR</Typography>
                <SoftBox>
                <SoftInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
                <SoftButton type="submit" style={{marginTop:"20px"}}>Join (anonymous)</SoftButton>
                </SoftBox>
            </form>
        </SoftBox>
    );
}

export default Login;
