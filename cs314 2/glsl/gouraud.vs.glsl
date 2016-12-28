varying vec4 V_Color;         // varying variable to be passed into the fragment shader.
uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightDirection;


uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;


void main() {
	// COMPUTE COLOR ACCORDING TO GOURAUD HERE
    
	//V_Color = vec4(1.0, 0.0, 0.0, 1.0);
        // first normalize light and view vectors
    vec3 lightVector =  normalize(lightDirection);
    vec3 viewVector =   normalize(vec3(projectionMatrix * modelViewMatrix * vec4(position,1.0)));
         // then normal vector. normalize the light reflect
    vec3 normalVector = normalize(normalMatrix * normal);
    vec3 lightReflect = normalize(reflect(-lightVector,normalVector));
               // get the max for the calculation. source: http://www.cs.uregina.ca/Links/class-info/315/WWW/Lab4/
    float specular = pow(max(0.0, dot(lightReflect,viewVector)),shininess);
    float diffuse = max (0.0, dot(normalVector, lightVector));
               // calculating the fragment color here as a per each vertex
    V_Color = vec4((kAmbient * ambientColor + diffuse * lightColor * kDiffuse + lightColor * specular * kSpecular), 1.0);

    
	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}