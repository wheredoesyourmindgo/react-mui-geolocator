import { FabProps, CircularProgressProps } from '@mui/material';
declare type Props = {
    onClick: (coords: GeolocationCoordinates) => void;
    timeout?: number;
    onGeolocateError?: (error: GeolocationPositionError) => void;
    circularProgressProps?: Partial<CircularProgressProps>;
} & Partial<FabProps>;
declare const MatGeoLocator: ({ timeout, size, onClick, onGeolocateError, circularProgressProps, ...rest }: Props) => JSX.Element;
export default MatGeoLocator;
