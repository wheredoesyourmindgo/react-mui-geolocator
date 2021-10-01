import React, {useState, useMemo, useCallback} from 'react';
import {
  Fab,
  FabProps,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const DEFAULT_TIMEOUT = 15000;

type Props = {
  onClick: (coords: GeolocationCoordinates) => void;
  timeout?: number;
  onGeolocateError?: (error: GeolocationPositionError) => void;
  circularProgressProps?: Partial<CircularProgressProps>;
} & Partial<FabProps>;

const MatGeoLocator = ({
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
    const {
      className: classNameProp,
      sx,
      ...props
    } = circularProgressProps ?? {};
    return (
      locating && (
        <CircularProgress
          size={48}
          sx={{
            color: 'secondary.main',
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            zIndex: 1,
            ...sx,
          }}
          {...props}
        />
      )
    );
  }, [locating, circularProgressProps]);

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

export default MatGeoLocator;
