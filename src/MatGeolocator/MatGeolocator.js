// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import green from '@material-ui/core/colors/green';
import {withStyles} from '@material-ui/core/styles';

const DEFAULT_TIMEOUT = 15000;

type Props = {
  classes: any,
  timeout: number,
  onClick: (coords: Coordinates) => void,
  onError?: (error: PositionError) => void
};

type State = {|
  locating: boolean
|};

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1
  }
});

class geoLocator extends React.Component<Props, State> {
  static defaultProps = {
    timeout: DEFAULT_TIMEOUT
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
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Button
          mini
          variant="fab"
          aria-label="geolocate control"
          onClick={this.locate}
        >
          <GpsFixedIcon />
        </Button>
        {locating && (
          <CircularProgress size={48} className={classes.fabProgress} />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(geoLocator);
