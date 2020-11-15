import {Text, FlatList, View, StyleSheet} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    search: '',
    data: '',
  };

  renderItem = ({item}) => {
    if (this.props.search === 'repositories') {
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
    } else if (this.props.search === 'users') {
      return (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.push('User', {
              username: item.login,
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
    } else if (this.props.search === 'issues') {
      return (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.push('Issue', {
              username: item.user.login,
              repoName: item.title,
              issueNumber: item.number.toString(),
            })
          }>
          <Avatar rounded source={{uri: item.user.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{'Status: ' + item.state}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    }
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => 'key ' + index}
      />
    );
  }
}
export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
});
