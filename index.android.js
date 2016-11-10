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
      message: ''
    };
    this._executeQuery('http://localhost:8080/api/')
  }
  render() {
    return <ReactNative.Text style={styles.text}>{this.state.message}</ReactNative.Text>;
  }

  _executeQuery(query) {
    console.log(query);
    fetch(query)
        .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
    this.setState({
      message: 'Something bad happened ' + error
    }));
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

ReactNative.AppRegistry.registerComponent('diabetesApp', function() { return diabetesApp });
