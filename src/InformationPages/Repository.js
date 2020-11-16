import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Utils from './Utils';
import {Icon} from 'react-native-elements';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.username =
      this.props.route.params.username !== undefined
        ? this.props.route.params.username
        : 'Popolipolipopo';
    this.repoName =
      this.props.route.params.repoName !== undefined
        ? this.props.route.params.repoName
        : 'test_react_native';
    this.repoData =
      this.props.route.params.repoData !== undefined
        ? this.props.route.params.repoData
        : '';
    this.state = {
      isFav: false,
      repoInfo: {},
      contributors: [],
      issues: [],
      isLoading: true,
    };
  }

  async getGithubInfo() {
    let tmpRepoInfo = await Utils.fetchInformation(
      `https://api.github.com/repos/${this.username}/${this.repoName}`,
    );
    let tmpRepoContributors = await Utils.fetchInformation(
      `https://api.github.com/repos/${this.username}/${this.repoName}/contributors`,
    );
    let tmpRepoIssues = await Utils.fetchInformation(
      `https://api.github.com/repos/${this.username}/${this.repoName}/issues`,
    );
    let tmpStorage = await Utils.getData('repositories');
    this.setState({
      isFav: tmpStorage !== null && tmpRepoInfo.id.toString() in tmpStorage,
      repoInfo: tmpRepoInfo,
      contributors: tmpRepoContributors,
      issues: tmpRepoIssues,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getGithubInfo();
  }

  render() {
    const {repoInfo, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24, backgroundColor: '#000000'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Icon
            name={this.state.isFav ? 'favorite' : 'favorite'}
            color={this.state.isFav ? 'red' : 'white'}
            onPress={async () => {
              if (this.state.isFav) {
                await Utils.removeFromStorage(
                  'repositories',
                  repoInfo.id.toString(),
                );
              } else {
                let map = {
                  title: this.repoData.name,
                  subtitle: this.repoData.html_url,
                  avatar: this.repoData.owner.avatar_url,
                };
                await Utils.addToStorage(
                  'repositories',
                  repoInfo.id.toString(),
                  map,
                );
              }
              this.setState({
                isFav: !this.state.isFav,
              });
            }}
          />
        </View>
        <StatusBar backgroundColor="#303030" />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={{alignItems: 'center'}}>
              <View>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: 'bold',
                    color: 'white',
                    padding: 15,
                  }}>
                  {repoInfo.name}
                </Text>
                <View style={{flexDirection: 'row', padding: 15}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="person"
                      color={
                        repoInfo.private === 'true' ? 'red' : 'springgreen'
                      }
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontStyle: 'italic',
                        color: 'white',
                      }}>
                      {'\t'}
                      {repoInfo.private === 'true' ? 'Private' : 'Public'}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', paddingLeft: 20}}>
                    <Icon
                      name="code"
                      color={repoInfo.fork === 'true' ? 'springgreen' : 'red'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontStyle: 'italic',
                        color: 'white',
                      }}>
                      {'\t'}
                      {repoInfo.fork === 'true' ? 'Fork' : 'Not fork'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontStyle:
                    repoInfo.description !== null ? 'normal' : 'italic',
                  color: 'white',
                  padding: 15,
                }}>
                {repoInfo.description !== null
                  ? `"${repoInfo.description}"`
                  : 'No description'}
              </Text>
              <View style={{flexDirection: 'row', padding: 15}}>
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Icon name="source" color="orange" />
                  <Text style={{fontSize: 17, color: 'white'}}>
                    {'\t'}
                    {repoInfo.size} kb
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', paddingLeft: 20, padding: 15}}>
                  <Icon name="mediation" color="orange" />
                  <Text style={{fontSize: 17, color: 'white'}}>
                    {'\t'}
                    {repoInfo.default_branch}
                  </Text>
                </View>
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
                  <Icon name="person" color="cyan" />
                  <Text style={{color: 'white', fontSize: 16}}>
                    {'\t'}Contributors :
                  </Text>
                </View>
                <FlatList
                  data={this.state.contributors}
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
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Icon name="report" color="magenta" />
                  <Text style={{color: 'white', fontSize: 16}}>
                    {'\t'}Issues :
                  </Text>
                </View>
                <FlatList
                  data={this.state.issues}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push('Issue', {
                            username: this.username.toString(),
                            repoName: this.repoName.toString(),
                            issueNumber: item.number.toString(),
                          })
                        }
                        style={{backgroundColor: '#151515'}}>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 15,
                            height: 44,
                            color: 'white',
                          }}>
                          {item.title.toString()}
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
