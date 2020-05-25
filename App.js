import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { Constants } from 'expo-constants';


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
    let powerX =   this.state.motionData.accelerationIncludingGravity.x * 10;
    console.log(powerX);
     this.setState({xlocation: powerX});
    });
  }

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }
  
  render() {
   
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


        <View 
          style={{
             backgroundColor: 'pink',
             padding: 70,
           
          }}
        >

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