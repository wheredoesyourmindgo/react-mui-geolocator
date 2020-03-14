import React, {useState, useCallback} from 'react'
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl'
import {easeCubic} from 'd3-ease'
import {ThemeProvider} from '@material-ui/core/styles'
import {createMuiTheme} from '@material-ui/core/styles'
// import MatGeolocator from 'react-mui-geolocator'
// import for use with developing component from copy of source.
// import MatGeolocator from './lib/MatGeolocator';
// import for use with developing component from local copy of dist.
import MatGeolocator from '../lib/MatGeolocator/MatGeolocator'
// import {makeStyles} from '@material-ui/core/styles';

const theme = createMuiTheme()

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
  zoom: 8
}

const IndexPage = () => {
  // const classes = useStyles();
  const [viewport, setViewport] = useState(initialViewport)

  const _onViewportChange = useCallback((viewport) => {
    setViewport(viewport)
  }, [])

  const _handleGeolocatorSelect = useCallback(
    async ({latitude, longitude}) => {
      const newViewport = {
        ...viewport,
        longitude,
        latitude,
        zoom: 18,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }
      _onViewportChange({...newViewport})
    },
    [_onViewportChange, viewport]
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''}
          onViewportChange={_onViewportChange}
        >
          <div className="navControls">
            <NavigationControl onViewportChange={_onViewportChange} />
          </div>

          <div className="geolocator">
            <MatGeolocator
              progressStyle={{color: 'pink'}}
              onClick={(coords) => _handleGeolocatorSelect(coords)}
              onError={(error) => alert(error)}
            />
          </div>
        </MapGL>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage
