import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import { Subheader } from 'react-native-material-ui';
import { Card } from 'react-native-elements'; 
import { Item, Picker } from 'native-base';

import { DailyFoodStatistics } from "../components/DailyFoodStatistics";
import FoodCardFromStorage  from "../components/FoodCardFromStorage/FoodCardFromStorage";

class Food extends Component {

   constructor(props) {
        super(props);
        this.state = {
          storageData: '',
          fetching: 'true',
          weekday: 'monday',
          searchCategory: 'Food'
        };
        this._retrieveData(this.state.weekday);
        //this.handler = this.handler.bind(this)
   }
   

   /*handler(e) {
    e.preventDefault()
    this._removeData
   }*/

   _retrieveData(weekday) {
     console.log(weekday+this.state.searchCategory)
        try {
          AsyncStorage.getItem(weekday+this.state.searchCategory).then((value) => {
            console.log(value)
            this.setState({
              storageData: JSON.parse(value),
              fetching: false,
              weekday: weekday
            });
          });
        } catch (error) {
          console.log("Error retrieving data")
        }
   } 

   //TODO: this removes all data at the moment, change it so that it removes only the selected foods
   _removeData = () => {
      try {
        console.log(this.state.weekday+this.state.searchCategory)
        AsyncStorage.removeItem(this.state.weekday+this.state.searchCategory/* JSON.stringify(props)*/);
        this._retrieveData(this.state.weekday)
        return true;
      }
      catch(exception) {
        return false;
      }
   }

   render() {

    if (this.state.fetching === 'true') {
      return <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E6738" />
      </View>
    }
    if (this.state.storageData == null || this.state.storageData == ''){
      return (
        <View style={styles.container} >
          <View style={styles.subHeader} >
              <View style={styles.flex1}>
                <Subheader text="Select weekday" />
              </View>
              <View style={styles.flex2}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.weekday}
                  style={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) => {
                    this._retrieveData(itemValue)
                  }}>
                  <Picker.Item label="Monday" value="monday" />
                  <Picker.Item label="Tuesday" value="tuesday" />
                  <Picker.Item label="Wednesday" value="wednesday" />
                  <Picker.Item label="Thursday" value="thursday" />
                  <Picker.Item label="Friday" value="friday" />
                  <Picker.Item label="Saturday" value="saturday" />
                  <Picker.Item label="Sunday" value="sunday" />
                </Picker>
              </View>
          </View>
          <Subheader text="No results..." />
        </View >
      );
    }
    return (
      <ScrollView style={{flex:1, flexDirection: "column", justifyContent: "flex-start"}}> 
          <View style={styles.subHeader} >
            <View style={styles.flex1}>
              <Subheader text="Select weekday: " />
            </View>
            <View style={styles.flex2}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.weekday}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => {
                  this._retrieveData(itemValue)
                }}>
                <Picker.Item label="Monday" value="monday" />
                <Picker.Item label="Tuesday" value="tuesday" />
                <Picker.Item label="Wednesday" value="wednesday" />
                <Picker.Item label="Thursday" value="thursday" />
                <Picker.Item label="Friday" value="friday" />
                <Picker.Item label="Saturday" value="saturday" />
                <Picker.Item label="Sunday" value="sunday" />
              </Picker>
            </View>
          </View>
          <DailyFoodStatistics props={this.state.storageData} weekday={this.state.weekday} ></DailyFoodStatistics>
          {
            this.state.storageData.map(( obj ) => {
              //console.log(obj);
                return ( 
                  <FoodCardFromStorage props={obj} weekday={this.state.weekday} removeData={this._removeData}></FoodCardFromStorage>
                );
            })
          }
          
      </ScrollView>
    );
  }
}

export default Food;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  subHeader: {
    flexDirection: "row",
    flex: 1
  },
  flex1: {
    flex: 0.5
  },
  flex2: {
    flex: 0.5
  }
});