uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#ifdef USE_COLOR

	varying vec3 vColor;

#endif

void main() {

#ifdef USE_COLOR

	    vColor.xyz = color.xyz;

#endif

	vLineDistance = scale * lineDistance;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

}
