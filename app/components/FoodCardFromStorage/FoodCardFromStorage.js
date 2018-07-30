
import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from "prop-types";

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Container, Header, Content, Accordion, View, Text } from "native-base";


const FoodCardFromStorage = ({ props, weekday, removeData }) => {

  const dataArray = [
    { title: props.food_name, content: props }
  ];

  const _renderHeader = (title, expanded) => {
    return (
      <View
        style={{ flexDirection: "row", paddingRight: 14, justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}
      >
      <CardTitle
            subtitle={title.toUpperCase()}
          />
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 18 }} name="ios-arrow-down" />}
      </View>
    );
  }

  const _renderContent = (content) => {
    return (
      <Card>
      <View style={styles.row}>
        <View style={styles.box1}>
          <CardTitle
            subtitle="Nutrients"
          />
          <CardContent text={`${content.nf_total_fat} g Fat`} />
          <CardContent text={`${content.nf_total_carbohydrate} g Carbohydrate`} />
          <CardContent text={`${content.nf_protein} g Protein`} />
        </View>
        <View style={styles.box2} >
          <CardTitle
              subtitle={`Serving (${content.serving_qty} ${content.serving_unit})`}
          />
          <CardContent text={`${content.serving_weight_grams} g`} />
          <CardContent text={`${content.nf_calories} Kcal`} />
          <CardAction 
            separator={true}
            inColumn={false}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignItems: 'center', paddingTop:10}}>
              <Icon style={styles.icon} name="ios-trash-outline" onPress={removeData} />
            </View>
          </CardAction>
        </View>
      </View>
    </Card>
    );
  }

  return (
    <View>
        <Accordion 
          dataArray={dataArray}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
        />
    </View>
  );
  
}

FoodCardFromStorage.propTypes = {
  props: PropTypes.any,
  weekday: PropTypes.string,
  removeData: PropTypes.any
};

export default FoodCardFromStorage;

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
  },
  icon: {
    fontSize: 30, 
    color:'red', 
    width:45, 
    height:45
  }
});