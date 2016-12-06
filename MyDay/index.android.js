'use strict';

var React = require('react');
var ReactNative = require('react-native');
var postPage = require('./postPage');

class MainScreen extends Component {
    render() {
    return (
      <Navigator
        initialRoute={{ title: 'Post Page', index: 0 }}
        renderScene={(route, navigator) =>
          <PostPage

            // Function to call when a new scene should be displayed
            onForward={() => {    
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }
}

ReactNative.AppRegistry.registerComponent('MyDay', function() { return MainScreen });