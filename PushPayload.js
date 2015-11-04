'use strict';

var React = require('react-native');

var {
    View,
    Text,
    Image,
    Component,
    ListView
} = React;

class PushPayload extends Component {

    constructor(props){
        super(props);

        var dataSource = new ListView.dataSource({
            rowHasChanged: (r1, r2) => r1 != r2;
        });

        this.state({
            dataSource: dataSource
        });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 20,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Text>Single deal</Text>
            </View>
        );
    }

}

module.exports = PushPayload;
