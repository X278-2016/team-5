

var React = require('react');
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
var ReactNative = require('react-native');
var SearchResults = require('./SearchResults');
var styles = ReactNative.StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
      },
      title: {
        marginBottom: 60,
        fontSize: 22,
        textAlign: 'center',
        color: '#666666'
      },
      container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
      },

      flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
      }
});

class searchUser extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          user: '',
          data: {},
          message: ''
      };
    }
  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ user: event.nativeEvent.text });
    console.log(this.state.searchString);
    }

  render() {
    
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Search Blood Glucose and Mood Log
        </Text>
        <Text style={styles.description}>
          Enter Username and retreive previous log entries.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.user}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Username'/>
            <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this._executeQuery.bind(this)}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }

  _executeQuery() {
    console.log("_executeQuery")
    fetch('http://127.0.0.1:8080/api/records')
        .then((response) => response.json())
        .then((json) => this._handleResponse(json))
        .catch(error =>
        this.setState({message:'we done failed'+error}));
  }

  _handleResponse(response) {
    console.log(response)
    var filtered = response.filter( (entry) => entry.user === this.state.user);
    console.log(filtered)
    filtered.sort(function(a, b) {
      return Date.parse(b.dateTime) - Date.parse(a.dateTime);
      });

    this.props.navigator.push({
      title: "Results",
      component: SearchResults,
      passProps: {entries: filtered}});
  }
}


module.exports = searchUser
