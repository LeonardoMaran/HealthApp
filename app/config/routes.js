import { createStackNavigator, createDrawerNavigator, DrawerItems, TabNavigator } from "react-navigation";
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import FoodHome from "../screens/FoodHome";
import WorkoutHome from "../screens/WorkoutHome";
import Food from "../screens/Food";
import Workout from "../screens/Workout";
import Searchresults from "../screens/Searchresults";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: TabNavigator({
        FoodHome: {
          screen: FoodHome,
          navigationOptions: ({ navigation }) => ({
            title: 'Foods',
          }),
        },
        WorkoutHome: {
          screen: WorkoutHome,
          navigationOptions: ({ navigation }) => ({
            title: 'Workouts',
          }),
        },
      },
      {
        tabBarPosition: 'bottom',
        tabBarOptions : {
          style: {
            backgroundColor: '#5AD196',
            color: 'black'
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        title: 'Home',  
        headerLeft: <Icon name="ios-menu" style={styles.icon} size={35} onPress={ () => navigation.toggleDrawer() } />
      }),
    },
    Food: {
      screen: Food,
      navigationOptions: {
        headerTitle: "My Foods"
      }
    },
    Workout: {
      screen: Workout,
      navigationOptions: {
        headerTitle: "My Workouts"
      }
    },
    Searchresults: {
      screen: Searchresults,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#5AD196', tintColor: 'white' }, 
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
    }),
  }
);
const HomeTabNavigator = TabNavigator({
  FoodHome: { screen: FoodHome }, 
  WorkoutHome: { screen: WorkoutHome },
})

const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#5AD196',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="ios-heart" color='white' size={60} />
    </View>
    <DrawerItems {...props} />
  </View>
)

export default createDrawerNavigator(
  
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Home' 
      },
    },
    Food: {
      screen: HomeStack,
      navigationOptions: {
        title: 'My Foods' 
      }
    },
    Workout: {
      screen: HomeStack,
      navigationOptions: {
        title: 'My Workouts' 
      }
    },
  },
  {
    contentComponent: DrawerContent,
    mode: "modal",
    headerMode: "none",
     contentOptions: {
      activeTintColor: '#5AD196',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 10,
      },
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    padding: 8,
    color: 'white'
  }
});