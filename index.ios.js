'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// Bring in the login Module
var Login = require('./Login');

var ClipNate = React.createClass({
    render: function() {

        if (this.state.isLoggedIn) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Logged In</Text>
                </View>
            )
        } else {
            return (
              <Login onLogin={this.onLogin}/>
            );
        }

    },

    getInitialState: function(){
        return({
            isLoggedIn: false
        });
    },

    onLogin: function() {
        this.setState({
            isLoggedIn: true
        })
    }



});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('ClipNate', () => ClipNate);
