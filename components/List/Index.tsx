import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import taskList from '../../config/taskList';
import Colors from '../../constants/Colors';

const ListMain: React.FC<{
  todoTypes: string;
  setTodoTypes: React.Dispatch<React.SetStateAction<string>>;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ todoTypes, setTodoTypes, setListOpen }) => {
  const list = ({ item }) => {
    const { name, color, backgroundColor } = item;
    const toggleSelection = (todoName: string) => {
      setTodoTypes(todoName);
    };
    const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      main: {
        justifyContent: 'center',
      },
      listText: {
        fontSize: 16,
        fontWeight: 'bold',
        color,
      },
      tick: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <Pressable
        style={styles.container}
        onPress={() => toggleSelection(name as string)}>
        <View style={styles.main}>
          <Text style={styles.listText}>{name}</Text>
          <Text>1 task </Text>
        </View>
        {todoTypes.toLowerCase() === name.toLowerCase() && (
          <View style={styles.tick}>
            <FontAwesome5 name="check" size={10} color={Colors.light.blue} />
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <FlatList
      data={taskList}
      renderItem={list}
      keyExtractor={item => item.name}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 0,
      }}
    />
  );
};

export default ListMain;
