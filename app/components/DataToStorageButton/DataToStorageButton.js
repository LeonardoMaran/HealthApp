import React from "react";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage, StyleSheet, Alert } from 'react-native';
import { CardButton } from 'react-native-cards';

//import styles from "./styles";


const DataToStorageButton = ({ props, weekday, searchCategory }) => {

  const _storeData = async () => {
    try {
      if (searchCategory == 'Food') {
        await AsyncStorage.getItem(weekday+searchCategory).then(foodObjs => {
            foodObjs = foodObjs == null ? [] : JSON.parse(foodObjs)

            foodObjs.push(props)

            return AsyncStorage.setItem(weekday+searchCategory, JSON.stringify(foodObjs))
        })
      }
      if (searchCategory == 'Workout') {
        await AsyncStorage.getItem(weekday+searchCategory).then(workoutObjs => {
            workoutObjs = workoutObjs == null ? [] : JSON.parse(workoutObjs)

            workoutObjs.push(props)

            return AsyncStorage.setItem(weekday+searchCategory, JSON.stringify(workoutObjs))
        })
      }
      if (searchCategory == 'Food') {
        await Alert.alert(`Item saved for ${weekday} daily foods!`)
      }
      if (searchCategory == 'Workout') {
        await Alert.alert(`Item saved for ${weekday} daily exercise!`)
      }
    } catch (error) {
      //console.log("Error saving data")
      Alert.alert('Error saving data')
      console.log(error)
    }
  }
  
  return (
    <CardButton
        onPress={ () => _storeData() }
        title='ADD TO DAILY'
        color="#1E6738"
    />
  );
};

DataToStorageButton.propTypes = {
  props: PropTypes.any,
  weekday: PropTypes.string,
  searchCategory: PropTypes.string
};

export default DataToStorageButton;

const styles = StyleSheet.create({
  
});