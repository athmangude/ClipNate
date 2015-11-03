'use strict';

var React = require('react-native');

var {
    View,
    Text,
    Image,
    Component,
    StyleSheet
} = React;

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>This is the app container</Text>
            </View>
        )
    }
}

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
module.exports = AppContainer;
