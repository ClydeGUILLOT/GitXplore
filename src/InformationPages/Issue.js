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

export default class Issue extends Component {
  constructor(props) {
    super(props);
    this.username =
      this.props.route.params.username !== undefined
        ? this.props.route.params.username
        : 'octocat';
    this.repoName =
      this.props.route.params.repoName !== undefined
        ? this.props.route.params.repoName
        : 'hello-world';
    this.issueNumber =
      this.props.route.params.issueNumber !== undefined
        ? this.props.route.params.issueNumber
        : '791';
    this.issueData =
      this.props.route.params.issueData !== undefined
        ? this.props.route.params.issueData
        : '';
    this.state = {
      isFav: false,
      issueInfo: {},
      isLoading: true,
    };
  }

  async getGithubInfo() {
    let tmpIssueInfo = await Utils.fetchInformation(
      `https://api.github.com/repos/${this.username}/${this.repoName}/issues/${this.issueNumber}`,
    );
    let tmpStorage = await Utils.getData('issues');
    this.setState({
      isFav: tmpStorage !== null && tmpIssueInfo.id.toString() in tmpStorage,
      issueInfo: tmpIssueInfo,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.getGithubInfo();
  }

  render() {
    const {issueInfo, isLoading} = this.state;

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
                  'issues',
                  issueInfo.id.toString(),
                );
              } else {
                let map = {
                  title: this.issueData.title,
                  subtitle: this.issueData.state,
                  avatar: this.issueData.user.avatar_url,
                };
                await Utils.addToStorage(
                  'issues',
                  issueInfo.id.toString(),
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
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  color: 'white',
                  padding: 15,
                }}>
                {issueInfo.title}
              </Text>
              <View style={{flexDirection: 'row', padding: 15}}>
                <Icon
                  name={issueInfo.state === 'open' ? 'report' : 'verified'}
                  color={issueInfo.state === 'open' ? 'red' : 'springgreen'}
                />
                <Text
                  style={{fontSize: 18, fontStyle: 'italic', color: 'white'}}>
                  {'\t'}
                  {issueInfo.state}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontStyle: issueInfo.body !== null ? 'normal' : 'italic',
                  color: 'white',
                  padding: 15,
                }}>
                {issueInfo.body !== null
                  ? `"${issueInfo.body}"`
                  : 'No description'}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('User', {
                    username: issueInfo.user.login.toString(),
                  })
                }>
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Icon name="person" color="cyan" />
                  <Text
                    style={{
                      fontSize: 17,
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    {'\t'}
                    {issueInfo.user.login}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
