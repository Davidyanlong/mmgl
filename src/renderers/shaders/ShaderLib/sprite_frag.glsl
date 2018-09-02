uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_MAP

	varying vec2 vUv;

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif


void main() {


	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vUv );
	diffuseColor *= texelColor;

#endif

#ifdef ALPHATEST

	if ( diffuseColor.a < ALPHATEST ) discard;

#endif

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

}