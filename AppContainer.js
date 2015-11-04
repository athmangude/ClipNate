'use strict';

// require dependencies
var React = require('react-native');

var {
    View,
    Text,
    Image,
    Component,
    StyleSheet,
    TabBarIOS,
    NavigatorIOS
} = React;

var Feed = require('./Feed');

/**
 * holds layout and view components that display the app in the desired manner
 * @class AppContainer
 */
class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: "all_deals"
        }
    }

    /**
     * default render function for react component
     * @method render
     * @return {components} [a tree of components]
     */
    render() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="All Deals"
                    selected={this.state.selectedTab == "all_deals"}
                    icon={require('image!inbox')}
                    onPress={() => this.setState({selectedTab: 'all_deals'})}
                >
                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Feed,
                            title: 'Deals'
                        }} />
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

// stylesheet used by this component
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8ED',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = AppContainer;
