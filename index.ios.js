'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

// Bring in the login Module
var Login = require('./Login');
var AuthenticationService = require('./AuthenticationService');

var ClipNate = React.createClass({
    componentDidMount: function() {
        AuthenticationService.getAuthenticationInfo((error, authInfo) => {
            this.setState({
                checkingAuth: false,
                isLoggedIn: authInfo != null
            });
        });
    },

    render: function() {

        if (this.state.checkingAuth) {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        style={styles.loader}
                        size="large"
                        animating="true" />
                </View>
            )
        }

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
            isLoggedIn: false,
            checkingAuth: true
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
