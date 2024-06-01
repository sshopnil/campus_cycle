import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PostDetail from './post_details';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

export default function Post({ data }) {
    const [expanded, setExpanded] = useState(Array(data?.length).fill(false));
    const [fav, setFav] = useState(Array(data?.length).fill(false));
    const [upVotes, setUpVotes] = useState(data.map(item => item.upVote));
    const [tags, setTags] = useState(Array(data?.length).fill([{id: 0, name: ""}]));

    useEffect(() => {
        data.forEach((item, index) => {
            fetchTags(item.id, index);
        });
    }, [data]);

    const fetchTags = async (postId, index) => {
        try {
            const response = await axios.get(`${LOCAL_ADDR}posts/posttags/${postId}`);
            console.log(response.data);
            setTags(prevTags => {
                const newTags = [...prevTags];
                newTags[index] = response.data;
                return newTags;
            });
        } catch (error) {
            console.error("Error fetching tags for post", postId, error);
        }
    };

    const handleExpandClick = (index) => {
        setExpanded(expanded.map((item, i) => (i === index ? !item : item)));
    };

    const handleFavClick = async (index, id) => {
        try {
            if (!fav[index]) {
                const response = await axios.patch(`${LOCAL_ADDR}posts/upvote/${id}`);
                if (response.status === 200) {
                    setFav(fav.map((item, i) => (i === index ? !item : item)));
                    setUpVotes(upVotes.map((item, i) => (i === index ? item + 1 : item)));
                }
            }
        } catch (error) {
            console.error("Error upvoting the post", error);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
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
                            subheader={"posted on: " + formatDateTime(item?.time)}
                            titleTypographyProps={{variant:'h5' }}
                            subheaderTypographyProps={{variant:'caption' }}
                        />
                        <CardContent>
                            <CardActions onClick={() => handleExpandClick(index)} sx={{ cursor: 'pointer' }}>
                                <Typography>
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
                            {tags[index]?.length > 0 && (
                                <Typography sx={{ color: "#3db5ff" }}>
                                    {tags[index].map(tag => `#${tag.name}`).join(' ')}
                                </Typography>
                            )}
                        </CardContent>
                        <CardActions disableSpacing>
                            <span style={{ marginLeft: 15, fontSize: 18 }}>{upVotes[index]}</span>
                            <IconButton aria-label="add to favorites" onClick={() => handleFavClick(index, item?.id)}>
                                {/* {fav[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
                                <KeyboardArrowUpOutlinedIcon />
                            </IconButton>
                            <IconButton
                                aria-label="show comments"
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded[index]}
                            >
                                <CommentIcon titleAccess='Comment' />
                            </IconButton>
                        </CardActions>
                        <PostDetail show={expanded[index]} setShow={() => handleExpandClick(index)} item={item} upVotes={upVotes} index={index} handleFavClick={handleFavClick} />
                    </Card>
                ))
            }
        </Stack>
    );
}
