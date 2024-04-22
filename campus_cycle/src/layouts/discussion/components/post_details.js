import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography, Collapse, InputAdornment, Paper } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';


export default function PostDetail({ show, setShow, item }) {
    const [open, setOpen] = React.useState(show);
    //   console.log(show)

    const handleClose = () => {
        setOpen(false);
    };
    const [fav, setFav] = useState(false);


    return (
        <React.Fragment>
            <Dialog
                open={show}
                onClose={setShow}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'md'}
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
                                <Avatar sx={{ bgcolor: 'orange', fontVariant: 'small-caps' }} aria-label="user image">
                                    {item?.author.charAt(0)}
                                </Avatar>
                            }
                            title={item?.author + "'s Post"}
                            subheader={"posted on: " + item?.date}
                        />
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Card sx={{ minWidth: "100%", marginBottom: "20px" }} key={item?.id}>
                        <CardContent>
                            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                                {item?.caption}
                            </Typography>
                            {item?.description}
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={item?.post_img}
                            alt="fighting"
                        />
                        <CardContent>

                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={() => setFav(!fav)}>
                                {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <span>{item?.like_count}</span>
                            <IconButton
                                aria-label="show comments"
                            >
                                <CommentIcon />
                            </IconButton>
                            <span>{item?.comments.length}</span>
                        </CardActions>
                        <CardContent>

                            {
                                item?.comments.map((user) => {
                                    return (
                                        <>
                                            <div style={{ display: "flex", flexDirection: "row" }} key={user.author}>
                                                <Avatar sx={{ bgcolor: 'grey' }}>
                                                    {user?.img}
                                                </Avatar>
                                                <Typography ml={1} fontWeight={'bold'}>{user?.author}</Typography>
                                            </div>
                                            <Typography sx={{ paddingLeft: "45px", marginBottom: "10px", fontSize: "18px" }}>{user?.comment}</Typography>
                                        </>
                                    )
                                })
                            }
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Typography fontSize={15}>Write your own..</Typography>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:"100%"}}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Your comment goes here"
                            // inputProps={{ 'aria-label': 'write a comment' }}
                            multiline
                            rows={2}
                        />
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SendIcon />
                        </IconButton>

                    </Paper>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}