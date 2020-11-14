import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from './SplashScreen';
import SearchBar from './SearchBar';
import ResultList from './ResultList';
import DropDown from './DropDown';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      dropdown: '',
    };

    this.state = {isLoading: true};
  }

  getResponse(result) {
    this.setState({result: result});
  }

  getDropdown(result) {
    this.setState({dropdown: result});
    this.setState({result: ''});
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
    if (this.state.dropdown == null) {
      this.getDropdown('repositories');
    }

    return (
      <View flex={1}>
        <SearchBar
          callback={this.getResponse.bind(this)}
          search={this.state.dropdown}
        />
        <Text style={styles.welcome}>Welcome to GitXplorer</Text>
        <DropDown
          callback={this.getDropdown.bind(this)}
          search={this.state.dropdown}
        />
        <ResultList data={this.state.result} search={this.state.dropdown} />
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
