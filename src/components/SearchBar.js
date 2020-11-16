import {SearchBar} from 'react-native-elements';
import {Text, StyleSheet} from 'react-native';
import React from 'react';

class App extends React.Component {
  state = {
    search: '',
    data: '',
  };

  makeRequest(result) {
    const url = `https://api.github.com/search/${
      this.props.search ?? 'repositories'
    }?q=${result}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data.items,
        });
        this.props.callback(data.items);
      });
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        round
        containerStyle={styles.background}
        onChangeText={this.updateSearch}
        onSubmitEditing={() => this.makeRequest(this.state.search)}
        placeholder={'Search GitHub ' + this.props.search}
        value={search}
        style={styles.search}
      />
    );
  }
}
export default App;

const styles = StyleSheet.create({
  search: {
    fontSize: 20,
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 4,
  },
  background: {
    backgroundColor: '#303030',
    color: '#FFFFFF',
  },
});
