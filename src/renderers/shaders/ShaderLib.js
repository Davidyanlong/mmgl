
import { UniformsLib } from './UniformsLib';
import { UniformsUtils } from './UniformsUtils.js';
import { ShaderChunk } from './ShaderChunk.js';
import { Color } from '../../maths/Color';
import { Vector2 } from '../../maths/Vector2';

let ShaderLib = {

	basic: {

		uniforms: UniformsUtils.merge([
			UniformsLib.common
		]),

		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag

	},
	lambert: {

		uniforms: UniformsUtils.merge([
			UniformsLib.common,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) }
			}
		]),

		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag

	},
	phong: {

		uniforms: UniformsUtils.merge([
			UniformsLib.common,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) },
				specular: { value: new Color(0x111111) },
				shininess: { value: 30 }
			}
		]),

		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag

	},
	dashed: {
		uniforms: UniformsUtils.merge([
			UniformsLib.common,
			UniformsLib.line

		]),

		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag

	},
	linemesh: {
		uniforms: UniformsUtils.merge([
			UniformsLib.common,
			UniformsLib.line,
			{
				linewidth: { value: 1 },
				resolution: { value: new Vector2(1, 1) },
			}

		]),
		vertexShader: ShaderChunk.linemesh_vert,
		fragmentShader: ShaderChunk.linemesh_frag
	},
	points: {
		uniforms: UniformsUtils.merge([
			UniformsLib.points,
			//UniformsLib.fog
		]),

		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag

	},
	sprite: {

		uniforms: UniformsUtils.merge( [
			UniformsLib.sprite,
			//UniformsLib.fog
		] ),

		vertexShader: ShaderChunk.sprite_vert,
		fragmentShader: ShaderChunk.sprite_frag

	}

}

export { ShaderLib }