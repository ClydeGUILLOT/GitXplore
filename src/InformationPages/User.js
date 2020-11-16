import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Utils from './Utils';
import {Icon} from 'react-native-elements';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.username =
      this.props.route.params.username !== undefined
        ? this.props.route.params.username.toString()
        : 'Popolipolipopo';
    this.userData =
      this.props.route.params.userData !== undefined
        ? this.props.route.params.userData
        : '';
    this.state = {
      isFav: false,
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
    let tmpStorage = await Utils.getData('users');
    this.setState({
      isFav: tmpStorage !== null && tmpUserInfo.id.toString() in tmpStorage,
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
      <View style={{flex: 1, padding: 24, backgroundColor: '#000000'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Icon
            name={this.state.isFav ? 'favorite' : 'favorite'}
            color={this.state.isFav ? 'red' : 'white'}
            onPress={async () => {
              if (this.state.isFav) {
                await Utils.removeFromStorage('users', userInfo.id.toString());
              } else {
                let map = {
                  title: this.userData.login,
                  subtitle: this.userData.url,
                  avatar: this.userData.avatar_url,
                };
                await Utils.addToStorage('users', userInfo.id.toString(), map);
              }
              this.setState({
                isFav: !this.state.isFav,
              });
            }}
          />
        </View>
        <StatusBar backgroundColor="#303030" />
        {isLoading ? (
          <ActivityIndicator color={'white'} />
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
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  color: 'white',
                  padding: 30,
                }}>
                {userInfo.login}
              </Text>
              <View style={{flexDirection: 'row', padding: 15}}>
                <Icon name="person" color="white" />
                <Text
                  style={{fontSize: 18, fontStyle: 'italic', color: 'white'}}>
                  {' '}
                  {userInfo.type}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-around',
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Icon name="source" color="springgreen" />
                  <Text style={{color: 'white', fontSize: 16}}>
                    {'\t'}Repositories :
                  </Text>
                </View>
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
                        }
                        style={{backgroundColor: '#151515'}}>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                            color: 'white',
                          }}>
                          {item.name.toString()}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Icon name="person" color="red" />
                  <Text style={{color: 'white', fontSize: 16}}>
                    {'\t'}Followers :
                  </Text>
                </View>
                <FlatList
                  data={this.state.followers}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('User', {
                            username: item.login.toString(),
                          })
                        }
                        style={{backgroundColor: '#151515'}}>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                            color: 'white',
                          }}>
                          {item.login.toString()}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
