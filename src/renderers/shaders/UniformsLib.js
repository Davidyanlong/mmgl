import { Color } from '../../maths/Color';
import { Matrix3 } from '../../maths/Matrix3';
import {Vector2} from '../../maths/Vector2';

let UniformsLib = {
	common: {

		diffuse: { value: new Color(0xeeeeee) },
		opacity: { value: 1.0 },

		map: { value: null },
		uvTransform: { value: new Matrix3() },


	},
	lights: {

		ambientLightColor: { value: [] },

		directionalLights: {
			value: [], properties: {
				direction: {},
				color: {}
			}
		},

		spotLights: {
			value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},

		pointLights: {
			value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},

	},
	points: {

		diffuse: { value: new Color(0xeeeeee) },
		opacity: { value: 1.0 },
		size: { value: 1.0 },
		scale: { value: 1.0 },
		map: { value: null },
		uvTransform: { value: new Matrix3() }

	},
	line: {
		scale: { value: 1 },
		dashSize: { value: 1 },
		totalSize: { value: 2 }
	},
	sprite: {

		diffuse: { value: new Color(0xeeeeee) },
		opacity: { value: 1.0 },
		center: { value: new Vector2(0.5, 0.5) },
		rotation: { value: 0.0 },
		map: { value: null },
		uvTransform: { value: new Matrix3() }

	}
}

export { UniformsLib };