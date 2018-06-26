#define PHONG

    varying vec3 vViewPosition;


	varying vec3 vNormal;


#ifdef USE_MAP 

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

#ifdef USE_COLOR

	varying vec3 vColor;

#endif


void main() {

#ifdef USE_MAP

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif

#ifdef USE_COLOR

	vColor.xyz = color.xyz;

#endif

vec3 objectNormal = vec3( normal );

vec3 transformedNormal = normalMatrix * objectNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif


	vNormal = normalize( transformedNormal );

	vec3 transformed = vec3( position );

	vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );

    gl_Position = projectionMatrix * mvPosition;


	vViewPosition = - mvPosition.xyz;


}
