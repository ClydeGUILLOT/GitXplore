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
      dropdown: 'repositories',
      fav: '',
      title: '',
      subtitle: '',
      avatar_url: '',
      isLoading: true,
    };
  }

  getResponse(result) {
    this.setState({result: result});
  }

  getDropdown(result) {
    this.getStorageData(result);
  }

  async getStorageData(key) {
    try {
      const result = await Utils.getData(key);
      if (result !== null) {
        // We have data!!
        const data = Object.entries(result)[0][1];
        let _title = [];
        let _subtitle = [];
        let _avatar = [];
        Object.keys(data).map((key) => {
          _title.push(data[key][1].title);
          _subtitle.push(data[key][1].subtitle);
          _avatar.push(data[key][1].avatar);
        });
        console.log(_title);
        this.setState({
          title: data.title,
          subtitle: data.subtitle,
          avatar_url: data.avatar,
          dropdown: key,
          result: '',
        });
        return data;
      } else {
        this.setState({
          title: '',
          subtitle: '',
          avatar_url: '',
          dropdown: key,
          result: '',
        });
      }
    } catch (error) {
      this.setState({
        title: '',
        subtitle: '',
        avatar_url: '',
        dropdown: key,
        result: '',
      });
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
    this.getDropdown('repositories');

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  renderItem = ({item}) => {
    if (this.state.dropdown === 'repositories') {
      return (
        <ListItem
          Component={TouchableScale}
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
                <ListItem.Title>{this.state.title ?? ''}</ListItem.Title>
                <ListItem.Subtitle>
                  {this.state.subtitle ?? ''}
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
