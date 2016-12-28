varying vec4 VCS_Normal;
varying vec4 vViewPosition;

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightDirection;

uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

varying vec3 viewVector;
varying vec3 normalVector;


void main() {

	// ADJUST THESE VARIABLES TO PASS PROPER DATA TO THE FRAGMENTS
	//V_Normal_VCS = vec4(1.0,0.0,0.0, 1.0);
	//V_ViewPosition = vec4(1.0,0.0,0.0, 1.0);
    
    vViewPosition =vec4(position,1.0);  // change it to 4x4 matrix 
    VCS_Normal = vec4(normal, 1.0); // change VCS 
    
    // find viewVector and normalVector and normalize them to be use in fragment shader
    viewVector = normalize(vec3(projectionMatrix*modelViewMatrix* vViewPosition));
    normalVector = normalize(normalMatrix * vec3(VCS_Normal));


	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
    

}