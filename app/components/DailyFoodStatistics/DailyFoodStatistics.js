import React from "react";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Subheader } from 'react-native-material-ui';
import PieChart from 'react-native-pie-chart';


let macros = []

const countSum = (value) => {
  let sumFat = 0;
  let sumCarb = 0;
  let sumProt = 0;
  let sumCal= 0;
  value.map(( obj ) => {
      sumFat += obj.nf_total_fat,
      sumCarb += obj.nf_total_carbohydrate,
      sumProt += obj.nf_protein,
      sumCal += obj.nf_calories
  })
  macros = [sumFat, sumCarb, sumProt, sumCal]
}

const DailyFoodStatistics = ({ props, weekday }) => {
  
  countSum(props)

  const chart_wh = 120
  const nutrients = [macros[0], macros[1], macros[2]]
  const sliceColor = ['#41e492', '#f4be2a', '#2196F3']

  return (
    <Card style={styles.container} >
      <View style={styles.row} >
          <View style={styles.box1}>
            <Subheader text="Total" />
            <Text style={[styles.text, {color: 'black'}]}>{Math.round(macros[3] * 100) / 100} Kcal</Text>
          </View>
          <View style={styles.box2}>
            <PieChart
              chart_wh={chart_wh}
              series={nutrients}
              sliceColor={sliceColor}
            />
          </View>
      </View>
      <View style={styles.row}>
          <View style={styles.boxColumn}>
            <Subheader text="Fat" />
            <Text style={[styles.text, styles.fat]}>{Math.round(macros[0] * 100) / 100} g</Text>
          </View>
          <View style={styles.boxColumn}>
            <Subheader text="Carbohydrate" />
            <Text style={[styles.text, styles.carb]}>{Math.round(macros[1] * 100) / 100} g</Text>
          </View>
          <View style={styles.boxColumn}>
            <Subheader text="Protein" />
            <Text style={[styles.text, styles.protein]}>{Math.round(macros[2] * 100) / 100} g</Text>
          </View>
      </View>
    </Card>
  );
};

DailyFoodStatistics.propTypes = {
  props: PropTypes.any,
  weekday: PropTypes.string
};

export default DailyFoodStatistics;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-end",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-end",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  box1: {
    flex: 0.6,
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingBottom: 14,
    marginTop: 20,
  },
  box2: {
    flex: 0.4,
    marginRight: 16,
    marginTop: 16,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "space-around",
    justifyContent: "flex-start",
    marginBottom: 14,
    marginRight: 14,
    flexWrap: "wrap"
  },
  boxColumn: {
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingBottom: 14
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 16,
  },
  protein: {
    color:'#2196F3'
  },
  carb: {
    color:'#f4be2a'
  },
  fat: {
    color:'#41e492'
  }
});