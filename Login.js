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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    source={require('image!clipit_logo')}
                    style={styles.image} />

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

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />

            </View>
        );
    }

    onLoginPressed() {
        // show activity indicator
        // initiate login process
        this.setState({showProgress: true});
    }

}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'FFF8ED',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    logo: {
        height: 120,
        height: 120
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
        borderColor: 'FF890D',
        backgroundColor: 'white'
    },

    button: {
        backgroundColor: 'FF890D',
        height: 50,
        marginTop: 20,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    buttonText: {
        alignSelf: 'center',
        fontSize: 22,
        color: 'FFF'
    },

    loader: {
        marginTop: 30
    }
})

module.exports = Login;