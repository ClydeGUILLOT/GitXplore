import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity} from 'react-native';
import Utils from './Utils';

export default class Repository extends Component {
    constructor(props) {
        super(props);
        this.username = this.props.route.params.username !== undefined ? this.props.route.params.username : "Popolipolipopo";
        this.repoName = this.props.route.params.repoName !== undefined ? this.props.route.params.repoName : "test_react_native";
        this.state = {
            repoInfo: {},
            contributors: [],
            issues: [],
            isLoading: true
        };
    }

    async getGithubInfo() {
        let tmpRepoInfo = await Utils.fetchInformation(`https://api.github.com/repos/${this.username}/${this.repoName}`);
        let tmpRepoContributors = await Utils.fetchInformation(`https://api.github.com/repos/${this.username}/${this.repoName}/contributors`);
        let tmpRepoIssues = await Utils.fetchInformation(`https://api.github.com/repos/${this.username}/${this.repoName}/issues`);
        this.setState({
            repoInfo: tmpRepoInfo,
            contributors: tmpRepoContributors,
            issues: tmpRepoIssues,
            isLoading: false
        });
    }

    componentDidMount() {
        this.getGithubInfo();
    }

    render() {
        const { repoInfo, isLoading } = this.state;

        return (
            <View style={{ flex: 1, padding: 24 }}>
                {isLoading ? <ActivityIndicator/> : (
                    <View>
                        <View style={{alignItems: "center"}}>
                            <Text style={{fontSize: 23, fontWeight: "bold", padding: 15}}>{repoInfo.name}</Text>
                            <Text style={{fontSize: 18, fontStyle: "italic", padding: 15}}>{repoInfo.private === "true" ? "Private" : "Public"}</Text>
                            <Text style={{fontSize: 18, fontStyle: "italic", padding: 15}}>{repoInfo.fork === "true" ? "Fork" : "Not fork"}</Text>
                            <Text style={{fontSize: 15, padding: 15}}>{repoInfo.description}</Text>
                            <Text style={{fontSize: 17, padding: 15}}>{repoInfo.size} kb</Text>
                            <Text style={{fontSize: 17, padding: 15}}>{repoInfo.default_branch}</Text>
                        </View>
                        <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-around'}}>
                            <View style={{alignItems: "center"}}>
                                <Text style={{padding: 10}}>Contributors : </Text>
                                <FlatList
                                    data={this.state.contributors}
                                    renderItem={({item}) => <View>
                                        <TouchableOpacity onPress={() => this.props.navigation.push('User', {
                                            username: item.login.toString()
                                        })}>
                                            <Text style={
                                                {
                                                    padding: 10,
                                                    fontSize: 18,
                                                    height: 44,
                                                }
                                            }>{item.login.toString()}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                />
                            </View>
                            <View style={{alignItems: "center"}}>
                                <Text style={{padding: 10}}>Issues :</Text>
                                <FlatList
                                    data={this.state.issues}
                                    renderItem={({item}) =>
                                        <View>
                                            <TouchableOpacity onPress={() => this.props.navigation.push('Issue', {
                                                username: this.username.toString(),
                                                repoName: this.repoName.toString(),
                                                issueNumber: item.number.toString()
                                            })}>
                                                <Text style={
                                                    {
                                                        padding: 10,
                                                        fontSize: 15,
                                                        height: 44,
                                                    }
                                                }>{item.title.toString()}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }
};
