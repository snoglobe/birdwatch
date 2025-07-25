import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CameraScreen from './screens/CameraScreen';
import CollectionScreen from './screens/CollectionScreen';
import { BirdProvider } from './context/BirdContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BirdProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const iconName = route.name === 'Camera' ? 'camera' : 'list';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false
          })}
        >
          <Tab.Screen name="Camera" component={CameraScreen} />
          <Tab.Screen name="Collection" component={CollectionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BirdProvider>
  );
}