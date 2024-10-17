import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import MYCOLORS from 'Constants/MYCOLORS';
import Home from './BottomTabs/Home';
import Events from './BottomTabs/Events';
import Groups from './BottomTabs/Groups';
import { BackButton } from '../components/BackButton';
import { View } from 'react-native';
import NewGroupWizard from 'screens/Groups/NewGroupWizard';

export type RootStackParamList = {
  Home: undefined;
  Groups: undefined;
  Events: undefined;
  CreateGroup: undefined; // Add CreateGroup to param list
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function RootStack() {
  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CreateGroup" component={NewGroupWizard} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{ backgroundColor: MYCOLORS.background }}
      screenOptions={{
        tabBarActiveTintColor: MYCOLORS.tabBar,
        tabBarInactiveTintColor: MYCOLORS.black,
        tabBarStyle: {
          backgroundColor: MYCOLORS.white,
          shadowColor: MYCOLORS.background,
          elevation: 4,
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          borderRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={({ navigation }) => ({
          title: 'Groups',
          headerStyle: {
            backgroundColor: MYCOLORS.header,
          },
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
          headerRight: () => (
            <Ionicons
              name="add"
              size={24}
              color={MYCOLORS.white}
              onPress={() => navigation.navigate('CreateGroup')}
            />
          ),
        })}
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
  );
}
