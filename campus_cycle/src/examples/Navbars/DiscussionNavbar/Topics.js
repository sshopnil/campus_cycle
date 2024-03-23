import { Button, createStyles } from "@mui/material";
import { Link } from "react-router-dom";
import { useSoftUIController, setTopic} from "context";

import { useEffect } from "react";

const Topics = ({topics}) => {
    // console.log(topic);
    const [controller, dispatch] = useSoftUIController();
    const { topic} = controller;

    return (
        <>
            {topics?.map((item) => {
                // console.log(item.name)
                return (
                    <Link key={item.name} >
                        <Button 
                            key={item.name}
                            sx={item.name == topic ? styles.active: styles.deactive}
                            onClick={()=>setTopic(dispatch, item.name)}
                        >
                            {item.name}
                        </Button>
                    </Link>
                );
            })}
        </>
    );
}

const styles = createStyles({
    active:{
        backgroundColor: '#17C1E8',
        color: '#fff',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#fff',
            borderColor: '#17C1E8',
            border: '1px solid',
            color: '#17C1E8'
        },
        margin: '0 5px',
        borderRadius: '20px',
        fontWeight: '400'
    },
    deactive:{
        backgroundColor: '#fff',
        color: '#17C1E8',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#17C1E8',
            borderColor: '#fff',
            border: '1px solid',
            color: '#fff'
        },
        margin: '0 5px',
        borderRadius: '20px',
        fontWeight: '400'
    }
})

export default Topics;