import React from 'react';
import {AsyncStorage, FlatList, StyleSheet, View, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import SplashScreen from '../components/SplashScreen';
import DropDown from '../components/DropDown';
import {Avatar, ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

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

  async getStorageData(key) {
    const result = await AsyncStorage.getItem(key);
    const data = JSON.parse(JSON.stringify(result));
    console.log('test ' + data);
    return result;
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

  renderItem = ({item}) => {
    if (this.state.dropdown === 'repositories') {
      return (
        <ListItem
          Component={TouchableScale}
          style={styles.instructions}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.push('Repository', {
              username: item.owner.login,
              repoName: item.name,
              repoData: item,
            })
          }>
          <Avatar rounded source={{uri: item.owner.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.owner.login}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    } else if (this.state.dropdown === 'users') {
      return (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.push('User', {
              username: item.login,
              userData: item,
            })
          }>
          <Avatar rounded source={{uri: item.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{item.login}</ListItem.Title>
            <ListItem.Subtitle>{item.url}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    } else if (this.state.dropdown === 'issues') {
      console.log(item.url.split('/')[5]);
      return (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.push('Issue', {
              username: item.user.login,
              repoName: item.url.split('/')[5],
              issueNumber: item.number,
              issueData: item,
            })
          }>
          <Avatar rounded source={{uri: item.user.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{item.user.login}</ListItem.Title>
            <ListItem.Subtitle>{'Status: ' + item.state}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    }
  };

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
        <DropDown
          callback={this.getDropdown.bind(this)}
          search={this.state.dropdown}
        />
        {this.state.result === '' ? (
          <View>
            <Text style={styles.welcome}>Favorites</Text>
            <FlatList
              data={this.getStorageData(this.state.dropdown)}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => 'key ' + index}
            />
          </View>
        ) : (
          <FlatList
            data={this.state.result}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => 'key ' + index}
          />
        )}
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
    backgroundColor: '#00005F',
    marginBottom: 5,
  },
});
