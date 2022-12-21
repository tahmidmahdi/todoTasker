import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';

const FloatingButton = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        color="white"
        fabStyle={{ backgroundColor: '#006CFF', bottom: 40 }}
        actions={[
          {
            icon: 'checkbox-marked-circle-outline',
            label: 'Task',
            onPress: () => navigation.navigate('Task' as never),
            color: '#006CFF',
            labelStyle: { fontWeight: 'bold' },
            labelTextColor: '#006CFF',
          },
          {
            icon: 'format-list-checks',
            label: 'List',
            onPress: () => console.log('Pressed list'),
            style: { marginBottom: 30 },
            containerStyle: { marginBottom: 30 },
            color: '#006CFF',
            labelStyle: { fontWeight: 'bold' },
            labelTextColor: '#006CFF',
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FloatingButton;
