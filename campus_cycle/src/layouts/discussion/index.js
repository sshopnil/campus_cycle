import * as React from 'react';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DiscussionNavbar from "examples/Navbars/DiscussionNavbar";
import { Grid, Link, Typography } from "@mui/material";
import { Button, Card, CardContent, CardHeader, Avatar } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import groups from 'layouts/discussion/data/groupData'
import GroupsIcon from '@mui/icons-material/Groups';


import Post from "./components/posts";
import postData from "./data/postData";
import { useSoftUIController } from "context";
import SoftInput from "components/SoftInput";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabNavigation from "./components/tab_navigation";
import PostForm from "./components/post_form";
import CreateGroup from './components/create_group';
import Events from './components/events';
import eventData from './data/eventData';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import SvgIcon from '@mui/joy/SvgIcon';

function BasicCard({ groups, type }) {
    const [search, setSearch] = React.useState('');
    // console.log(otherG)
    return (
        <Card sx={{ minWidth: "300px", padding: "20px", marginBottom: "20px" }}>
            <CardHeader
                sx={{
                    alignSelf: "center",
                    textTransform: 'uppercase',
                    fontWeight: "bold"
                }}
                avatar={
                    <GroupsIcon fontSize="200px" />
                }
                title={type == 'all' ? "All Groups" : "My Groups"}
            />
            <SoftInput
                placeholder="Search groups..."
                icon={{ component: "search", direction: "left" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* <hr style={{width: '80%', alignSelf: 'center', color:"#666C8F", border: '1px solid'}}/> */}
            <CardContent>

                {groups.length !== 0 ? groups.map((item) => {
                    return item?.name.toLowerCase().includes(search.toLowerCase()) && <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: item.color, fontVariant: 'small-caps' }} aria-label="Group logo">
                                {item.name.charAt(0)}
                            </Avatar>
                        }
                        // action={()=>#}
                        key={item.name}
                        title={item.name}
                        action={
                            <Button variant="filled" startIcon={type == 'all' ? <AddBoxIcon /> : <PlayArrowIcon />} color="primary" sx={{ alignContent: "center" }}>
                                {type == 'all' ? "Join" : "Go"}
                            </Button>
                        }
                    />
                }) :
                    <Typography>
                        Not Available
                    </Typography>
                }
            </CardContent>
        </Card>
    );
};

const PostContents = ({ topic, filteredGroup, userGroup }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
    const [openG, setOpenG] = React.useState(false);
    const handleOpenG = () => {
        setOpenG(!openG);
    }
    return (
        <>
            <Grid item sm={12} xl={8}>
                <Post data={postData} topic={topic} />
            </Grid>
            <Grid item xl={4} mt={1} sx={{
                flexDirection: "column",
            }}>
                <Button fullWidth variant='contained' color='info' sx={{ marginBottom: '10px' }} onClick={handleOpen}>New post</Button>
                <Button
                    fullWidth
                    variant='contained'
                    color='inherit'
                    sx={{
                        marginBottom: '10px',
                        backgroundColor: '#17C1E8',
                        color: 'whitesmoke',
                        '&:hover': {
                            backgroundColor: '#17C1E8',
                            color: 'whitesmoke',
                        }
                    }}
                    onClick={handleOpenG}
                >Create new group</Button>
                <BasicCard groups={filteredGroup} type='all' />
                <BasicCard groups={userGroup} type='user' />
            </Grid>
            <PostForm open={open} setOpen={handleOpen} />
            <CreateGroup open={openG} setOpen={handleOpenG} />
        </>
    );
}

const EventContents = ({ topic }) => {
    return (
        <>
            <Grid item sm={12} xl={8}>
            <Events/>
            </Grid>
            <Grid item xl={4} mt={1} sx={{
                flexDirection: "column",
            }}>
                
            </Grid>
        </>
    );
}
const Discussion = () => {
    // console.log(postData);
    const [controller, dispatch] = useSoftUIController();
    const { topic } = controller;

    // const [topic, setTopic] = useState('');
    const topicdata = [{ "name": "Sports" }, { "name": "Arts & Crafts" }, { "name": "Pets & Animal" }];
    const userGroup = [{ "name": "Gamers Of UIU", "color": "#666C8F" }];

    const filtered_all_group = groups.filter(item => !userGroup.some(userItem => userItem.name === item.name));
    // data = data.filter((item)=> !dynamicCretarias.some(t => item.includes(t)))
    // console.log(filtered_all_group);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <DiscussionNavbar topics={topicdata} />
            <header style={{ marginBottom: '5px', color: 'black', fontSize: '40px' }}>{userGroup[0].name}</header>

            <TabNavigation
                content1={<PostContents topic={topic} filteredGroup={filtered_all_group} userGroup={userGroup} />}
                content1_name={userGroup[0].name}
                content1_topic={topic}
                content2={<EventContents topic={topic}/>}
            />
        </DashboardLayout>
        // <PostContents topic={topic} filteredGroup={filtered_all_group} userGroup={userGroup} />

    );
}

export default Discussion;