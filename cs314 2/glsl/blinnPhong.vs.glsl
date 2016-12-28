varying vec4 VCS_Normal;   // pass them in framgnet shader
varying vec4 vViewPosition;  // pass it in fragment shader

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightDirection;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

varying vec3 viewVector;  // to be passed in fragment shader
varying vec3 normalVector;  // to be passed in framnet shader

void main() {

	// ADJUST THESE VARIABLES TO PASS PROPER DATA TO THE FRAGMENTS

    vViewPosition =vec4(position,1.0);  // make it vec4
    
    VCS_Normal = vec4(normal, 1.0);  // make it vec4
          // now calculate normalize viewVector and normalVector
    viewVector = normalize(vec3(projectionMatrix*modelViewMatrix* vViewPosition));   
    normalVector = normalize(normalMatrix * vec3(VCS_Normal));
    

   
    gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
    
}