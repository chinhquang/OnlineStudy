import React, {Component} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
export default class CustomButton extends Component {
    constructor(props){
      super(props)
    }
    render(){
        var title=this.props.text;
      return(  
        <TouchableOpacity
            onPress={this.props.onPress}
            style={this.props.style}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
      )
    }
}
