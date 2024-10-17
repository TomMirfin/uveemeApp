import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import Overview from '../screens/overview';
import Home from './BottomTabs/Home';
import Events from './BottomTabs/Events';
import Groups from './BottomTabs/Groups';
import { Ionicons } from '@expo/vector-icons';
import MYCOLORS from 'Constants/MYCOLORS';
import { View } from 'react-native';
export type RootStackParamList = {
  Groups: undefined;
  Events: undefined;
  Home: undefined;
};

export default function RootStack() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: MYCOLORS.white,
          tabBarInactiveTintColor: MYCOLORS.black,
          tabBarStyle: {
            backgroundColor: MYCOLORS.tabBar,
            shadowColor: MYCOLORS.background,
            elevation: 4,
            position: 'absolute',
            bottom: 40,
            marginHorizontal: 20,
            borderRadius: 20,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: MYCOLORS.background,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
            headerStyle: {
              backgroundColor: MYCOLORS.header,
            },
          }}
        />
        <Tab.Screen
          name="Groups"
          component={Groups}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
            tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
