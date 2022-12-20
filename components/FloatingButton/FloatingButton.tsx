import React, { useState } from 'react';

import { FloatingAction } from 'react-native-floating-action';

const actions = [
  {
    text: 'Task',
    name: 'task',
    position: 1,
  },
  {
    text: 'List',
    name: 'list',
    position: 2,
  },
];
const FloatingButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <FloatingAction
      actions={actions}
      onPressItem={name => {
        console.log(`selected button: ${name}`);
      }}
    />
  );
};

export default FloatingButton;
