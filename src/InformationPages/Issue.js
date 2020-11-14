import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Utils from './Utils';

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
    this.state = {
      issueInfo: {},
      isLoading: true,
    };
  }

  async getGithubInfo() {
    let tmpIssueInfo = await Utils.fetchInformation(
      `https://api.github.com/repos/${this.username}/${this.repoName}/issues/${this.issueNumber}`,
    );
    console.log(
      `https://api.github.com/repos/${this.username}/${this.repoName}/issues/${this.issueNumber}`,
    );
    this.setState({
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
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 23, fontWeight: 'bold', padding: 15}}>
                {issueInfo.title}
              </Text>
              <Text style={{fontSize: 18, fontStyle: 'italic', padding: 15}}>
                {issueInfo.state}
              </Text>
              <Text style={{fontSize: 15, padding: 15}}>{issueInfo.body}</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push('User', {
                    username: issueInfo.user.login.toString(),
                  })
                }>
                <Text style={{fontSize: 17, padding: 15}}>
                  Submitted by: {issueInfo.user.login}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
