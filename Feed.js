'user strict';

// Bringing in React Native
var React = require('react-native');

// Bringing in useful components
var {
    Component,
    Text,
    View,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight
} = React;

var Geolib = require('geolib');
var PushPayload = require('./PushPayload');

/**
 * Handles fetching of deals from the api and displaying them
 * @class Feed
 */
class Feed extends Component {
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]), // declaring the dataset
            showProgress: true // show the activity indicator?
        };
    }

    /**
     * run this function to do something after the component has successfully been mounted on the UI
     * @method componentDidMount
     */
    componentDidMount() {
        this.fetchFeed();
    }

    /**
     * fetch deals from the Shopnate API
     * @method fetchFeed
     */
    fetchFeed() {
        fetch('http://apitest.shopnate.com.au/stores/resources')
        .then((response) => response.json())
        .then((responseData) => {
            // console.log(responseData.retail_stores);

            var storesWithCoordinates = [];

            // TODO =!> Get the user's current location
            var currentLocation = { latitude: -37.8152041, longitude: 144.9604138 };
            for (var store of responseData.retail_stores) {

                // generate random locations around Melbourne
                var storeLocation = {
                    latitude: this.getRandomArbitrary(-37.877900, -37.773704),
                    longitude: this.getRandomArbitrary(144.838521, 145.069492)
                }

                // calculate the distance of store from current location
                var distance = {
                    distance: this.getGeospartialDistance(currentLocation, storeLocation)
                }

                store = Object.assign(storeLocation, distance, store);
                storesWithCoordinates.push(store);
            }

            // sort stores according to distance from user
            var sortedCoordinatesArray = Geolib.orderByDistance(currentLocation, storesWithCoordinates);

            sortedStoresByDistance = [];

            for (var coordinateObj of sortedCoordinatesArray) {
                coordinateObj = Object.assign(coordinateObj, storesWithCoordinates[parseInt(coordinateObj.key)]);
                sortedStoresByDistance.push(coordinateObj);
            }

            console.log(sortedStoresByDistance);

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(sortedStoresByDistance),
                showProgress: false
            });
        });
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    getGeospartialDistance(start, end) {
        // return Geolib.getDistance(start, end);
        return Geolib.getDistance(
            // start,
            // {latitude: Geolib.decimal2sexagesimal(end.latitude), longitude: geolib.decimal2sexagesimal(end.longitude)}
            start, end
        );
    }

    pressRow(rowData) {
        console.log(rowData);
        this.props.navigator.push({
            title: "Deal",
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        })
    }

    /**
     * [renderRow description]
     * @method renderRow
     * @param  {object}  rowData [render a deal given its data]
     * @return {components}          [a tree of components to display the deal as desired]
     */
    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.pressRow(rowData)}
                underlayColor="#DDD"
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1
                }}>
                    <Image
                        source={{uri: rowData.avatar_url}}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 5
                        }}
                    />
                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text style={{fontWeight: 'bold'}}>{rowData.merchant_name}</Text>
                        <Text>{rowData.category}</Text>
                        <Text>Save {rowData.commission_rate}{rowData.commission_description}</Text>
                        <Text></Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * default render method for a component
     * @method render
     * @return {[components]} [a tree of components depending on the state]
     */
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
                justifyContent: 'flex-start',
                paddingTop: 60
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
