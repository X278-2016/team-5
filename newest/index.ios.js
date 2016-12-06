'use strict';

var React = require('react');
var ReactNative = require('react-native');
var postPage = require('./postPage');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
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
			component: postPage
		});
	}

	render() {
	return (
	<View style={styles.container}>
	<TouchableHighlight style={styles.button}
                //onPress={this.onGetPressed.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Get</Text>
        </TouchableHighlight>
	<TouchableHighlight style={styles.button}
                onPress={this.onPostPressed.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Post</Text>
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
        }}/>
    );
  }
}


ReactNative.AppRegistry.registerComponent('diabetesAppV2', function() { return diabetesAppV2});