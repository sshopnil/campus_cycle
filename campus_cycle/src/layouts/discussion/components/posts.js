import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardHeader, Avatar, CardActions, CardMedia, IconButton, Typography, Collapse, InputAdornment} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import PostDetail from './post_details';

export default function Post({ data, topic}) {

    // console.log(data[0]);
    const filtData = data?.filter((item)=> item?.topic == topic)
    return (
        <Stack direction="column" mt={1}>
            {
                filtData?.map((item) => {
                    const [expanded, setExpanded] = useState(false);
                    const [readmore, setReadMore] = useState(false);
                    // const [show, setShow] = useState(false);
                    const [fav, setFav] = useState(false);

                    const handleReadClick = () => {
                        setReadMore(!readmore);
                    }
                    const handleExpandClick = () => {
                        setExpanded(!expanded);
                    };

                    return (
                        <Card sx={{ minWidth: "100%", marginBottom: "20px" }} key={item?.id}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: 'orange', fontVariant: 'small-caps' }} aria-label="user image">
                                        {item?.author.charAt(0)}
                                    </Avatar>
                                }
                                title={item?.author}
                                subheader={"posted on: " + item?.date}
                            />
                            <CardContent>
                                <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                                    {item?.caption}
                                </Typography>

                                <CardActions>
                                    <Typography display={readmore ? "none" : "inline"}>
                                        {item?.description.substring(0, 100)}
                                        <button style={{ border: "none", background: "transparent", color: "#17C1E8", cursor:"pointer"}} onClick={handleExpandClick}>{!readmore && "Read More"}</button>
                                    </Typography>
                                </CardActions>
                                {/* <Collapse in={readmore} timeout={'auto'} unmountOnExit>
                                    {item?.description}

                                </Collapse>
                                <CardActions>
                                    <button style={{ border: "none", background: "transparent", color: "#17C1E8" }} onClick={handleReadClick}>{readmore && "....shrink"}</button>
                                </CardActions> */}
                            </CardContent>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={item?.post_img}
                                alt="fighting"
                                onClick={handleExpandClick}
                                sx={{
                                    cursor:"pointer"
                                }}
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
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                >
                                    <CommentIcon />
                                </IconButton>
                                <span>{item?.comments.length}</span>
                            </CardActions>
                            <PostDetail show={expanded} setShow={handleExpandClick} item={item}/>
                        </Card>
                    )
                })
            }
        </Stack>
    );
}