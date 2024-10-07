import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

//Use this function to get the position of the body in space
function calculateKeplerianPosition(a, e, i, om, w, ma) {
    
    //Find true anomaly v
    var maRad = (ma*Math.PI)/180;
    var iRad = (i*Math.PI)/180;
    var omRad = (om*Math.PI)/180;
    var wRad = (w*Math.PI)/180;
    var E = ma + ((e - ((1/8)*e*e*e))*Math.sin(ma) ) + ((1/2)*e*e*Math.sin(2*ma)) + ((3/8)*Math.pow(e,3)*Math.sin(3*ma));
    var v = Math.acos((Math.cos(E) - e)/(1 - (e*Math.cos(E))));
    
    //  Calculate the distance (r) based on the true anomaly (ν)
    var r = a * (1 - e * e) / (1 + e * Math.cos(v));

    //Calculate the position in the orbital plane (x', y')
    var xPrime = r * Math.cos(v);
    var yPrime = r * Math.sin(v);

    // Apply rotation matrices for the inclination, longitude of ascending node, and argument of periapsis
    var cosΩ = Math.cos(omRad), sinΩ = Math.sin(omRad);
    var cosω = Math.cos(wRad), sinω = Math.sin(wRad);
    var cosi = Math.cos(iRad), sini = Math.sin(iRad);

    var x = (cosΩ * cosω - sinΩ * sinω * cosi) * xPrime + (-cosΩ * sinω - sinΩ * cosω * cosi) * yPrime;
    var y = (sinΩ * cosω + cosΩ * sinω * cosi) * xPrime + (-sinΩ * sinω + cosΩ * cosω * cosi) * yPrime;
    var z = (sinω * sini) * xPrime + (cosω * sini) * yPrime;

    return new BABYLON.Vector3(x, y, z);
}

export default calculateKeplerianPosition
