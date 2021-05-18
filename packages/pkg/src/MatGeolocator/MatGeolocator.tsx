import React, {useState, useMemo, useCallback} from 'react';
import {
  Fab,
  FabProps,
  CircularProgress,
  withStyles,
  createStyles,
  CircularProgressProps,
} from '@material-ui/core';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import clsx from 'clsx';
import green from '@material-ui/core/colors/green';

const DEFAULT_TIMEOUT = 15000;

type Props = {
  onClick: (coords: GeolocationCoordinates) => void;
  classes: any;
  timeout?: number;
  onGeolocateError?: (error: GeolocationPositionError) => void;
  circularProgressProps?: Partial<CircularProgressProps>;
} & Partial<FabProps>;

const styles = createStyles({
  progress: {
    color: green[500],
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1,
  },
});

const MatGeoLocator = ({
  classes,
  timeout = DEFAULT_TIMEOUT,
  size = 'small',
  onClick,
  onGeolocateError,
  circularProgressProps,
  ...rest
}: Props) => {
  const [locating, setLocating] = useState(false);

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
        onGeolocateError?.(error);
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout: timeout}
    );
  }, [onClick, onGeolocateError, timeout]);

  const progress = useMemo(() => {
    const {className: classNameProp, ...props} = circularProgressProps ?? {};
    return (
      locating && (
        <CircularProgress
          size={48}
          className={clsx([classes.progress, classNameProp])}
          {...props}
        />
      )
    );
  }, [locating, circularProgressProps, classes]);

  return (
    <>
      <Fab
        size={size}
        aria-label="geolocate control"
        onClick={locate}
        {...rest}
      >
        <GpsFixedIcon />
      </Fab>
      {progress}
    </>
  );
};

export default withStyles(styles)(MatGeoLocator);
