import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { FAB } from 'react-native-paper';

const FloatingButton: React.FC<{
  visible: boolean;
}> = ({ visible }) => {
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
      open={open}
      visible={visible}
      icon={open ? 'close' : 'plus'}
      color="white"
      style={{
        bottom: Platform.OS === 'ios' ? -80 : -40,
      }}
      fabStyle={{ backgroundColor: '#006CFF', bottom: 40 }}
      actions={[
        {
          icon: 'checkbox-marked-circle-outline',
          label: 'Task',
          onPress: () => navigation.navigate('Task' as never),
          color: '#006CFF',
          style: { marginBottom: 30 },
          containerStyle: { marginBottom: 30 },
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
  );
};

export default FloatingButton;
