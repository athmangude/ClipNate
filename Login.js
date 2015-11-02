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
        backgroundColor: 'F5FCFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    title: {
        fontSize: 20,
        marginBottom: 20
    },

    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderColor: '48BBEC'
    },

    button: {
        backgroundColor: '48BBEC',
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
