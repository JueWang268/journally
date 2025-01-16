import React, { useState } from 'react';
import './FriendsList.css';
import { List, ListItem, ListItemText, Checkbox, Typography } from '@mui/material';

const FriendsList = ({ friends, selectedFriends, setSelectedFriends }) => {

  const handleToggle = (friend) => {
    const currentIndex = selectedFriends.indexOf(friend);
    const newSelectedFriends = [...selectedFriends];

    if (currentIndex === -1) {
      newSelectedFriends.push(friend);
    } else {
      newSelectedFriends.splice(currentIndex, 1);
    }

    setSelectedFriends(newSelectedFriends);
  };

  return (
    <div className='friends-list'>
      <List
        sx={{
          maxHeight: '20vh',
          overflow: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {friends.map((friend) => (
          <ListItem key={friend}>
            <Checkbox
              checked={selectedFriends.indexOf(friend) !== -1}
              onChange={() => handleToggle(friend)}
              inputProps={{ 'aria-labelledby': friend }}
            />
            <ListItemText
              id={friend}
              primary={
                <Typography variant="body2" className='friend-name'>{friend}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* <div>
        <h4>Selected Friends:</h4>
        <ul>
          {selectedFriends.map((friend) => (
            <li key={friend}>{friend}</li>
          ))}
        </ul>
      </div> */}
      <div className="friends-list-bottom"></div>
    </div >
  );
};

export default FriendsList;