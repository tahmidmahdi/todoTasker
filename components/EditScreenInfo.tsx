import React from 'react';

import { StyleSheet } from 'react-native';

import MonoText from './StyledText';
import { Text, View } from './Themed';

const EditScreenInfo = ({ path }: { path: string }) => (
  <View>
    <View style={styles.getStartedContainer}>
      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Manage your daily todo list easily
      </Text>

      <View
        style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        darkColor="rgba(255,255,255,0.05)"
        lightColor="rgba(0,0,0,0.05)">
        <MonoText>{path}</MonoText>
      </View>

      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Daily task management made easy
      </Text>
      <View
        style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        darkColor="rgba(255,255,255,0.05)"
        lightColor="rgba(0,0,0,0.05)">
        <MonoText>Creator: Tahmid Mahdi</MonoText>
      </View>
    </View>
  </View>
);

export default EditScreenInfo;

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
