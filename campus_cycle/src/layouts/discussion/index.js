import * as React from 'react';
import { useEffect } from 'react';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DiscussionNavbar from "examples/Navbars/DiscussionNavbar";
import { Grid, Typography } from "@mui/material";
import { Button, Card, CardContent, CardHeader, Avatar } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupsIcon from '@mui/icons-material/Groups';
import Post from "./components/posts";
import { useSoftUIController, setGroup, setPosts, setTopic, setActiveTopic, setEvents} from "context";
import SoftInput from "components/SoftInput";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabNavigation from "./components/tab_navigation";
import PostForm from "./components/post_form";
import CreateGroup from './components/create_group';
import EventCard from './components/event_card';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventFormDialog from './components/eventformdialog';

function BasicCard({ groups, userGroups, type, handleJoin, handleGo }) {
    const [search, setSearch] = React.useState('');

    const isUserGroup = (groupId) => {
        return userGroups.some(group => group.id === groupId);
    };

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
                title={type === 'all' ? "All Groups" : "My Groups"}
            />
            <SoftInput
                placeholder="Search groups..."
                icon={{ component: "search", direction: "left" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <CardContent>
                {groups?.length !== 0 ? groups?.map((item) => (
                    item?.name.toLowerCase().includes(search.toLowerCase()) && (
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: item.color, fontVariant: 'small-caps' }} aria-label="Group logo" src={item.imageurl} />
                            }
                            key={item.id}
                            title={item.name}
                            action={
                                <Button
                                    variant="filled"
                                    startIcon={type === 'all' ? <AddBoxIcon /> : <PlayArrowIcon />}
                                    color="primary"
                                    sx={{ alignContent: "center" }}
                                    onClick={() => {
                                        if (type === 'all') {
                                            handleJoin(item.id);
                                        } else {
                                            handleGo(item.id);
                                        }
                                    }}
                                    disabled={type === 'all' && isUserGroup(item.id)} // Disable if already joined
                                >
                                    {type === 'all' ? "Join" : "Go"}
                                </Button>
                            }
                        />
                    )
                )) :
                    <Typography>
                        Not Available
                    </Typography>
                }
            </CardContent>
        </Card>
    );
}


const PostContents = ({filteredGroup, userGroup, setGroupData, handleJoin, handleGo, postData }) => {
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
                {postData && postData.length > 0 ? (
                    <Post data={postData}/>
                ) : (
                    <Typography>No posts available</Typography>
                )}
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
                <BasicCard groups={filteredGroup} userGroups={userGroup} type='all' handleJoin={handleJoin} handleGo={handleGo} />
                <BasicCard groups={userGroup} userGroups={userGroup} type='user' handleJoin={handleJoin} handleGo={handleGo} />
                {/* <BasicCard groups={userGroup} type='user' handleGo={handleGo} handleJoin={handleJoin} /> */}
            </Grid>
            <PostForm open={open} setOpen={handleOpen}/>
            <CreateGroup open={openG} setOpen={handleOpenG} updateGroup={setGroupData} groups={filteredGroup} />
        </>
    );
}

const EventContents = ({events}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
// console.log(events);
    return (
        <>
            <Grid item sm={12} xl={8}>
                <EventCard events={events}/>
            </Grid>
            <Grid item xl={4} mt={1} sx={{
                flexDirection: "column"
            }}>
                <Button fullWidth variant='contained' color='info' sx={{ marginBottom: '10px' }} onClick={handleOpen}>Organize a new event</Button>
            </Grid>
            <EventFormDialog open = {open} onClose = {handleOpen}/>
        </>
    );
}

const Discussion = () => {
    const [controller, dispatch] = useSoftUIController();
    const [groups, setGroupData] = React.useState([]);
    const [userGrps, setUserGrps] = React.useState([]);
    const userId = parseInt(localStorage.getItem("user"));
    const [showGroupPost, setGroupPost] = React.useState([]);
    const { topic, posts, active_topic, events} = controller;

    const handleJoin = async (id) => {
        const body = {
            userId: userId,
            groupId: id
        }
        try {
            const response = await axios.post(`${LOCAL_ADDR}users/groups/join`, body);
            toast.success('Joined Group');
        }
        catch (error) {
            console.error('API error:', error.response);
        }
    }

    const fetchPostsByGroupId = async (groupId) => {
        try {
            const response = await axios.get(`${LOCAL_ADDR}posts/group/${groupId}`);
            setPosts(dispatch, response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleGo = (id) => {
        setGroup(dispatch, id);
        setGroupPost(userGrps?.find(item => id === item.id));
        fetchPostsByGroupId(id);
    }

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}groups`);
                setGroupData(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const fetchUserGroups = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}users/groups/${userId}`);
                setUserGrps(response.data);
                if (response.data.length > 0) {
                    const initialGroupId = response.data[0].id;
                    setGroup(dispatch, initialGroupId);
                    setGroupPost(response.data[0]);
                    fetchPostsByGroupId(initialGroupId);
                }
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        };

        const fetchTopics = async () =>{
            try {
                const response = await axios.get(`${LOCAL_ADDR}posttags`);
                setTopic(dispatch, response.data);
                // setActiveTopic(dispatch, response.data[0]);
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        }

        const fetchEvents = async () =>{
            try {
                const response = await axios.get(`${LOCAL_ADDR}events`);
                setEvents(dispatch, response.data);
                // setActiveTopic(dispatch, response.data[0]);
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        }

        fetchGroups();
        fetchUserGroups();
        fetchTopics();
        fetchEvents();
    }, [userId, active_topic]);

    // const filtered_all_group = groups?.filter(item => !userGrps.some(userItem => userItem.name === item.name));
    // const filtered_posts = 

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <DiscussionNavbar topics={topic} />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: "400px" }}
            />

            <TabNavigation
                content1={<PostContents
                    filteredGroup={groups}
                    userGroup={userGrps}
                    setGroupData={setUserGrps}
                    handleJoin={handleJoin}
                    handleGo={handleGo}
                    postData={posts}
                />}
                content1_name={showGroupPost?.name}
                content2={<EventContents events={events}/>}
            />
        </DashboardLayout>
    );
}

export default Discussion;
