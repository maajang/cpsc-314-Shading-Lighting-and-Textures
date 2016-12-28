/**
 * UBC CPSC 314 (2016_W1)
 * Assignment 3
 */

// CREATE SCENE
var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xcdcdcd);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(25.0,(window.innerWidth/window.innerHeight), 0.1, 10000);
camera.position.set(0.0,15.0,40.0);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4,4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(30.0, 30.0), floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

//ROCKS TEXTURE and normal map texture
var rockTexture =  new THREE.ImageUtils.loadTexture('images/lava-texture.jpeg');
var textureMap =  new THREE.ImageUtils.loadTexture('images/texture.jpeg');
var normalMap =  new THREE.ImageUtils.loadTexture('images/norm.jpg');


//LIGHTING PROPERTIES, will ask TA why it's not shading like I intend it to
var lightColor     = {type: "c", value: new THREE.Color(1.0,1.0,1.0)};
var ambientColor   = {type: "c", value: new THREE.Color(0.4,0.4,0.4)};
var lightDirection = {type: "v3", value: new THREE.Vector3(0.49,1.0,0.49)};
rockTexture        = {type:'t', value: rockTexture};
textureMap         = {type:'t', value:textureMap};
normalMap          = {type:'t', value:normalMap};
  


//MATERIAL PROPERTIES, same thing here
 var kAmbient = {type: "f", value: 0.4 };
 var kDiffuse = {type: "f", value: 0.8 };
 var kSpecular = {type: "f", value: 0.8 };
 var shininess = {type: "f", value: 10.0 };



// SHADERS MATERIALS for gouraud material
var gouraudMaterial = new THREE.ShaderMaterial({
   uniforms: {
    lightColor : lightColor,
    lightDirection:lightDirection,
    ambientColor:ambientColor,
    kAmbient:kAmbient,
    kDiffuse:kDiffuse,
    kSpecular:kSpecular,
    shininess:shininess,
   },
});
  // shaders materials for phong material
var phongMaterial = new THREE.ShaderMaterial({
   uniforms: {
    lightColor:lightColor,
    lightDirection:lightDirection,
    ambientColor:ambientColor,
    kAmbient:kAmbient,
    kDiffuse:kDiffuse,
    kSpecular:kSpecular,
    shininess:shininess,
  },
});
   // shaders material for blinnphong material
var blinnPhongMaterial = new THREE.ShaderMaterial({
    uniforms: {
    lightColor:lightColor,
    lightDirection:lightDirection,
    ambientColor:ambientColor,
    kAmbient:kAmbient,
    kDiffuse:kDiffuse,
    kSpecular:kSpecular,
    shininess:shininess,
  },
});  
   // shaders materials for the texture material
var textureMaterial = new THREE.ShaderMaterial({
  uniforms: {

    lightColor:lightColor,
    lightDirection:lightDirection,
    ambientColor:ambientColor,
    kAmbient:kAmbient,
    kDiffuse:kDiffuse,
    kSpecular:kSpecular,
    shininess:shininess,
    rockTexture:rockTexture,
  },
}); 
    
     // shaders material for normal mapping material
var normMapMaterial = new THREE.ShaderMaterial({
   uniforms: {
    lightColor:lightColor,
    lightDirection:lightDirection,
    ambientColor:ambientColor,
    kAmbient:kAmbient,
    kDiffuse:kDiffuse,
    kSpecular:kSpecular,
    shininess:shininess,
    textureMap:textureMap,
    normalMap:normalMap,
   },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/gouraud.fs.glsl',
  'glsl/gouraud.vs.glsl',
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/blinnPhong.vs.glsl',
  'glsl/blinnPhong.fs.glsl',
  'glsl/texture.fs.glsl',
  'glsl/texture.vs.glsl',
  'glsl/normal_map.vs.glsl',   // for normal mapping
  'glsl/normal_map.fs.glsl',   // for normal mapping


];


new THREE.SourceLoader().load(shaderFiles, function(shaders) {
    // gouraud vertext and fragment shaders
 gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
 gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
    // phong vertext and fragment shaders
 phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
 phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
    // for blinnphong vertext and fragment shaders
 blinnPhongMaterial.vertexShader = shaders['glsl/blinnPhong.vs.glsl'];
 blinnPhongMaterial.fragmentShader = shaders['glsl/blinnPhong.fs.glsl'];
    // for texture vertext and fragment shaders
 textureMaterial.fragmentShader = shaders['glsl/texture.fs.glsl'];
 textureMaterial.vertexShader = shaders['glsl/texture.vs.glsl'];
    // source loader for normal mapping
 normMapMaterial.fragmentShader = shaders['glsl/normal_map.fs.glsl'];
 normMapMaterial.vertexShader = shaders['glsl/normal_map.vs.glsl'];
   
})

// CREATE SPHERES, re-adjusted to fit within the frame floor
var sphereRadius = 2.5;
var sphere = new THREE.SphereGeometry(sphereRadius, 16, 16);

var gouraudSphere = new THREE.Mesh(sphere, gouraudMaterial); 
gouraudSphere.position.set(-9.5, sphereRadius, 0);
scene.add(gouraudSphere);

var phongSphere = new THREE.Mesh(sphere, phongMaterial); 
phongSphere.position.set(-4.5, sphereRadius, 0);
scene.add(phongSphere);

var blinnPhongSphere = new THREE.Mesh(sphere, blinnPhongMaterial); 
blinnPhongSphere.position.set(0.5, sphereRadius, 0);
scene.add(blinnPhongSphere);

var textureSphere = new THREE.Mesh(sphere, textureMaterial); 
textureSphere.position.set(5.5, sphereRadius, 0);
scene.add(textureSphere);
    // for the normal mapping
var normMapSphere = new THREE.Mesh(sphere, normMapMaterial); 
normMapSphere.position.set(10.5, sphereRadius, 0);
scene.add(normMapSphere);



// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if(keyboard.pressed("l")) {
    ambientColor.value = new THREE.Color(Math.random(), Math.random(), Math.random());
    lightColor.value = new THREE.Color(0.2126,0.7152,0.0722)
    }

 else if(keyboard.pressed("m")){
    ambientColor.value = new THREE.Color(Math.random()* 0.6, Math.random()*0.6, Math.random()*0.6);
    lightColor.value = new THREE.Color(0.2126,0.7152,0.0722);
    // kAmbient.value = 0.6;
    // kDiffuse.value = 0.5;
    // shininess.value = 50;
  
    
  }
   
  
}
var render = function() {
  checkKeyboard();
  normMapMaterial.needsUpdate = true;
  textureMaterial.needsUpdate = true;
  phongMaterial.needsUpdate = true;
  blinnPhongMaterial.needsUpdate = true;
  gouraudMaterial.needsUpdate = true;
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();