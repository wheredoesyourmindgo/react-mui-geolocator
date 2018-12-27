// @flow
import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import green from '@material-ui/core/colors/green';

const DEFAULT_TIMEOUT = 15000;

type Props = {
  timeout: number, // provided by defaultProps
  size: string, // provided by defaultProps
  onClick: (coords: Coordinates) => void,
  onError?: (error: PositionError) => void,
  progressStyle?: any,
  fabStyle?: any
};

type State = {|
  locating: boolean
|};

const defaultProgressStyle = {
  color: green[500],
  position: 'absolute',
  top: -4,
  left: -4,
  zIndex: 1
};

class geoLocator extends React.Component<Props, State> {
  static defaultProps = {
    timeout: DEFAULT_TIMEOUT,
    size: 'small'
  };

  state = {
    locating: false
  };

  /**
   * Geo-locate user position. Timeout and error after 15 seconds; default is set to run indefinitely.
   */
  locate = () => {
    this.setState({locating: true});
    const {onError, onClick, timeout} = this.props;
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        this.setState({locating: false});
        onClick(coords);
      },
      (error) => {
        this.setState({locating: false});
        if (onError) onError(error);
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout: timeout}
    );
  };

  render() {
    const {locating} = this.state;
    const {size, fabStyle, progressStyle} = this.props;
    return (
      <React.Fragment>
        <Fab
          size={size}
          aria-label="geolocate control"
          onClick={this.locate}
          style={fabStyle}
        >
          <GpsFixedIcon />
        </Fab>
        {locating && (
          <CircularProgress
            size={48}
            style={{
              ...defaultProgressStyle,
              ...progressStyle
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default geoLocator;
