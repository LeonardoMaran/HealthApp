import React from "react";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

//import styles from "./styles";
import { DataToStorageButton } from "../DataToStorageButton";

const Workoutcard = ({ props, weekday, searchCategory }) => {

  return (
    <Card>
      <CardTitle
            subtitle={props.name.toUpperCase()}
      />
      <CardImage 
        source={{uri: `${props.photo.thumb}`}}
      />
      <View style={styles.row}>
        <View style={styles.box1}>
          <CardTitle
            subtitle="Duration"
          />
          <CardContent text={`${props.duration_min} Minutes`} />
        </View>
        <View style={styles.box2} >
          <CardTitle
              subtitle={`Calories`}
          />
          <CardContent text={`${props.nf_calories} Kcal`} />
        </View>
      </View>
      <CardAction 
            separator={true}
            inColumn={true}>
            <DataToStorageButton props={props} weekday={weekday} searchCategory={searchCategory}></DataToStorageButton>
          </CardAction>
    </Card>
  );
};

Workoutcard.propTypes = {
  props: PropTypes.any,
  weekday: PropTypes.string,
  searchCategory: PropTypes.string
};

export default Workoutcard;


const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
  }
});