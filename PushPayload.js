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

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: dataSource,
            pushEvent: props.pushEvent
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image
                    source={{uri: this.state.pushEvent.avatar_url}}
                    style={{
                        height: 300,
                        borderRadius: 5,
                        alignSelf: 'stretch'
                    }}
                />
            </View>
        );
    }

}

module.exports = PushPayload;
