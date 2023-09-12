import React from 'react';

import Avatar from '@mui/material/Avatar';

interface Props {
  name: string;
}

const UserAvatar = ({ name }: Props) => {
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const getInitials = (name: string) => {
    const splitName = name.split(' ');

    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    } else {
      return splitName[0][0];
    }
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 50,
        height: 50,
      },
      children: `${getInitials(name)}`,
    };
  };

  return <Avatar {...stringAvatar(name)} />;
};

export default UserAvatar;
