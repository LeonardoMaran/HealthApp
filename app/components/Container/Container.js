import React from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { StyleSheet } from 'react-native';

import style from "./styles";

const Container = ({ children }) => {

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

Container.propTypes = {
  children: PropTypes.any
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});