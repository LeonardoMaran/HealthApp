import React from "react";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

//import styles from "./styles";
import { DataToStorageButton } from "../DataToStorageButton";

const Foodcard = ({ props, weekday, searchCategory }) => {

  return (
    <Card>
      <CardTitle
            subtitle={props.food_name.toUpperCase()}
      />
      <CardImage 
        source={{uri: `${props.photo.thumb}`}}
      />
      <View style={styles.row}>
        <View style={styles.box1}>
          <CardTitle
            subtitle="Nutrients"
          />
          <CardContent text={`${props.nf_total_fat} g Fat`} />
          <CardContent text={`${props.nf_total_carbohydrate} g Carbohydrate`} />
          <CardContent text={`${props.nf_protein} g Protein`} />
        </View>
        <View style={styles.box2} >
          <CardTitle
              subtitle={`Serving (${props.serving_qty} ${props.serving_unit})`}
          />
          <CardContent text={`${props.serving_weight_grams} g`} />
          <CardContent text={`${props.nf_calories} Kcal`} />
          <CardAction 
            separator={true}
            inColumn={true}>
            <DataToStorageButton props={props} weekday={weekday} searchCategory={searchCategory}></DataToStorageButton>
          </CardAction>
        </View>
      </View>
    </Card>
  );
};

Foodcard.propTypes = {
  props: PropTypes.any,
  weekday: PropTypes.string,
  searchCategory: PropTypes.string
};

export default Foodcard;


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