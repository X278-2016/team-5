'use strict';

var React = require('react');
var ReactNative = require('react-native');

class searchHome extends React.Component{

	constructor(props) {
	    super(props);
	    this.state = {
	      	user: "",
	        data: {}
	    };
  	}

	render() {
		<View style={styles.container}>
        	<Text style={styles.description}>
          	User Blood Sugar and Mood Log
        	</Text>
        	<Text style={styles.description}>
          	Enter Username and retreive previous Blood Sugar Entries.
        	</Text>
      	</View>
		<View style={styles.flowRight}>
  			<TextInput
    			style={styles.searchInput}
    			placeholder='Search via Username'/>
  			<TouchableHighlight style={styles.button}
      			underlayColor='#99d9f4'
      			onPress={this.onSearchPressed.bind(this)}>
    			<Text style={styles.buttonText}>Search</Text>
  			</TouchableHighlight>
		</View>
	}
}


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});