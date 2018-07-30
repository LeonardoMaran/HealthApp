
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import { Container } from "../components/Container";
import { Searchbar } from "../components/Searchbar";

class Home extends Component {
  
   render() {

    const { navigate } = this.props.navigation;

    return (
      <Container>
          <Searchbar props={this.props.navigation} searchCategory='Food' screenName={"Searchresults"} />
          <Card style={styles.card1}>
            <CardTitle 
              subtitle="How To Use"
              style={styles.cardTitle}
            />
            <CardContent style={{}} text="Search the food macros (proteins, fats and carbohydrates) that you have eaten or will be eating today. Plan your daily macros by searching foods and adding them to your Foods page." />
          </Card>
          <Card style={styles.card2}>
            <CardTitle
              subtitle="Search Example"
              style={styles.cardTitle}
            />
            <CardContent style={{}} text={`Simply write a food name to the Search field:\nBread\nOr a whole, more detailed sentence:\nI ate 2 breads, 70g eggs and drank 1 cup of milk`} />
          </Card>
      </Container>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  card1: {
    marginRight: 10, 
    marginLeft: 10,
    marginBottom: 0,
  },
  card2: {
    marginTop: 10, 
    marginRight: 10, 
    marginLeft: 10,
    marginBottom: 10, 
  },
  cardTitle: {
    flex:0, 
    backgroundColor:'#b8fad4', 
    marginBottom:10,
  }
});