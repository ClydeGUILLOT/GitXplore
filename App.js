import React, {Component} from 'react';
import Home from './src/InformationPages/Home';
import User from './src/InformationPages/User';
import Repository from './src/InformationPages/Repository';
import Issue from './src/InformationPages/Issue';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Welcome to GitXplorer"
            component={Home}
            initialParams={{username: 'Popolipolipopo'}}
            options={{
              username: 'Popolipolipopo',
              title: 'Welcome to GitXplorer',
              headerStyle: {
                backgroundColor: '#303030',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="User"
            component={User}
            initialParams={{username: 'Popolipolipopo'}}
            options={{
              username: 'Popolipolipopo',
              userData: '',
              title: 'Profile',
              headerStyle: {
                backgroundColor: '#303030',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="Repository"
            component={Repository}
            options={{
              username: 'Popolipolipopo',
              repoName: 'test_react_native',
              repoData: '',
              headerStyle: {
                backgroundColor: '#303030',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="Issue"
            component={Issue}
            options={{
              username: 'Popolipolipopo',
              repoName: 'test_react_native',
              issueNumber: '791',
              issueData: '',
              headerStyle: {
                backgroundColor: '#303030',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
