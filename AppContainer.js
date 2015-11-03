'use strict';

var React = require('react-native');

var {
    View,
    Text,
    Image,
    Component,
    StyleSheet,
    TabBarIOS
} = React;

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: "all_deals"
        }
    }

    render() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="All Deals"
                    selected={this.state.selectedTab == "all_deals"}
                    icon={require('image!inbox')}
                    onPress={() => this.setState({selectedTab: 'all_deals'})}
                >
                    <Text style={styles.welcome}>Feed</Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Around Me"
                    selected={this.state.selectedTab == "around_me"}
                    icon={require('image!search')}
                    onPress={() => this.setState({selectedTab: 'around_me'})}
                >
                    <Text style={styles.welcome}>Around Me</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
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
