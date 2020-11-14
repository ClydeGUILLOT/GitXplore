import React, {Component} from 'react';
import User from './InformationPages/User';
import Repository from './InformationPages/Repository';
import Issue from './InformationPages/Issue';
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
        <Stack.Navigator initialRouteName="User">
          <Stack.Screen
            name="User"
            component={User}
            initialParams={{username: 'Popolipolipopo'}}
            options={{username: 'Popolipolipopo'}}
          />
          <Stack.Screen
            name="Repository"
            component={Repository}
            options={{
              username: 'Popolipolipopo',
              repoName: 'test_react_native',
            }}
          />
          <Stack.Screen
            name="Issue"
            component={Issue}
            options={{
              username: 'Popolipolipopo',
              repoName: 'test_react_native',
              issueNumber: '791',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
