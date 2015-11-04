'user strict';

// Bringing in React Native
var React = require('react-native');

// Bringing in useful components
var {
    Component,
    Text,
    View,
    ListView,
    ActivityIndicatorIOS
} = React;

class Feed extends Component {
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            showProgress: true
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        fetch('http://apitest.shopnate.com.au/stores/resources')
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.retail_stores);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.retail_stores),
                showProgress: false
            });
            console.log(responseData.retail_stores)
        });
    }

    renderRow(rowData) {
        return <Text style={{
                color: '#333',
                backgroundColor: '#FFF',
                alignSelf: 'center'
            }}>
                {rowData.merchant_name}
            </Text>
    }

    render() {

        if(this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicatorIOS style={{
                        alignSelf: 'center'
                    }}
                        size="large"
                        animating={true} />
                </View>
            );
        }

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start'
            }}
            >
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} >
                </ListView>
            </View>
        );
    }
}

module.exports = Feed;
