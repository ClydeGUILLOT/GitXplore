import {SearchBar} from 'react-native-elements';
import {Text, StyleSheet} from 'react-native';
import React from 'react';

class App extends React.Component {
  state = {
    search: '',
    data: '',
  };

  makeRequest(result) {
    console.log('TEST');
    const url = `https://api.github.com/search/repositories?q=${result}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(url);
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
        searchIcon={{size: 24}}
        onChangeText={this.updateSearch}
        onSubmitEditing={() => this.makeRequest(this.state.search)}
        placeholder="Search GitHub repositories"
        value={search}
      />
    );
  }
}
export default App;
