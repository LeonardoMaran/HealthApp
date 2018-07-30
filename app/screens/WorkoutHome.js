import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Form, Item, Input, Label, List, ListItem, Separator, Icon, Picker, Button } from 'native-base';
import PropTypes from "prop-types";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import { Container } from "../components/Container";
import { Searchbar } from "../components/Searchbar";


class Home extends Component {
  
   constructor(props) {
     super(props);
     this.state = {
       gender: undefined,
       age: '',
       weight: '',
       height: '',
       workoutName: '',
       touched: {
        workoutName: false,
        age: false,
        weight: false,
        height: false,
       },
     };
   }
   
   onValueChange2(value) {
     this.setState({
       gender: value
     });
   }

   clearInput = () => {
      this.setState({ workoutName: '' });
   }

   searchWorkout(workoutName, age, weight, height) {
      if (workoutName==null || workoutName=='' || age==null || age =='' || weight==null || weight=='' || height==null || height=='') {
        Alert.alert(`Type in the missing information first!`)
      }
      else {
        this.props.navigation.navigate('Searchresults',{searchText: workoutName, searchCategory: 'Workout', age: age, weight: weight, height: height, gender: this.state.gender})
      }
   }

   validate(workoutName, age, height, weight) {
    // true means invalid, so the conditions got reversed
     return {
       workoutName: workoutName.length === 0,
       age: age.length === 0,
       height: height.length === 0,
       weight: weight.length === 0,
     };
   }

   handleBlur = (field) => (evt) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
   }

   render() {
    const errors = this.validate(this.state.workoutName, this.state.age, this.state.height, this.state.weight);
    console.log(errors)
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      // if the field has error, it returns shouldshow value, otherwise it returns false
      return hasError ? shouldShow : false;
    };

    const { navigate } = this.props.navigation;

    return (
      <Container>
          {/*Searchbar props={this.props.navigation} searchCategory='Workout' screenName={"Searchresults"} />*/}
          <Item style={styles.workoutInput}>
            <Icon type="MaterialCommunityIcons" name='dumbbell' style={styles.icon} />
            <Input 
              style={shouldMarkError('workoutName') ? styles.error : ""}
              placeholder='Workout name' 
              value={this.state.workoutName} 
              onChangeText={(workoutName) => this.setState({workoutName})} 
              onBlur={this.handleBlur('workoutName')}/>
            <Icon type="MaterialCommunityIcons" name='close' style={{paddingRight:10, paddingLeft:6 }} onPress={()=> this.clearInput()} />
          </Item>
          <View style={styles.flexColumn}>
            <View style={styles.flexRow}>
              <Item style={styles.ageInput}>
                <Icon type="MaterialCommunityIcons" name='numeric' style={styles.icon} />
                <Input 
                  style={shouldMarkError('age') ? styles.error : ""}
                  placeholder='Age' 
                  value={this.state.age}
                  keyboardType='numeric' 
                  onChangeText={(age) => this.setState({age})}
                  onBlur={this.handleBlur('age')}/>
              </Item>
              <Item picker style={styles.pickerItem}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined, marginRight:8 }}
                  placeholder="Select gender"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.gender}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </Item>
            </View>
            <View style={styles.flexRow}>
              <Item style={styles.weightInput}>
                <Icon type="MaterialCommunityIcons" name='weight-kilogram' style={styles.icon} />
                <Input 
                  style={shouldMarkError('weight') ? styles.error : ""}
                  placeholder='Weight (kg)' 
                  value={this.state.weight}
                  keyboardType = 'numeric' 
                  onChangeText={(weight) => this.setState({weight})}
                  onBlur={this.handleBlur('weight')}/>
              </Item>
              <Item style={styles.heightInput}>
                <Icon type="FontAwesome" name='long-arrow-up' style={styles.icon}/>
                <Input 
                  style={shouldMarkError('height') ? styles.error : ""}
                  placeholder='Height (cm)' 
                  value={this.state.height}
                  keyboardType = 'numeric' 
                  onChangeText={(height) => this.setState({height})}
                  onBlur={this.handleBlur('height')}/>
              </Item>
            </View>
          </View>
          <TouchableOpacity
              disabled={false}
              style={styles.addButton}
              onPress={() => this.searchWorkout(this.state.workoutName, this.state.age, this.state.weight, this.state.height)}
              underlayColor='#fff'>
              <View style={{flexDirection:'row', justifyContent:'center'}}>
                  <Icon type="FontAwesome" name='search' style={{fontSize: 20, 
    color: 'white'}}/>
                  <Text style={styles.addButtonText}>SEARCH</Text>
              </View>
          </TouchableOpacity>
          <Card style={styles.card}>
            <CardTitle 
              subtitle="How?"
              style={styles.cardTitle}
            />
            <CardContent text={`Search a workout in the Search field:\nRunning (this will give duration of 30 minutes)\nOr a whole, more detailed sentence:\nI ran 2 hours.\nSearching a workout will give the estimate calories burned during that workout.`} />
          </Card>
          {/*<Card style={styles.card2}>
            <CardTitle
              subtitle="Search Example"
              style={styles.cardTitle}
            />
            <CardContent style={{}} text={`Simply write a workout name to the Search field (this will give defauly duration of 30 minutes):\nRunning\nOr a whole, more detailed sentence:\nI ran 2 hours. Search the workouts that you have performed or are going to perform. Get the estimate amount of calories burned during your workout performance. Add this to your Workout page and keep track of your calories in vs. calories out.`} />
          </Card>*/}
      </Container>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  card: {
    marginTop: 10, 
    marginRight: 10, 
    marginLeft: 10,
    marginBottom: 10, 
  },
  cardTitle: {
    flex:0, 
    backgroundColor:'#b8fad4', 
    marginBottom:10,
  },
  icon:{
    marginLeft:10, 
    fontSize: 20, 
    color: 'green'
  },
  flexColumn:{
    flex: 0.5, 
    flexDirection: 'column',
  },
  flexRow:{
    flex: 1, 
    flexDirection: 'row',
  },
  workoutInput:{
    backgroundColor:'white', 
    marginTop:8, 
    marginBottom:8,
  },
  ageInput:{
    flex:0.5, 
    backgroundColor:'white', 
    marginBottom:8, 
    marginRight:4,
    height:50,
  },
  pickerItem:{
    flex:0.5, 
    backgroundColor:'white', 
    marginBottom:8,
    height:50,
  },
  weightInput:{
    flex:0.5, 
    backgroundColor:'white', 
    marginRight:4,
    height:50
  },
  heightInput:{
    flex:0.5, 
    backgroundColor:'white', 
    height:50,
    marginLeft:0
  },
  addButton:{
      marginRight:10,
      marginLeft:10,
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: 'green'
  },
  addButtonText:{
      color:'white',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
      fontWeight: 'bold'
  },
  error: {
    borderBottomWidth: 2,
    borderColor: 'red'
  },
});