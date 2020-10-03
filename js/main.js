var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
// creadno la variable player object
//var player = { height:1.8 };
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

function init(){
    // Crea el objeto escena, utilizando la libreria three
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    //crea el mesh
    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshPhongMaterial({color:0x16525F, wireframe:USE_WIREFRAME})
        //wireframe muestra el esqueleto del cubo si esta en true
    );
    mesh.position.y += 1;
	// The cube can have shadows cast onto it, and it can cast shadows
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);

    //creando el objeto floor
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10, 10,10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    );
    //rotar el meshfloor (el piso)
    meshFloor.rotation.x -= Math.PI / 2;
    //el piso no necesita sombras (resive la sombre del cubo)
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);


    //luces
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

    //punto de luz en la escena 
    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3,6,-3);
    light.castShadow = true;
    //
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);
    

    //posicionamiento de la camara 
    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height,0));
    //Agregando jugador a la camara 

    //creando el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    //agregar luces y sombras NOTA: las sombras no son tan necesarias
    //sombras
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    //s ellama la funcion animate
    animate();
}

function animate(){

    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    //movimientos WASD añadir
    // Keyboard movement inputs
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    
    if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
    }
    if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

    // rotacion 360 deljugador 
    if(keyboard[37]){//left arrow key
        camera.rotation.y -= player.turnSpeed;
    }

    if(keyboard[39]){
        camera.rotation.y += player.turnSpeed;
    }

    renderer.render(scene, camera);

}

function keyDown(event){
    keyboard[event.keyCode] = true;
}

function keyUp(event){
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;