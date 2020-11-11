import Icon from 'react-native-vector-icons/Feather';
import {Picker, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';

class App extends React.Component {
  updateSearch = (search) => {
    this.props.callback(search);
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.search}
        style={{alignContent: 'center'}}
        onValueChange={(itemValue, itemIndex) => this.updateSearch(itemValue)}>
        <Picker.Item label="Repositories" value="repositories" />
        <Picker.Item label="Profiles" value="users" />
      </Picker>
    );
  }
}
export default App;
