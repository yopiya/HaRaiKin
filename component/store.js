import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

class Store extends Component {
  render() {
    return (
      <TouchableOpacity style={{
        height: 190,
        width: 130,
        marginLeft: 20,
        borderRadius: 20,
        borderColor: '#dddddd',
        padding: 0,
        
      }}>
          <View style={{flex: 2,}}>
            <Image source={this.props.ImageUri}
              style={{
                flex: 1,
                width: null,
                height: null,
                
                resizeMode: 'cover',
              }} />
        </View>
              <View style={{backgroundColor: 'white',height: 50,justifyContent: 'center',}}>
                <Text style={{ color: 'black', backgroundColor: 'white', textAlign: 'center' }}>{this.props.name}</Text>

              </View>
      </TouchableOpacity>
    )

  }
}

export default Store;