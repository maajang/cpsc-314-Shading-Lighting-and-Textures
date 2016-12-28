varying vec4 vViewPosition;  // passed 
varying vec4 VCS_Normal;  // passed 

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightDirection;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

varying vec3 viewVector;  // passed for vertex shader
varying vec3 normalVector;  // passed from vertex shader

void main() {

	// COMPUTE LIGHTING HERE, normalize vectors 
    vec3 lightVector = normalize(lightDirection);
   // vec3 lightReflect = normalize(reflect(-lightVector,normalVector));  // not necessary
    vec3 halfVector = normalize(lightVector + viewVector);  

    
     //source of help: http://www.cs.uregina.ca/Links/class-info/315/WWW/Lab4/       
    float diffuse = max (0.0, dot(normalVector, lightVector));
    float specular = pow(max(0.0, dot(halfVector,normalVector)),shininess);  // source: http://ruh.li/GraphicsPhongBlinnPhong.html
    
       // 
    gl_FragColor = vec4(kAmbient * ambientColor + diffuse * lightColor * kDiffuse+ lightColor * specular * kSpecular, 1.0);
}