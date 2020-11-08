import {Text, FlatList, View, StyleSheet} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import React from 'react';

class App extends React.Component {
  state = {
    search: '',
    data: '',
  };

  renderItem = ({item}) => {
    return (
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}>
        <Avatar rounded source={{uri: item.owner.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.owner.login}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  render() {
    console.log(this.props.data);
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
