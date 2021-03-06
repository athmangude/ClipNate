'use strict';

// Bring in React Native
var React = require('react-native');

// Bringing in Required React Native eact components
var {
    View,
    Text,
    TextInput,
    Image,
    Component,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

/**
 * displays the login screen and what happens during the login process
 * @class Login
 */
class Login extends Component {
    /**
     * this function must run every time the class is initialized
     * @method constructor
     * @param  {props}    props default parameter for class initialization
     */
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        }
    }

    /**
     * defaulr render method for React Component
     * @method render
     */
    render() {

        var errorMessage = <View />

        if (!this.state.loggedIn && this.state.badCredentials) {
            errorMessage = <Text style={styles.error}>
                Invalid email and password combination
            </Text>
        }

        return (
            <View style={styles.container}>

                <Image
                    source={require('image!clipit_logo')}
                    style={styles.logo} />

                <Text style={styles.title}>
                    ClipNate
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="email"
                    onChangeText={(text) => this.setState({email: text})}
                />

                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry="true"
                    onChangeText={(text) => this.setState({password: text})}
                />

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onLoginPressed.bind(this)}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>

                {errorMessage}

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />

            </View>
        );
    }

    /**
     * handle the press event of the login button
     * @method onLoginPressed
     */
    onLoginPressed() {
        // show activity indicator
        // use email and password to initiate login process
        this.setState({showProgress: true});

        // Initiate login process
        var authenticationService = require('./AuthenticationService');

        console.log(this.state.email, this.state.password);

        authenticationService.login({
            email: this.state.email,
            password: this.state.password
        }, (results) => {
            console.log(this.state);
            this.setState(Object.assign({
                showProgress: false
            }, results));

            console.log(this.state);

            // call function to handle successful login if available
            if (results.loggedIn && this.props.onLogin) {
                this.props.onLogin();
            }

        });
    }

}

/**
 * stylesheet used by this module
 * @type {StyleSheet}
 */
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF8ED',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    logo: {
        height: 240,
        height: 180,
        borderRadius: 90
    },

    title: {
        fontSize: 20,
        marginBottom: 20,
        margin: 10,
        color: 'FF6137'
    },

    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderColor: '#FF890D',
        backgroundColor: 'white'
    },

    button: {
        backgroundColor: '#FF890D',
        height: 50,
        marginTop: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5
    },

    buttonText: {
        alignSelf: 'center',
        fontSize: 22,
        color: '#FFF'
    },

    loader: {
        marginTop: 30
    },

    error: {
        color: 'red',
        paddingTop: 10
    }
})

module.exports = Login;
