import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { Constants } from 'expo-constants';
import {BoxShadow} from 'react-native-shadow'
import Box from './components/Box';
import Slider from 'react-native-slider';

export default class App extends Component {
  
  state = {
    motionData: []
  };
  
  componentDidMount() {
    this.toggleSubscription()
  }
  
  componentWillUnmount() {
    this.unsubscribe()
  }
  
  toggleSubscription = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }
  
  subscribe = () => {
    this.subscription = DeviceMotion.addListener(motionData => {
      this.setState({ motionData });
     // console.log(motionData)
     // console.log(this.state.motionData.accelerationIncludingGravity.x);
    //  this.setState({xlocation: this.state.motionData.accelerationIncludingGravity.x})
    let powerX =   this.state.motionData.accelerationIncludingGravity.x * 4;
//    console.log(powerX);
     this.setState({xlocation: powerX});

     let powerY =   this.state.motionData.accelerationIncludingGravity.y * 4 ;
    // console.log(powerY);
      this.setState({ylocation: powerY});
    });
  }

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }
  
  render() {
    const shadowOpt = {
      width:140,
      height:150,
      color:"#000",
      border:4,
      radius:3,
      opacity:0.1,
      x: this.state.xlocation,
      y:this.state.powerY,
      style:{marginVertical:5}
  }
   
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.motionData.accelerationIncludingGravity)}</Text>
        <View 
          style={{  
              margin: 10,
              backgroundColor: 'red',
              // padding: this.state.xlocation 
               }}>
          <Text>{this.state.xlocation}</Text>
        </View>
        <View style={{ marginTop: '10%'}}>
        <BoxShadow setting={shadowOpt}>
               <Box />
        </BoxShadow>
        </View>
        <View style={{ marginTop: 50}}>
        <Slider
          value={this.state.value}
          onValueChange={(value) => this.setState({value})} 
          
          />
        <Text>Value: {this.state.value}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    paddingTop: 80,
    
  },
 
});