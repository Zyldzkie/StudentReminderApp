import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EducationalScreen from './src/EducationalScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Educational">
        <Stack.Screen name="Educational" component={EducationalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
