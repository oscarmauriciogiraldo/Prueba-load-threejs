var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

// variables para las texturas
var crate, crateTexture, crateNormalMap, crateBumpMap, texture;

var keyboard = {};
// creadno la variable player object
//var player = { height:1.8 };
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;


//variable carga de ventana o pantalla
var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(990, 1280/720, 0.1, 1000),
    box: new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.5,0.5),
        new THREE.MeshBasicMaterial({ color:0xA658FF })
    )
};

var LOADING_MANAGER = null;

var RESOURCES_LOADED = false;

function init(){
    // Crea el objeto escena, utilizando la libreria three
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    //variable loading screen
    loadingScreen.box.position.set(0,0,5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);

    //loading manager para que ingrese al juego 
    /*loadingManager = new THREE.loadingManager();

    loadingManager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    };

    loadingManager.onLoad = function() {
        console.log("loaded all resources");
        RESOURCES_LOADED = true;
    };*/


    

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
        new THREE.PlaneGeometry(30,30, 30,30),
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

    //parte de texturas, crea un nuebo cubo

    /* /************************************************************************\ 
    /************************************************************************\ 
    \************************************************************************ */

    // otra forma 
    texture = new THREE.TextureLoader().load("../crate0/crate0_diffuse.png");
    crateBumpMap = new THREE.TextureLoader().load("../crate0/crate0_bump.png");
    crateNormalMap = new THREE.TextureLoader().load("../crate0/crate0_normal.png");

    //var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	//var material = new THREE.MeshBasicMaterial( { map: texture } );

    //variable tectura carga

    /*
    var textureLoader = new THREE.TextureLoader();
    crateTexture = new textureLoader.load('crate0/crate0_diffuse.png');
    */

    /*crate = new THREE.Mesh( geometry, material );*/
    crate = new THREE.Mesh(
        new THREE.BoxGeometry( 3, 3, 3 ),
        new THREE.MeshPhongMaterial({
            //color:0xffffff,
            //map:crateTexture
            map:texture,
            bumpMap:crateBumpMap,
            normalMap:crateNormalMap
        })
    );
    scene.add(crate);
    //se mueve el crate = cube para otra posicion 
    crate.position.set(2.5, 3/2, 2.5);
    //que reciba sombras 
    crate.receiveShadow = true;
    crate.castShadow = true; 
    /* /************************************************************************\ 
    /************************************************************************\ 
    \************************************************************************ */


    //***************************objeto 3d load ***************************** */
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("../models/tree_detailed.mtl", function(materials){

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("../models/tree_detailed.obj", function(mesh){
            
            //propiedades sombras
            mesh.traverse(function(node){
               if (node instanceof THREE.Mesh) {
                   node.castShadow = true;
                   node.receiveShadow = true;
               }
            });

           scene.add(mesh)
           mesh.position.set(-5, 0, 4);
           mesh.rotation.y = -Math.PI/4;
        });
    });

    /**/var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("../models/pirate_captain.mtl", function(materials){

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("../models/pirate_captain.obj", function(mesh){
            
            //propiedades sombras
            mesh.traverse(function(node){
               if (node instanceof THREE.Mesh) {
                   node.castShadow = true;
                   node.receiveShadow = true;
               }
            });

           scene.add(mesh)
           mesh.position.set(-9, 0, -5);
           mesh.rotation.y = -Math.PI/4;
        });
    });

    // Model/material loading!
	/*var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("../models/Tent_Poles_01.mtl", function(materials){
		
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		
		objLoader.load("../models/Tent_Poles_01.obj", function(mesh){
		
			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
		
			scene.add(mesh);
			mesh.position.set(-5, 0, 4);
			mesh.rotation.y = -Math.PI/4;
		});
		
	});*/
    //***************************objeto 3d load ***************************** */
    /************************************************************************\ 
    \************************************************************************ */



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

    //animacion load screen
    /*if ( RESOURCES_LOADED == false) {
        requestAnimationFrame(animate);

        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -10)loadingScreen.box.position.x = 10;       
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }*/

    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    //movimiento del cubo con textura
    crate.rotation.y +=0.01;

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