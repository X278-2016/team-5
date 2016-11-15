'use strict';

var React = require('react-native');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} = React;

var ReactProject = React.createClass({

    _onPressButtonGET: function() {
        fetch("http://10.66.69.254:8080/api/users", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData.search
            )
        })
        .done();
    },

    render: function() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._onPressButtonGET} style={styles.button}>
                    <Text>GET</Text>
                </TouchableHighlight>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    }
});

React.AppRegistry.registerComponent('MyDay', () => ReactProject);
