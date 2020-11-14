import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Utils from './Utils';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.username =
      this.props.route.params.username !== undefined
        ? this.props.route.params.username.toString()
        : 'Popolipolipopo';
    this.state = {
      userInfo: {},
      repos: [],
      followers: [],
      isLoading: true,
    };
  }

  async getGithubInfo() {
    let tmpUserInfo = await Utils.fetchInformation(
      `https://api.github.com/users/${this.username}`,
    );
    let tmpRepos = await Utils.fetchInformation(
      `https://api.github.com/users/${this.username}/repos`,
    );
    let tmpFollowers = await Utils.fetchInformation(
      `https://api.github.com/users/${this.username}/followers`,
    );
    this.setState({
      userInfo: tmpUserInfo,
      repos: tmpRepos,
      followers: tmpFollowers,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getGithubInfo();
  }

  render() {
    const {userInfo, isLoading} = this.state;
    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 150,
                  width: 150,
                  borderWidth: 1,
                  borderRadius: 75,
                }}
                source={{uri: userInfo.avatar_url}}
                resizeMode="cover"
              />
              <Text style={{fontSize: 23, fontWeight: 'bold', padding: 15}}>
                {userInfo.login}
              </Text>
              <Text style={{fontSize: 18, fontStyle: 'italic', padding: 15}}>
                {userInfo.type}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-around',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{padding: 10}}>Repositories :</Text>
                <FlatList
                  data={this.state.repos}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('Repository', {
                            username: this.username.toString(),
                            repoName: item.name.toString(),
                          })
                        }>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                          }}>
                          {item.name.toString()}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{padding: 10}}>Followers :</Text>
                <FlatList
                  data={this.state.followers}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('User', {
                            username: item.login.toString(),
                          })
                        }>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                          }}>
                          {item.login.toString()}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
