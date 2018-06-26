uniform float size;
uniform float scale;


#ifdef USE_COLOR

	varying vec3 vColor;

#endif


void main() {

	#ifdef USE_COLOR

	    vColor.xyz = color.xyz;

    #endif

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;


	#ifdef USE_SIZEATTENUATION
		gl_PointSize = size * ( scale / - mvPosition.z );
	#else
		gl_PointSize = size;
	#endif

}
