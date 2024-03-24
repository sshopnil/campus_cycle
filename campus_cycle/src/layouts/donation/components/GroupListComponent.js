import React from 'react';
import { Grid, CardHeader, Avatar, Button, CardContent } from "@mui/material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AddBoxIcon from '@mui/icons-material/AddBox';

function GroupListComponent() {
  const groups = [
    { name: "Group 1", color: "#ff0000" },
    { name: "Group 2", color: "#00ff00" },
    { name: "Group 3", color: "#0000ff" }
  ];

  return (
    <Grid item xs={3}>
      <CardHeader
        sx={{
          alignSelf: "center",
          textTransform: 'uppercase',
          fontWeight: "bold"
        }}
        avatar={
          <RecordVoiceOverIcon fontSize="200px" />
        }
        title="Top Donors"
      />
      <hr style={{ width: '80%', alignSelf: 'center', color: "#666C8F", border: '1px solid' }} />
      <CardContent style={{ height: '800px', overflowY: 'auto' }}>
        {groups.map((item) => (
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: item.color, fontVariant: 'small-caps' }} aria-label="Group logo">
                {item.name.charAt(0)}
              </Avatar>
            }
            key={item.name}
            title={item.name}
            action={
              <Button variant="filled" startIcon={<AddBoxIcon />} color="primary" sx={{ alignContent: "center" }}>
                Join
              </Button>
            }
          />
        ))}
      </CardContent>
    </Grid>
  );
}

export default GroupListComponent;
