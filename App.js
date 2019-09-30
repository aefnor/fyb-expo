import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Main from './pages/main/Main'
import { DepthDataQuality } from 'expo/build/AR';

class App extends Component {
  LATITUDE_DELTA = 0.0025;
  LONGITUDE_DELTA = 0.0025;
  map = null;

  mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]

  constructor(props){
    super(props);
    this.state = {
      ready: false,
      userLocation: {},
      fontLoaded: false,
      toggle_maps: false,
      location: {lat: 0, long: 0}
    }

    this.toggleMap = this.toggleMap.bind(this);
    this.updateMaps = this.updateMaps.bind(this);
  }
  updateMaps(data){
    // console.log("Here")
    var item = data[Math.floor(Math.random()*data.length)];
    // console.log(item)
    this.setState ({
      location: {lat: item.geometry.location.lat, long: item.geometry.location.lng}
    },() => {console.log(this.state.location)})
  }

  toggleMap() {
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json
    // ?location=-33.8670522,151.1957362
    // &radius=1500
    // &type=restaurant
    // &keyword=cruise
    // &key=YOUR_API_KEY
    let data =  {
          location: '-33.8670522,151.1957362',
          radius: '1500',
          type: 'restaurant',
          keyword: '',
          key: 'AIzaSyApTmMUNSRvE8yEp8Q5sRWd8zVF0m6ryao'
    }
    // console.log('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+ data.location + '&radius=' + data.radius + '&type=' + data.type + '&keyword=' + data.keyword + '&key=' + data.key)
    let test = fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ data.location + '&radius=' + data.radius + '&type=' + data.type + '&keyword=' + data.keyword + '&key=' + data.key)
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log("Response", responseJson.results[0])
      this.updateMaps(responseJson.results);
      // return responseJson;
    })
    .catch((error) => {
      // console.error("Errored", error);
    });


    // test = fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     location: '33.8670522,151.1957362',
    //     radius: '1500',
    //     type: 'restaurant',
    //     keyword: '',
    //     key: 'AIzaSyApTmMUNSRvE8yEp8Q5sRWd8zVF0m6ryao'
    //   }),
    // });

    // console.log("Test", test)

    this.setState({
      toggle_maps: true,
    });
  }

  render(){
    return(
      <View style={styles.container}>
        {this.state.toggle_maps ? 
            <MapView
              provider="google"
              region={
              this.getMapRegion()
            }
              ref={ map => { this.map = map }}
              style={{height: '100%', width: '100%'}}
              customMapStyle={this.mapStyle}
              followsUserLocation={true}
              showsUserLocation={true} 
              loadingEnabled={true}
              //renderMarker={renderMarker}
              onMapReady={this.onMapReady}
              showsMyLocationButton={true}
            />
        :
        <Main handleToggle={this.toggleMap} title="FYB"/>
        }
      </View>
    )
  } 

  componentDidMount() {
    this.getCurrentPosition();
  }

  getMapRegion = () => ({
    latitude: this.state.userLocation.latitude ? this.state.location.lat : 1,
    longitude: this.state.userLocation.longitude ? this.state.location.long : 1,
    latitudeDelta: this.LATITUDE_DELTA,
    longitudeDelta: this.LONGITUDE_DELTA
  });

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.LATITUDE_DELTA,
            longitudeDelta: this.LONGITUDE_DELTA,
          };
            this.setRegion(region);
            this.state.userLocation = {
              latitude: position.coords.latitude, 
              longitude: position.coords.longitude 
            };
        },
        (error) => {
          console.log(error);
        }
      );
    } catch(e) {
      console.log(e);
    }
  };

  setRegion(region) {
    if(this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
  } 

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


