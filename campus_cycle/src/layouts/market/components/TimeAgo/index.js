import React from 'react';

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = Math.abs(now - date);

    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 0) {
        return `${daysDiff} days ago`;
    } else if (hoursDiff > 0) {
        return `${hoursDiff} hours ago`;
    } else if (minutesDiff > 0) {
        return `${minutesDiff} minutes ago`;
    } else {
        return `${secondsDiff} seconds ago`;
    }
}

const TimeAgo = ({ date }) => {
    return (
        <span>{getTimeAgo(date)}</span>
    );
};

export default TimeAgo;
