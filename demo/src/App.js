import React, {Component} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
import MatLocator from 'react-mui-geolocator';
// import for use with developing component from copy of source.
// import MatLocator from './lib/MatGeolocator';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

class Demo extends Component {
  state = {
    viewport: {
      width: window.innerWidth || 400,
      height: window.innerHeight || 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  _handleGeocoderSelect = (result) => {
    const viewport = {
      ...this.state.viewport,
      longitude: result.center[0],
      latitude: result.center[1],
      zoom: 18,
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    };
    this._onViewportChange(viewport);
  };

  _onViewportChange = (viewport) => {
    this.setState({viewport});
  };

  render() {
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={this._onViewportChange}
        >
          <div className="navControls">
            <NavigationControl onViewportChange={this._onViewportChange} />
          </div>

          <div className="geolocator">
            <MatGeolocator />
          </div>
        </MapGL>
      </div>
    );
  }
}

export default Demo;
