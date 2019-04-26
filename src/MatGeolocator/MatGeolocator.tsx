import React, {useState, useMemo, useCallback} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab, {FabProps} from '@material-ui/core/Fab';
import {withStyles, createStyles} from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import green from '@material-ui/core/colors/green';

const DEFAULT_TIMEOUT = 15000;

type Props = {
  timeout?: number; // provided by defaultProps
  size?: FabSize; // provided by defaultProps
  onClick: (coords: Coordinates) => void;
  onError?: (error: PositionError) => void;
  progressStyle?: any;
  fabStyle?: any;
  classes: any;
};

type FabSize = FabProps['size'];

const styles = createStyles({
  progress: {
    color: green[500],
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1
  }
});

const MatGeoLocator: React.FC<Props> = ({
  classes,
  timeout = DEFAULT_TIMEOUT,
  size = 'small',
  onClick,
  onError,
  progressStyle,
  fabStyle
}) => {
  const [locating, setLocating] = useState<boolean>(false);

  /**
   * Geo-locate user position. Timeout and error after 15 seconds; default is set to run indefinitely.
   */
  const locate = useCallback(() => {
    setLocating(true);
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        setLocating(false);
        onClick(coords);
      },
      (error) => {
        setLocating(false);
        onError && onError(error);
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout: timeout}
    );
  }, [onClick, onError, timeout]);

  const foo = useMemo(
    () =>
      locating && (
        <CircularProgress
          size={48}
          className={classes.progress}
          style={{
            ...progressStyle
          }}
        />
      ),
    [locating, progressStyle, classes]
  );

  return (
    <React.Fragment>
      <Fab
        size={size}
        aria-label="geolocate control"
        onClick={locate}
        style={fabStyle}
      >
        <GpsFixedIcon />
      </Fab>
      {foo}
    </React.Fragment>
  );
};

export default withStyles(styles)(MatGeoLocator);
