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
                paddingTop: 65,
                justifyContent: 'flex-start',
                // alignItems: 'center'
            }}>
                <Image
                    source={{uri: this.state.pushEvent.avatar_url}}
                    style={{
                        height: 300,
                        alignSelf: 'stretch'
                    }}
                />

                <Text
                    style={{
                        color: 'white',
                        backgroundColor: '#FF890D',
                        marginTop: -20,
                        alignSelf: 'flex-start',
                        marginLeft: 3
                    }}>{this.state.pushEvent.merchant_name}</Text>
                <Text style={{
                    color: 'white',
                    backgroundColor: 'black',
                    alignSelf: 'flex-end',
                    marginTop: -17,
                    marginRight: 3
                }}>Save {this.state.pushEvent.commission_rate}{this.state.pushEvent.commission_description}</Text>
                <Text style={{
                    marginTop: 30,
                    marginRight: 5,
                    marginLeft: 5
                }}>{this.state.pushEvent.summary}</Text>
            </View>
        );
    }

}

module.exports = PushPayload;
