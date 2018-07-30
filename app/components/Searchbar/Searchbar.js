import React from "react";
import PropTypes from "prop-types";
import { SearchBar } from 'react-native-elements'

import styles from "./styles";


const Searchbar = ({ props, searchCategory, screenName }) => {

  const onEnd = (searchtext) => {
    props.navigate(screenName, {searchText: searchtext, searchCategory: searchCategory})
  }
  
  return (
    <SearchBar
    clearIcon={{ color: 'grey' }}
    inputStyle={{backgroundColor: 'white'}}
    lightTheme
    searchIcon={{ size: 24 }}
    placeholder='Search' 
    returnKeyType='go'
    onSubmitEditing={(searchtext) => onEnd(searchtext.nativeEvent.text)}/>
  );
};

Searchbar.propTypes = {
  props: PropTypes.any,
  searchCategory: PropTypes.string,
  screenName: PropTypes.string
};

export default Searchbar;