import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography, Paper } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

export default function PostDetail({ show, setShow, item, upVotes, index, handleFavClick }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [fav, setFav] = useState(false);
    const userID = parseInt(localStorage.getItem("user"));

    useEffect(() => {
        if (show) {
            fetchComments();
        }
    }, [show]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${LOCAL_ADDR}comments/posts/${item.id}`);
            const sortedComments = response.data.sort((a, b) => b.upvotes - a.upvotes);
            setComments(sortedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    const handlePostComment = async () => {
        try {
            const response = await axios.post(`${LOCAL_ADDR}comments/create`, {
                postId: item.id,
                userId: userID,
                content: commentText
            });
            setCommentText('');
            // Append the new comment to the existing comments
            const newComment = {
                user: {
                    name: response.data.user.name
                },
                content: response.data.content,
                time: response.data.time,
                upvotes: 0 // Assuming the new comment starts with 0 upvotes
            };
            setComments(prevComments => [
                ...prevComments,
                newComment
            ]);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };


    const handleUpvoteComment = async (commentId) => {
        try {
            await axios.patch(`${LOCAL_ADDR}comments/upvote/${commentId}`);
            // Update the comments list to reflect the upvote
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId ? { ...comment, upVote: comment.upVote + 1 } : comment
                )
            );
        } catch (error) {
            console.error('Error upvoting comment:', error);
        }
    };


    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <React.Fragment>
            <Dialog
                open={show}
                onClose={setShow}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'md'}
                sx={{ '.MuiDialog-paper': { maxWidth: '700px' } }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='end'
                            color="inherit"
                            onClick={setShow}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'orange', fontVariant: 'small-caps' }} aria-label="user image" src={item.user.imageUrl}/>
                            }
                            title={item?.user.name + "'s Post"}
                            subheader={"posted on: " + formatDateTime(item?.time)}
                        />
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Card sx={{ minWidth: "100%", marginBottom: "20px" }} key={item?.id}>
                        <CardContent>
                            {item?.content}
                        </CardContent>
                        {item?.imageurl && <CardMedia
                            component="img"
                            height="auto"
                            image={item?.imageurl}
                            alt="fighting"
                        />}
                        
                        <CardActions disableSpacing>
                            <span style={{ marginLeft: 15, fontSize: 18 }}>{upVotes[index]}</span>
                            <IconButton aria-label="add to favorites" onClick={() => handleFavClick(index, item?.id)}>
                                {/* {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
                                <KeyboardArrowUpOutlinedIcon />
                            </IconButton>
                            <IconButton
                                aria-label="show comments"
                            >
                                <CommentIcon titleAccess='Comment' />
                            </IconButton>
                        </CardActions>
                        <CardContent style={{backgroundColor: "#e6e8e6"}}>
                            <Typography variant="h6" style={{fontSize: 14}}>Comments</Typography>
                            {comments.length > 0 ? comments.map((comment, index) => (
                                <div key={index} style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                                    <Avatar sx={{ bgcolor: 'grey' }}>
                                        {comment.user.name[0]}
                                    </Avatar>
                                    <div style={{ marginLeft: '10px' }}>
                                        <Typography fontWeight={'bold'}>{comment.user.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" style={{fontSize: 10}}>
                                            {formatDateTime(comment.time)}
                                        </Typography>
                                        <Typography sx={{fontSize: 14}}>{comment.content}</Typography>
                                        <IconButton aria-label="upvote comment" style={{fontSize: 14}} onClick={() => handleUpvoteComment(comment.id)}>
                                        <Typography style={{fontSize: 14}}>{comment.upVote}</Typography>
                                            <KeyboardArrowUpOutlinedIcon />
                                            <Typography style={{fontSize: 14}}>vote</Typography>
                                        </IconButton>
                                    </div>
                                </div>
                            )) : <Typography>No comments yet.</Typography>}
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Typography fontSize={15}>Write your own..</Typography>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePostComment();
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Your comment goes here"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            multiline
                            rows={2}
                        />
                        <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handlePostComment}>
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
