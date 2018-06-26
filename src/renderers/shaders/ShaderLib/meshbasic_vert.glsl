#if defined( USE_MAP ) 

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

#ifdef USE_COLOR

	varying vec3 vColor;

#endif

void main() {

#if defined( USE_MAP ) 

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif


#ifdef USE_COLOR

	vColor.xyz = color.xyz;

#endif
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	gl_Position = projectionMatrix * mvPosition;

}