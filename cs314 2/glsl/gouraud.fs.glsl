

varying vec4 V_Color;

void main() {
	gl_FragColor = V_Color;  //shading according to the vertex shader calculated in the gouraud.vs.glsl
}