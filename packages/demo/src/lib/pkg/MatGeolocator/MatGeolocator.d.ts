import { FabProps, CircularProgressProps } from '@mui/material';
declare type Props = {
    onClick: (coords: GeolocationCoordinates) => void;
    classes: any;
    timeout?: number;
    onGeolocateError?: (error: GeolocationPositionError) => void;
    circularProgressProps?: Partial<CircularProgressProps>;
} & Partial<FabProps>;
declare const MatGeoLocator: ({ classes, timeout, size, onClick, onGeolocateError, circularProgressProps, ...rest }: Props) => JSX.Element;
export default MatGeoLocator;
