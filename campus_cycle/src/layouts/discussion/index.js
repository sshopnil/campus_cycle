import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DiscussionNavbar from "examples/Navbars/DiscussionNavbar";
import { Grid, Link, Typography } from "@mui/material";
import { Button, Card, CardContent,CardHeader, Avatar} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import groups from 'layouts/discussion/data/groupData'
import GroupsIcon from '@mui/icons-material/Groups';
import Post from "./components/posts";
import postData from "./data/postData";
import { useSoftUIController } from "context";
import SoftInput from "components/SoftInput";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function BasicCard({groups, type}) {
    return (
        <Card sx={{ minWidth: "300px", padding:"20px", marginBottom:"20px"}}>
            <CardHeader
                sx={{
                    alignSelf:"center",
                    textTransform: 'uppercase',
                    fontWeight:"bold"
                }}
                avatar={
                    <GroupsIcon fontSize="200px"/>
                }
                title={type == 'all' ? "All Groups": "My Groups"}
            />
            <SoftInput
                placeholder="Search groups..."
                icon={{ component: "search", direction: "left" }}
              />
            {/* <hr style={{width: '80%', alignSelf: 'center', color:"#666C8F", border: '1px solid'}}/> */}
            <CardContent>

                {groups.length !== 0 ? groups.map((item) => {
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
                            <Button variant="filled" startIcon={type == 'all' ? <AddBoxIcon /> : <PlayArrowIcon/>} color="primary" sx={{ alignContent: "center"}}>
                                {type == 'all' ? "Join" : "Go"}
                            </Button>
                        }
                    />
                }):
                <Typography>
                    Not Available
                </Typography>
                }
            </CardContent>
        </Card>
    );
};

const Discussion = () => {
    // console.log(postData);
    const [controller, dispatch] = useSoftUIController();
    const { topic} = controller;
    
    // const [topic, setTopic] = useState('');
    const topicdata = [{ "name": "Sports" }, { "name": "Arts & Crafts" }, { "name": "Pets & Animal" }];
    const userGroup = [{"name": "Gamers Of UIU", "color": "#666C8F"}];

    const filtered_all_group = groups.filter(item => !userGroup.some(userItem => userItem.name === item.name));
    // data = data.filter((item)=> !dynamicCretarias.some(t => item.includes(t)))
    console.log(filtered_all_group);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <DiscussionNavbar topics={topicdata}/>
            {/* <header style={{marginBottom: '5px', color: 'black', fontSize:'40px'}}>{userGroup[0].name}</header> */}
            <Typography mt={10} sx={{fontWeight:"bold", fontSize:"34px"}}>{userGroup[0].name}</Typography>
            <header style={{marginTop: '5px', color: 'black', fontSize:'14px', color:"#17C1E8"}}><Link>{"#" + topic}</Link></header>
            <Grid container spacing={3}>
                <Grid item sm={12} xl={8}>
                    <Post data = {postData} topic = {topic}/>
                </Grid>
                <Grid item xl={4} mt={1} sx={{flexDirection:"column"}}>
                    <BasicCard groups={filtered_all_group} type='all'/>
                    <BasicCard groups={userGroup} type='user'/>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Discussion;