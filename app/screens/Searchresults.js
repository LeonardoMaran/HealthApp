import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView /*Picker*/
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Subheader } from "react-native-material-ui";
import { Item, Picker } from "native-base";

import { Card } from "react-native-elements";

import { Container } from "../components/Container";
import { Foodcard } from "../components/Foodcard";
import { Workoutcard } from "../components/Workoutcard";

//const ApiID="";
//const ApiKey="";

function getFoodSearchResult(searchText) {
  return fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-app-id": "MY_APP_ID_HERE", //nutritionix API id here
      "x-app-key": "MY_APP_KEY_HERE", //nutritionix API key here
      "x-remote-user-id": "0"
    },
    body: JSON.stringify({
      query: searchText
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}

function getWorkoutSearchResult(searchText, gender, weight, height, age) {
  return fetch("https://trackapi.nutritionix.com/v2/natural/exercise", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-app-id": "MY_APP_ID_HERE", //nutritionix API id here
      "x-app-key": "MY_APP_KEY_HERE", //nutritionix API key here
      "x-remote-user-id": "0"
    },
    body: JSON.stringify({
      query: searchText,
      gender: gender,
      weight_kg: weight,
      height_cm: height,
      age: age
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}

class Searchresults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      loading: "true",
      weekday: "monday"
    };
  }

  componentDidMount() {
    if (this.props.navigation.state.params.searchCategory == "Food") {
      getFoodSearchResult(this.props.navigation.state.params.searchText).then(
        result =>
          this.setState({
            searchResult: result.foods,
            loading: false
          })
      );
    }
    if (this.props.navigation.state.params.searchCategory == "Workout") {
      getWorkoutSearchResult(
        this.props.navigation.state.params.searchText,
        this.props.navigation.state.params.gender,
        this.props.navigation.state.params.weight,
        this.props.navigation.state.params.height,
        this.props.navigation.state.params.age
      ).then(result =>
        this.setState({
          searchResult: result.exercises,
          loading: false
        })
      );
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Search results`,
    headerRight: (
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate(navigation.state.params.searchCategory);
        }}
        underlayColor="#fff"
      >
        <Text style={styles.addButtonText}>MY DAILY</Text>
      </TouchableOpacity>
    )
    //headerStyle: { backgroundColor: 'red' },
  });

  render() {
    if (this.state.loading === "true") {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#1E6738" />
        </View>
      );
    }
    if (this.state.searchResult == null || this.state.searchResult == "") {
      return (
        <Subheader
          text={`No results for: ${
            this.props.navigation.state.params.searchText
          }`}
        />
      );
    }
    return (
      <ScrollView>
        <View style={styles.subHeader}>
          <View style={styles.flex1}>
            <Subheader
              text="Select weekday: " /*this.props.navigation.state.params.searchText*/
            />
          </View>
          <View style={styles.flex2}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.weekday}
              style={{ height: 50 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ weekday: itemValue })
              }
            >
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
        {this.state.searchResult.map(obj => {
          console.log(obj);
          if (this.props.navigation.state.params.searchCategory == "Food") {
            return (
              <Foodcard
                props={obj}
                weekday={this.state.weekday}
                searchCategory={
                  this.props.navigation.state.params.searchCategory
                }
              />
            );
          }
          if (this.props.navigation.state.params.searchCategory == "Workout") {
            return (
              <Workoutcard
                props={obj}
                weekday={this.state.weekday}
                searchCategory={
                  this.props.navigation.state.params.searchCategory
                }
              />
            );
          }
        })}
        {console.log(this.state.searchResult)}
      </ScrollView>
    );
  }
}

export default Searchresults;

const styles = StyleSheet.create({
  addButton: {
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold"
  },
  subHeader: {
    flexDirection: "row",
    flex: 1
  },
  flex1: {
    flex: 0.6
  },
  flex2: {
    flex: 0.4
  }
});
