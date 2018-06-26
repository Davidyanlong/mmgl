uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_COLOR

	varying vec3 vColor;

#endif


#ifdef USE_MAP

	uniform mat3 uvTransform;
	uniform sampler2D map;

#endif


void main() {


	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );


#ifdef USE_MAP

	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *=  mapTexel ;

#endif

#ifdef USE_COLOR

	diffuseColor.rgb *= vColor;

#endif

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

#ifdef PREMULTIPLIED_ALPHA

	gl_FragColor.rgb *= gl_FragColor.a;

#endif	

}
