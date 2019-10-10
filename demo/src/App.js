import React, {useState, useCallback} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
import MatLocator from 'react-mui-geolocator';
// import for use with developing component from copy of source.
// import MatLocator from './lib/MatGeolocator';
// import MatLocator from './lib/index.es';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

const Demo = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth || 400,
    height: window.innerHeight || 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const _onViewportChange = useCallback((vwpt) => {
    setViewport(vwpt);
  }, []);

  const _handleGeocoderSelect = useCallback(
    async ({latitude, longitude}) => {
      const newViewport = {
        ...viewport,
        longitude,
        latitude,
        zoom: 18,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      };
      _onViewportChange({...newViewport});
    },
    [_onViewportChange, viewport]
  );

  return (
    <div className="App">
      <MapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={_onViewportChange}
      >
        <div className="navControls">
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>

        <div className="geolocator">
          <MatLocator
            progressStyle={{color: 'pink'}}
            onClick={(coords) => _handleGeocoderSelect(coords)}
            onError={(error) => alert(error)}
          />
        </div>
      </MapGL>
    </div>
  );
};

export default Demo;
