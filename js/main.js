var scene, camera, renderer, mesh;

var keyboard = {};

// creadno la variable player object
var player = { height:1.8 };

function init(){
    // Crea el objeto escena, utilizando la libreria three
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    //crea el mesh
    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:0x16525F, wireframe:false})
        //wireframe muestra el esqueleto del cubo si esta en true
    );
    //agrega la malla a la scena
    scene.add(mesh);

    //posicionamiento de la camara 
    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height,0));

    //creando el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);
    document.body.appendChild(renderer.domElement);

    //s ellama la funcion animate
    animate();
}

function animate(){

    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    // rotacion 360 deljugador 
    if(keyboard[37]){//left arrow key
        camera.rotation.y += Math.PI * 0.01;
    }

    if(keyboard[39]){
        camera.rotation.y -= Math.PI * 0.01;
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