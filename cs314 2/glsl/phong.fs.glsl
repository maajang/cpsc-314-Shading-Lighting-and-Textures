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

	// COMPUTE LIGHTING HERE
    
        // normailize vectors 
    vec3 lightVector = normalize(lightDirection);
    vec3 lightReflect = normalize(reflect(-lightVector,normalVector));
         // calculate both diffuse and specular with the help of max, dot and pow (help from TA) and http://www.cs.uregina.ca/Links/class-info/315/WWW/Lab4/
    float diffuse = max (0.0, dot(normalVector, lightVector));
    float specular = pow(max(0.0, dot(lightReflect,viewVector)),shininess);

    // ambient is directly calculated in the vec4 below, shading done according to per pixel 
	gl_FragColor = vec4(kAmbient * ambientColor + diffuse * lightColor * kDiffuse+ lightColor * specular * kSpecular, 1.0);
    

    
}