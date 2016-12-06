'use strict';

import React, { Component } from 'react'
import {
} from 'react-native';

const styles = StyleSheet.create({
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

export default styles