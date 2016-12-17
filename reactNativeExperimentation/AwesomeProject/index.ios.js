'use strict';

var React = require('react');
var ReactNative = require('react-native');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

class diabetesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "test",
        glucose: 5,
        time:'test',
        mood:'test',
        message:''
    };
    this._executeQuery()
  }
  render() {
    return <ReactNative.Text style={styles.text}>Message: {this.state.message}{"\n"}User: {this.state.user}{"\n"}Glucose: {this.state.glucose}{"\n"}Mood: {this.state.mood}{"\n"}Time: {this.state.time}</ReactNative.Text>;
  }

  _executeQuery() {
    fetch('http://10.66.81.216:8080/api/records/1')
        .then((response) => response.json())
  .then((json) => this.setState({
          message:json.id, user:json.user,glucose:json.glucoseLevel,mood:json.mood,time:json.dateTime
      }))
  .catch(error =>
    this.setState({message:'we done failed'+error}));
  }

  _handleResponse(response) {
    this.setState({message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.setState({message: response.listings})
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }
}

ReactNative.AppRegistry.registerComponent('AwesomeProject', function() { return diabetesApp });
