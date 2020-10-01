var scene, camera, renderer, mesh;

function init(){
    // Crea el objeto escena, utilizando la libreria three
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    //crea el mesh
    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:0xff9999, wireframe:false})
        //wireframe muestra el esqueleto del cubo si esta en true
    );
    //agrega la malla a la scena
    scene.add(mesh);

    //posicionamiento de la camara 
    camera.position.set(0.0, -5);
    camera.lookAt(new THREE.Vector3(0,0,0));

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

    renderer.render(scene, camera);

}

window.addEventListener();

window.onload = init;