import React from 'react';
import {AsyncStorage, FlatList, StyleSheet, View, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import SplashScreen from '../components/SplashScreen';
import DropDown from '../components/DropDown';
import {Avatar, ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Utils from './Utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      dropdown: '',
      fav: '',
      name: '',
      html_url: '',
      avatar_url: '',
    };

    this.state = {isLoading: true};
  }

  getResponse(result) {
    this.setState({result: result});
  }

  getDropdown(result) {
    this.setState({dropdown: result});
    this.setState({result: ''});
    this.setState({fav: this.getStorageData(result)});
  }

  async getStorageData(key) {
    try {
      const result = await Utils.getData(key);
      if (result !== null) {
        // We have data!!
        const data = Object.entries(result)[0][1];
        this.setState({
          name: data.name,
          html_url: data.html_url,
          avatar_url: data.owner.avatar_url,
        });
        console.log(data);
        return data;
      }
    } catch (error) {
      // Error retrieving data
    }
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
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}>
              <Avatar
                rounded
                source={{
                  uri: this.state.avatar_url,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{this.state.name ?? ''}</ListItem.Title>
                <ListItem.Subtitle>
                  {this.state.html_url ?? ''}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
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
    marginBottom: 5,
  },
});
