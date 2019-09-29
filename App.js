import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Main from './pages/main/Main'

class App extends Component {
  LATITUDE_DELTA = 0.0025;
  LONGITUDE_DELTA = 0.0025;
  map = null;

  constructor(props){
    super(props);
    this.state = {
      ready: false,
      userLocation: {},
      fontLoaded: false,
      toggle_maps: false,
    }

    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap() {
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
    latitude: this.state.userLocation.latitude ? this.state.userLocation.latitude : 1,
    longitude: this.state.userLocation.longitude ? this.state.userLocation.longitude : 1,
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


