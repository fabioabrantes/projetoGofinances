import React from 'react';
import {Platform} from 'react-native';
import {useTheme} from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';

import {Dashboard} from '../screens/Dashboard';
import {Register} from '../screens/Register';

const {Navigator, Screen} = createBottomTabNavigator();
export const AppRoutes: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor:colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition:'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 :0,
          height: 60,
        }
      }}
      
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{ 
          tabBarIcon:({size,color})=>(
            <MaterialIcons
              size={size}
              color={color}
              name="format-list-bulleted"
            />
          )
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{ 
          tabBarIcon:({size,color})=>(
            <MaterialIcons
              size={size}
              color={color}
              name="attach-money"
            />
          )
        }}
      />
       <Screen
        name="Resumo"
        component={Register}
        options={{ 
          tabBarIcon:({size,color})=>(
            <MaterialIcons
              size={size}
              color={color}
              name="pie-chart"
            />
          )
        }}
      />
    </Navigator>
  
  );
}
