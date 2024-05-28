import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography, Collapse, InputAdornment } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import PostDetail from './post_details';

export default function Post({ data, topic }) {
    // Initialize states for each post item
    const [expanded, setExpanded] = useState(Array(data?.length).fill(false));
    const [readmore, setReadMore] = useState(Array(data?.length).fill(false));
    const [fav, setFav] = useState(Array(data?.length).fill(false));

    const handleReadClick = (index) => {
        setReadMore(readmore.map((item, i) => (i === index ? !item : item)));
    }

    const handleExpandClick = (index) => {
        setExpanded(expanded.map((item, i) => (i === index ? !item : item)));
    };

    const handleFavClick = (index) => {
        setFav(fav.map((item, i) => (i === index ? !item : item)));
    };

    return (
        <Stack direction="column" mt={1}>
            {
                data?.map((item, index) => (
                    <Card sx={{ minWidth: "100%", marginBottom: "20px" }} key={item?.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'orange', fontVariant: 'small-caps' }} aria-label="user image" src={item?.user.imageUrl} />
                            }
                            title={item?.user.name}
                            subheader={"posted on: " + item?.time}
                        />
                        <CardContent>
                            <CardActions>
                                <Typography display={readmore[index] ? "none" : "inline"}>
                                    {item?.content}
                                </Typography>
                            </CardActions>
                        </CardContent>
                        {item?.imageurl && <CardMedia
                            component="img"
                            height="auto"
                            image={item?.imageurl}
                            alt="fighting"
                            onClick={() => handleExpandClick(index)}
                            sx={{
                                cursor: "pointer"
                            }}
                        />}
                        <CardContent>

                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" onClick={() => handleFavClick(index)}>
                                {fav[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <span>{item?.upVote}</span>
                            <IconButton
                                aria-label="show comments"
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded[index]}
                            >
                                <CommentIcon />
                            </IconButton>
                        </CardActions>
                        <PostDetail show={expanded[index]} setShow={() => handleExpandClick(index)} item={item} />
                    </Card>
                ))
            }
        </Stack>
    );
}
