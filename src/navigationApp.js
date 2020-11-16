import React, {Component} from 'react';
import User from './src/User';
import Repository from './src/Repository';
import Issue from './src/Issue';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="User">
                        <Stack.Screen name="User" component={User} initialParams={{username: "Popolipolipopo"}} options={{username: "Popolipolipopo", title: "Profile", headerStyle: {
                                backgroundColor: '#303030',
                            },
                            headerTintColor: "#FFFFFF",
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: "white"
                            },}}/>
                        <Stack.Screen name="Repository" component={Repository} options={{username: "Popolipolipopo", repoName: "test_react_native", headerStyle: {
                                backgroundColor: '#303030',
                            },
                            headerTintColor: "#FFFFFF",
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: "white"
                            }}}/>
                        <Stack.Screen name="Issue" component={Issue} options={{username: "Popolipolipopo", repoName: "test_react_native", issueNumber: "791", headerStyle: {
                                backgroundColor: '#303030',
                            },
                            headerTintColor: "#FFFFFF",
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: "white"
                            }}} />
                    </Stack.Navigator>
                </NavigationContainer>
        );
    }
};
