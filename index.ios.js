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
var AppContainer = require('./AppContainer');

/**
 * The main app component
 * @class ClipNate
 */
var ClipNate = React.createClass({

    /**
     * Run this function to do things after the component has been rendered on the UI
     * @method componentDidMount
     */
    componentDidMount: function() {
        AuthenticationService.getAuthenticationInfo((error, authInfo) => {
            this.setState({
                checkingAuth: false,
                isLoggedIn: authInfo != null
            });
        });
    },

    /**
     * default render method for React component
     * @method function
     * @return {components} [a tree of component to be displayed depending on the current state]
     */
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
                <AppContainer />
            )
        } else {
            return (
              <Login onLogin={this.onLogin}/>
            );
        }

    },

    /**
     * set default states for components
     * @method getInitialState
     * @return {object} object of default states
     */
    getInitialState: function(){
        return({
            isLoggedIn: false,
            checkingAuth: true
        });
    },

    /**
     * handles what happens after the user has logged in
     * @method onLogin
     */
    onLogin: function() {
        this.setState({
            isLoggedIn: true
        })
    }
});

/**
 * styles used by this Component
 */
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
