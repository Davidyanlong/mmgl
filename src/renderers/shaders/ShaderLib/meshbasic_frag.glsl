uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_COLOR

	varying vec3 vColor;

#endif


#ifdef USE_MAP

	varying vec2 vUv;

	uniform sampler2D map;

#endif


void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vUv );

	diffuseColor *= texelColor;

#endif


#ifdef USE_COLOR

	diffuseColor.rgb *= vColor;

#endif
	
	gl_FragColor = diffuseColor;

#ifdef PREMULTIPLIED_ALPHA

	gl_FragColor.rgb *= gl_FragColor.a;

#endif

}
