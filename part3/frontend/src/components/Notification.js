import React from 'react';

const Notification = ({ banner }) => {
  const notificationStyle = {
    border: '5px solid',
    borderColor: banner.colour,
    borderRadius: 5,
    backgroundColor: 'grey',
    padding: 10,
  };

  if (banner.message === null) {
    return null;
  }

  return <div style={notificationStyle}>{banner.message}</div>;
};

export default Notification;
