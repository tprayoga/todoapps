import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/screens/Home";
import Detail from "./src/screens/Detail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

function myTab() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false
        }}
        />
    </Tab.Navigator>
  )
  
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={myTab} />
        <Stack.Screen name="Detail" component={Detail} options={{headerTransparent:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
