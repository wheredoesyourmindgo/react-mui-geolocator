import e,{useState as r,useCallback as o,useMemo as t}from"react";import{withStyles as l,createStyles as a,CircularProgress as n,Fab as s}from"@material-ui/core";import c from"@material-ui/icons/GpsFixed";import i from"clsx";import m from"@material-ui/core/colors/green";function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e}).apply(this,arguments)}function p(e,r){if(null==e)return{};var o,t,l={},a=Object.keys(e);for(t=0;t<a.length;t++)r.indexOf(o=a[t])>=0||(l[o]=e[o]);return l}const f=15e3;var g=l(a({progress:{color:m[500],position:"absolute",top:-4,left:-4,zIndex:1}}))(l=>{let{classes:a,timeout:m=f,size:g="small",onClick:b,onGeolocateError:v,circularProgressProps:x}=l,E=p(l,["classes","timeout","size","onClick","onGeolocateError","circularProgressProps"]);const[P,d]=r(!1),h=o(()=>{d(!0),navigator.geolocation.getCurrentPosition(({coords:e})=>{d(!1),b(e)},e=>{d(!1),null==v||v(e)},{enableHighAccuracy:!1,maximumAge:0,timeout:m})},[b,v,m]),y=t(()=>{const r=null!=x?x:{},{className:o}=r,t=p(r,["className"]);return P&&e.createElement(n,u({size:48,className:i([a.progress,o])},t))},[P,x,a]);return e.createElement(e.Fragment,null,e.createElement(s,u({size:g,"aria-label":"geolocate control",onClick:h},E),e.createElement(c,null)),y)});export default g;
//# sourceMappingURL=index.modern.js.map
