import * as React from 'react';
import Home from '../Screens/Home/Home';
import Flights from '../Screens/Flights/Flights';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function App() {
    return (
      <NavigationContainer> 
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
          options={{
            headerShown: true
          }}
          name="Flights" component={Flights} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 