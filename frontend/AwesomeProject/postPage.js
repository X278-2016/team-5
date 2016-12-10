'use strict';

import React, { Component } from 'react'
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

var styles = StyleSheet.create({
    description: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: -5,
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
    usernameInput: {
        height: 36,
        padding: 4,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        marginBottom: 10,
        color: '#48BBEC'
    },
    glucoseInput: {
        height: 36,
        padding: 4,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        marginBottom: 10,
        color: '#48BBEC'
    },
    dateInput: {
        height: 36,
        padding: 4,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        marginBottom: 10,
        color: '#48BBEC'
    },
    moodInput: {
        height: 36,
        padding: 4,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        marginBottom: 10,
        color: '#48BBEC'
    },
    locationInput: {
        height: 36,
        padding: 4,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        marginBottom: 10,
        color: '#48BBEC'
    },
    image: {
        width: 250,
        height: 300
    }
});

class postPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            glucoseLevel: '',
            mood: '',
            dateTime: '',
            isLoading: false,
	    location: ''
        };
    }
    onUsernameTextChanged(event) {
        console.log('onUsernameTextChanged');
        this.setState({ userName: event.nativeEvent.text });
        console.log(this.state.userName);
    }

    onGlucoseTextChanged(event) {
        console.log('onGlucoseTextChanged');
        this.setState({ glucoseLevel: event.nativeEvent.text });
        console.log(this.state.glucoseLevel);
    }

    onDateTextChanged(event) {
        console.log('onDateTextChanged');
        this.setState({ dateTime: event.nativeEvent.text });
        console.log(this.state.dateTime);
    }

    onMoodTextChanged(event) {
        console.log('onMoodTextChanged');
        this.setState({ mood: event.nativeEvent.text });
        console.log(this.state.mood);
    }

    onLocationTextChanged(event) {
        console.log('onLocationTextChanged');
        this.setState({ location: event.nativeEvent.text });
        console.log(this.state.location);
    }

    onPostPressed() {
        fetch("http://127.0.0.1:8080/api/records", {
	method: "POST", 
	headers: {'Content-Type':'application/json'}, 
	body: JSON.stringify({
		"user":this.state.userName, 
		"glucoseLevel":this.state.glucoseLevel, 
		"mood": this.state.mood, 
		"dateTime": this.state.dateTime, 
		"location": this.state.location})})
    .then(function(response) {
    if(response.status == 201) {
    	Alert.alert("Result", "Posted your record!")
    } else {
	Alert.alert("Result", "Invalid data, please try again!")
    }
    }).done();
    }

    render() {
        console.log('SearchPage.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    {'\n\n'}Enter your username, glocuse level, date and time, location, and mood (optional).
                </Text>
                <Text style={styles.description}>
                    The date should be in the following format: 2016-05-14T05:05:05.777Z
                </Text>
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.usernameInput}
                    value={this.state.userName}
                    onChange={this.onUsernameTextChanged.bind(this)}
                    placeholder='Enter your username'/>
            </View>
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.glucoseInput}
                    value={this.state.glucoseLevel}
                    onChange={this.onGlucoseTextChanged.bind(this)}
                    placeholder='Enter your glucose level'/>
            </View>
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.dateInput}
                    value={this.state.dateTime}
                    onChange={this.onDateTextChanged.bind(this)}
                    placeholder='Enter the date and time of testing'/>
            </View>
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.locationInput}
                    value={this.state.location}
                    onChange={this.onLocationTextChanged.bind(this)}
                    placeholder='Enter your location at the time of testing'/>
            </View>		
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.moodInput}
                    value={this.state.mood}
                    onChange={this.onMoodTextChanged.bind(this)}
                    placeholder='Enter your mood at the time of testing'/>
            </View>
            <TouchableHighlight style={styles.button}
                onPress={this.onPostPressed.bind(this)}
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableHighlight>
            
            </View>
    );
    }
}

module.exports = postPage;