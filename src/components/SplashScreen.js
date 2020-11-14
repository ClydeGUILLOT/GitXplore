import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container];
    const textStyles = {
      color: 'black',
      fontSize: 40,
      fontFamily: 'JetBrainsMono-Regular',
    };

    return (
      <View style={viewStyles}>
        <Image
          style={styles.tinyLogo}
          source={require('../../images/github-icon.png')}
        />
        <Text style={textStyles}>GitXplorer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
