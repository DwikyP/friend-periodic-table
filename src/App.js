import React, { useState, useEffect } from 'react'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

const names = [
  "Hailey","Female","30", 1, 1, 
  "Chelsea","Female","18", 18, 1, 
  "Maddie","Female","26", 1, 2, 
  "Brad","Male","27", 2, 2, 
  "Fenton","Male","23", 13, 2, 
  "Antony","Male","30", 14, 2, 
  "Ryan","Male","21", 15, 2, 
  "William","Male","27", 16, 2, 
  "Jessica","Female","18", 17, 2, 
  "Kelsey","Female","20", 18, 2, 
  "Emma","Female","24", 1, 3, 
  "Max","Male","30", 2, 3, 
  "Rafael","Male","28", 13, 3, 
  "Clark","Male","24", 14, 3, 
  "Eddy","Male","22", 15, 3, 
  "Sam","Male","26", 16, 3, 
  "Adrianna","Female","20", 17, 3, 
  "Brooke","Female","24", 18, 3, 
  "Belinda","Female","23", 1, 4, 
  "Caroline","Female","25", 2, 4, 
  "Preston","Male","30", 3, 4, 
  "Edgar","Male","21", 4, 4, 
  "Cadie","Female","27", 5, 4, 
  "Kevin","Male","24", 6, 4, 
  "Grace","Female","22", 7, 4, 
  "Michael","Male","21", 8, 4, 
  "Alford","Male","29", 9, 4, 
  "Madaline","Female","19", 10, 4, 
  "Lucy","Female","25", 11, 4, 
  "Ted","Male","29", 12, 4, 
  "Adele","Female","27", 13, 4, 
  "Adam","Male","24", 14, 4, 
  "Brianna","Female","30", 15, 4, 
  "Aldus","Male","22", 16, 4, 
  "Brad","Male","21", 17, 4, 
  "Olivia","Female","22", 18, 4, 
  "Kevin","Male","22", 1, 5, 
  "Albert","Male","25", 2, 5, 
  "Amelia","Female","18", 3, 5, 
  "Kristian","Male","23", 4, 5, 
  "Jessica","Female","27", 5, 5, 
  "Alexia","Female","25", 6, 5, 
  "Ellia","Female","22", 7, 5, 
  "Agata","Female","25", 8, 5, 
  "Grace","Female","18", 9, 5, 
  "Alexander","Male","26", 10, 5, 
  "Kimberly","Female","20", 11, 5, 
  "Amy","Female","21", 12, 5, 
  "Nicholas","Male","20", 13, 5, 
  "Paul","Male","25", 14, 5, 
  "Daryl","Male","28", 15, 5, 
  "Sienna","Female","19", 16, 5, 
  "Audrey","Female","29", 17, 5, 
  "Harold","Male","25", 18, 5, 
  "Jack","Male","26", 1, 6, 
  "Grace","Female","21", 2, 6, 
  "Aiden","Male","29", 4, 9, 
  "Chester","Male","24", 5, 9, 
  "Dominik","Male","22", 6, 9, 
  "Eric","Male","24", 7, 9, 
  "Daniel","Male","23", 8, 9, 
  "Maria","Female","19", 9, 9, 
  "Victor","Male","18", 10, 9, 
  "Freddie","Male","22", 11, 9, 
  "Alen","Male","24", 12, 9, 
  "Alfred","Male","21", 13, 9, 
  "Miller","Male","26", 14, 9, 
  "Carlos","Male","28", 15, 9, 
  "Alford","Male","29", 16, 9, 
  "Jordan","Male","27", 17, 9, 
  "Chester","Male","20", 18, 9, 
  "Roman","Male","25", 4, 6, 
  "Isabella","Female","22", 5, 6, 
  "Amanda","Female","25", 6, 6, 
  "Lenny","Male","20", 7, 6, 
  "Evelyn","Female","23", 8, 6, 
  "Andrew","Male","21", 9, 6, 
  "Amber","Female","23", 10, 6, 
  "Edith","Female","26", 11, 6, 
  "Isabella","Female","23", 12, 6, 
  "Emily","Female","18", 13, 6, 
  "Darcy","Female","24", 14, 6, 
  "Aldus","Male","25", 15, 6, 
  "Freddie","Male","29", 16, 6, 
  "Daniel","Male","19", 17, 6, 
  "Catherine","Female","20", 18, 6, 
  "Audrey","Female","19", 1, 7, 
  "Gianna","Female","30", 2, 7, 
  "Stuart","Male","27", 4, 10, 
  "Mike","Male","24", 5, 10, 
  "Maria","Female","24", 6, 10, 
  "Penelope","Female","19", 7, 10, 
  "Lenny","Male","25", 8, 10, 
  "Tara","Female","24", 9, 10, 
  "Ryan","Male","24", 10, 10, 
  "Fiona","Female","18", 11, 10, 
  "Kristian","Male","28", 12, 10, 
  "Maddie","Female","19", 13, 10, 
  "Evelyn","Female","29", 14, 10, 
  "Rafael","Male","26", 15, 10, 
  "Fiona","Female","29", 16, 10, 
  "Anna","Female","19", 17, 10, 
  "Maria","Female","21", 18, 10, 
  "Henry","Male","20", 4, 7, 
  "Kristian","Male","26", 5, 7, 
  "John","Male","24", 6, 7, 
  "Luke","Male","25", 7, 7, 
  "Savana","Female","29", 8, 7, 
  "Ada","Female","29", 9, 7, 
  "Amanda","Female","21", 10, 7, 
  "Charlotte","Female","22", 11, 7, 
  "Samantha","Female","29", 12, 7, 
  "Dominik","Male","27", 13, 7, 
  "Natalie","Female","29", 14, 7, 
  "Lilianna","Female","28", 15, 7, 
  "Jasmine","Female","28", 16, 7, 
  "Martin","Male","19", 17, 7, 
  "Thomas","Male","22", 18, 7
];

 //////
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
 const renderer = new CSS3DRenderer();

 const controls = new TrackballControls( camera, renderer.domElement );

 const objects = [];
 var targets = { table: [], sphere: [], helix: [], grid: [] };
 
const App = () => {
  camera.position.z = 3000;

 //table
 for ( var i = 0; i < names.length; i += 5 ) {

   const element = document.createElement( 'div' );
   element.className = 'element';
   element.style.backgroundColor = names[i + 1] == "Male" ? 'rgba(0,127,127,0.5)' : 'rgba(255, 51, 153,0.5)';

   const number = document.createElement( 'div' );
   number.className = 'number';
   number.textContent = ( i / 5 ) + 1;
   element.appendChild( number );

   const name = document.createElement( 'div' );
   name.className = 'name';
   name.textContent = names[ i ];
   element.appendChild( name );

   const details = document.createElement( 'div' );
   details.className = 'details';
   details.innerHTML = names[ i + 1 ].charAt(0) + '<br>' + names[ i + 2 ];
   element.appendChild( details );

   const objectCSS = new CSS3DObject( element );
   objectCSS.position.x = Math.random() * 4000 - 2000;
   objectCSS.position.y = Math.random() * 4000 - 2000;
   objectCSS.position.z = Math.random() * 4000 - 2000;
   scene.add( objectCSS );

   objects.push( objectCSS );

   const object = new THREE.Object3D();
   object.position.x = ( names[ i + 3 ] * 140 ) - 1330;
   object.position.y = - ( names[ i + 4 ] * 180 ) + 990;

   targets.table.push( object );

 }

 //sphere
 const vector = new THREE.Vector3();

 for ( let i = 0, l = objects.length; i < l; i ++ ) {

   const phi = Math.acos( - 1 + ( 2 * i ) / l );
   const theta = Math.sqrt( l * Math.PI ) * phi;

   const object = new THREE.Object3D();

   object.position.setFromSphericalCoords( 800, phi, theta );

   vector.copy( object.position ).multiplyScalar( 2 );

   object.lookAt( vector );

   targets.sphere.push( object );

 }

 // helix

 for ( let i = 0, l = objects.length; i < l; i ++ ) {

   const theta = i * 0.175 + Math.PI;
   const y = - ( i * 8 ) + 450;

   const object = new THREE.Object3D();

   object.position.setFromCylindricalCoords( 900, theta, y );

   vector.x = object.position.x * 2;
   vector.y = object.position.y;
   vector.z = object.position.z * 2;

   object.lookAt( vector );

   targets.helix.push( object );

 }

 // grid

 for ( let i = 0; i < objects.length; i ++ ) {

   const object = new THREE.Object3D();

   object.position.x = ( ( i % 5 ) * 400 ) - 800;
   object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
   object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

   targets.grid.push( object );

 }

 //////

 const transform = function( targets, duration ) {

   TWEEN.removeAll();

   for ( let i = 0; i < objects.length; i ++ ) {

     const object = objects[ i ];
     const target = targets[ i ];

     new TWEEN.Tween( object.position )
       .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
       .easing( TWEEN.Easing.Exponential.InOut )
       .start();

     new TWEEN.Tween( object.rotation )
       .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
       .easing( TWEEN.Easing.Exponential.InOut )
       .start();

   }

   new TWEEN.Tween( this )
     .to( {}, duration * 2 )
     .onUpdate( render )
     .start();

 }

 const onWindowResize = function() {

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );

   render();

 }

 const animate = function() {

   requestAnimationFrame( animate );

   TWEEN.update();

   controls.update();

 }

 const render = function() {

   renderer.render( scene, camera );

 }

 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild( renderer.domElement );

 controls.minDistance = 500;
 controls.maxDistance = 6000;
 controls.addEventListener( 'change', render );

 transform(targets.table, 2000);

 useEffect(() => {
   window.addEventListener('resize', onWindowResize);
   return () => {
     window.removeEventListener('resize', onWindowResize);
   };
 }, []);

 animate();

  return (
    <>
      <button id="table" onClick ={() => transform(targets.table, 2000)}>TABLE</button>
      <button id="sphere" onClick = {() => transform(targets.sphere, 2000)}>SPHERE</button>
      <button id="helix" onClick = {() => transform(targets.helix, 2000)}>HELIX</button>
      <button id="grid" onClick = {() => transform(targets.grid, 2000)}>GRID</button>
    </>
  )
  
}

export default App;
