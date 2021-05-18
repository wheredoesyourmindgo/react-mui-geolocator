import React, {useState, useCallback} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
// import for use with developing component from local copy of dist.
import MatGeolocator from '../lib/pkg';

// const useStyles = makeStyles({
//   input: {
//     // backgroundColor: 'white',
//     borderRadius: 4,
//     '&$cssFocused $notchedOutline': {
//       borderColor: 'green'
//     }
//   },
//   notchedOutline: {},
//   cssFocused: {},
//   textField: {
//     // backgroundColor: 'blue',
//   }
// });

const initialViewport = {
  width: '100vw',
  height: '100vh',
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const IndexPage = () => {
  // const classes = useStyles();
  const [viewport, setViewport] = useState(initialViewport);

  const vpHandler = useCallback((viewport) => {
    setViewport(viewport);
  }, []);

  const geoHandler = useCallback(
    ({latitude, longitude}) => {
      const newViewport = {
        ...viewport,
        longitude,
        latitude,
        zoom: 18,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      };
      vpHandler({...newViewport});
    },
    [vpHandler, viewport]
  );

  return (
    <div className="App">
      <MapGL
        {...viewport}
        mapboxApiAccessToken={
          process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''
        }
        onViewportChange={vpHandler}
      >
        <div className="navControls">
          <NavigationControl onViewportChange={vpHandler} />
        </div>

        <div className="geolocator">
          <MatGeolocator
            onClick={geoHandler}
            onGeolocateError={(error: GeolocationPositionError) =>
              alert(error.message)
            }
          />
        </div>
      </MapGL>
    </div>
  );
};

export default IndexPage;
