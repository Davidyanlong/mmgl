uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_DASH

    uniform float dashSize;
    uniform float totalSize;
    varying float vLineDistance;

#endif



#ifdef USE_COLOR

	varying vec3 vColor;

#endif

varying vec2 vUv;

void main() {

    #ifdef USE_DASH
        if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

    if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
    #endif

    if ( abs( vUv.y ) > 1.0 ) {
        float a = vUv.x;
        float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
        float len2 = a * a + b * b;
        if ( len2 > 1.0 ) discard;
    }

    vec4 diffuseColor = vec4( diffuse, opacity );
#ifdef USE_COLOR

	diffuseColor.rgb *= vColor;

#endif

    gl_FragColor =vec4( diffuseColor.rgb, diffuseColor.a );

#ifdef PREMULTIPLIED_ALPHA

	gl_FragColor.rgb *= gl_FragColor.a;

#endif
}