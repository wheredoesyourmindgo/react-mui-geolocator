!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("react"),require("@material-ui/core"),require("@material-ui/icons/GpsFixed"),require("clsx"),require("@material-ui/core/colors/green")):"function"==typeof define&&define.amd?define(["react","@material-ui/core","@material-ui/icons/GpsFixed","clsx","@material-ui/core/colors/green"],r):(e||self).reactMuiGeolocator=r(e.react,e.core,e.GpsFixedIcon,e.clsx,e.green)}(this,function(e,r,t,o,a){function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=l(e),i=l(t),c=l(o);function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}function s(e,r){if(null==e)return{};var t,o,a={},l=Object.keys(e);for(o=0;o<l.length;o++)r.indexOf(t=l[o])>=0||(a[t]=e[t]);return a}var f=r.createStyles({progress:{color:l(a).default[500],position:"absolute",top:-4,left:-4,zIndex:1}});return r.withStyles(f)(function(t){var o=t.classes,a=t.timeout,l=void 0===a?15e3:a,f=t.size,d=void 0===f?"small":f,m=t.onClick,p=t.onGeolocateError,g=t.circularProgressProps,b=s(t,["classes","timeout","size","onClick","onGeolocateError","circularProgressProps"]),v=e.useState(!1),y=v[0],x=v[1],h=e.useCallback(function(){x(!0),navigator.geolocation.getCurrentPosition(function(e){var r=e.coords;x(!1),m(r)},function(e){x(!1),null==p||p(e)},{enableHighAccuracy:!1,maximumAge:0,timeout:l})},[m,p,l]),P=e.useMemo(function(){var e=null!=g?g:{},t=e.className,a=s(e,["className"]);return y&&n.default.createElement(r.CircularProgress,u({size:48,className:c.default([o.progress,t])},a))},[y,g,o]);return n.default.createElement(n.default.Fragment,null,n.default.createElement(r.Fab,u({size:d,"aria-label":"geolocate control",onClick:h},b),n.default.createElement(i.default,null)),P)})});
//# sourceMappingURL=index.umd.js.map