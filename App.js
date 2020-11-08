import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from './src/SplashScreen';
import SearchBar from './src/components/SearchBar';
import ResultList from './src/components/ResultList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };

    this.state = {isLoading: true};
  }

  getResponse(result) {
    this.setState({result});
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <View flex={1}>
        <SearchBar callback={this.getResponse.bind(this)} />
        <Text style={styles.welcome}>Welcome to GitXplorer</Text>
        <ResultList data={this.state.result} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
