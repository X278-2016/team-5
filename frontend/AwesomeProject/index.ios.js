'use strict';

var React = require('react');
var ReactNative = require('react-native');
import {
    Alert,  
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    AppRegistry
} from 'react-native';
var postPage = require('./postPage');
var searchUser = require('./searchUser')

var styles = ReactNative.StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
    fontFamily: "Verdana"
  },
  container: {
    flex: 1,
    padding: 10
  },
  button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 8,
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
   buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    }
});

class MainPage extends React.Component {
  onPostPressed(event) {
    this.props.navigator.push({
      title: 'Post Record',
      component: postPage,
      navigationBarHidden: false
    });
  }

  onGetPressed(event){
    this.props.navigator.push({
      title: 'Search',
      component: searchUser,
      navigationBarHidden: false
    })
  }

  render() {
  return (
  <View style={styles.container}>
  <Text style={styles.title}> Welcome to My Day </Text>
  <TouchableHighlight style={styles.button}
                onPress={this.onGetPressed.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>View Your Entry Log</Text>
        </TouchableHighlight>
  <TouchableHighlight style={styles.button}
                onPress={this.onPostPressed.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>New Log Entry</Text>
        </TouchableHighlight>
  </View>
  );
  }
}

  

class diabetesAppV2 extends React.Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'My Day',
          component: MainPage,
          navigationBarHidden: true
        }}/>
    );
  }
}


ReactNative.AppRegistry.registerComponent('AwesomeProject', function() { return diabetesAppV2});