import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DiscussionNavbar from "examples/Navbars/DiscussionNavbar";
import { Grid } from "@mui/material";
import { Button, Card, CardContent,CardHeader, Avatar} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import groups from 'layouts/discussion/data/groupData'
import GroupsIcon from '@mui/icons-material/Groups';
import Post from "./components/posts";
import postData from "./data/postData";
import { useState } from "react";
import { useSoftUIController } from "context";

function BasicCard() {
    return (
        <Card sx={{ minWidth: "300px"}}>
            <CardHeader
                sx={{
                    alignSelf:"center",
                    textTransform: 'uppercase',
                    fontWeight:"bold"
                }}
                avatar={
                    <GroupsIcon fontSize="200px"/>
                }
                title="Groups"
            />
            <hr style={{width: '80%', alignSelf: 'center', color:"#666C8F", border: '1px solid'}}/>
            <CardContent>

                {groups.map((item) => {
                    return <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: item.color, fontVariant:'small-caps'}} aria-label="Group logo">
                                {item.name.charAt(0)}
                            </Avatar>
                        }
                        // action={()=>#}
                        key={item.name}
                        title={item.name}
                        action={
                            <Button variant="filled" startIcon={<AddBoxIcon />} color="primary" sx={{ alignContent: "center"}}>
                                Join
                            </Button>
                        }
                    />
                })}
            </CardContent>
        </Card>
    );
}
const Discussion = () => {
    // console.log(postData);
    const [controller, dispatch] = useSoftUIController();
    const { topic} = controller;
    
    // const [topic, setTopic] = useState('');
    const topicdata = [{ "name": "Sports" }, { "name": "Arts & Crafts" }, { "name": "Pets & Animal" }];

    // console.log(topic);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <DiscussionNavbar topics={topicdata}/>
            <header style={{marginTop: '70px', color: 'black', fontSize:'20px'}}>{topic}</header>
            <Grid container spacing={3}>
                <Grid item sm={12} xl={8}>
                    <Post data = {postData} topic = {topic}/>
                </Grid>
                <Grid item xl={4} mt={1}>
                    <BasicCard />
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Discussion;