'use strict';

import React, { Component } from 'react'
import {
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
        marginTop: 10,
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
    image: {
        width: 250,
        height: 300
    }
});

function postToJHipster(username, glucose, date, mood1) {
    var data = {
        user: username,
        glucoseLevel: glucose,
        dateTime: date,
        mood: mood1
    }

    return 'ayy'
};

class postPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            glucoseLevel: '',
            mood: '',
            dateTime: '',
            isLoading: false
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

    _executeQuery(query) {
        console.log(query);
        this.setState({ isLoading: true });
    }

    onPostPressed() {
        var query = postToJHipster(this.state.userName, this.state.glucoseLevel,this.state.dateTime,this.state.mood);
        this._executeQuery(query);
    }

    render() {
        var spinner = this.state.isLoading ?
        ( <ActivityIndicator
            size='large'/> ) :
        ( <View/>);
        console.log('SearchPage.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Upload your blood sugar numbers!
                </Text>
                <Text style={styles.description}>
                    Enter your username, glocuse level, date and time, and mood (optional).
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
            <Image source={require('./Resources/meterImage.png')} style={styles.image}/>
            {spinner}
            </View>
    );
    }
}

module.exports = postPage;