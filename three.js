function generateSky() {
    if (sky == true) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#8D95AD');
    gradient.addColorStop(1, '#6E738E');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    scene.background = backgroundTexture;

    const cloudTexture = new THREE.TextureLoader().load('realistic-white-cloud-png.webp');
    const cloudMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.7,
        color: 0x404040 // Black tint
    });

    const clouds = [];
    for (let i = 0; i < 25; i++) {
        const cloudGeometry = new THREE.PlaneGeometry(200, 200);
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(Math.random() * 200 - 100, Math.random() * 100 - 50, Math.random() * -200);
        cloud.rotation.z = Math.random() * Math.PI * 2;
        cloud.speed = Math.random() * (Math.random() - Math.random()) + 0.005; // Random speed between 0.005 and 0.025
        scene.add(cloud);
        clouds.push(cloud);
    }

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);

        clouds.forEach(cloud => {
            cloud.position.x += cloud.speed;
            if (cloud.position.x > 100) {
                cloud.position.x = -100;
            }
            cloud.rotation.z += cloud.speed * .01;

            if (Math.random() < 0.002) { // Random chance for lightning
                cloud.material.opacity = 1;
                setTimeout(() => {
                    cloud.material.opacity = Math.random() + 0.3;
                }, 50); // Duration of the lightning flash
            }
        });

        renderer.render(scene, camera);
    }
    animate();
    }
}

let sky;

document.addEventListener("DOMContentLoaded", function() {
    if (shortDesc) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#8D95AD');
    gradient.addColorStop(1, '#6E738E');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    scene.background = backgroundTexture;

    const cloudTexture = new THREE.TextureLoader().load('realistic-white-cloud-png.webp');
    const cloudMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.7,
        color: 0x404040 // Black tint
    });

    const clouds = [];
    for (let i = 0; i < 25; i++) {
        const cloudGeometry = new THREE.PlaneGeometry(200, 200);
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(Math.random() * 200 - 100, Math.random() * 100 - 50, Math.random() * -200);
        cloud.rotation.z = Math.random() * Math.PI * 2;
        cloud.speed = Math.random() * (Math.random() - Math.random()) + 0.005; // Random speed between 0.005 and 0.025
        scene.add(cloud);
        clouds.push(cloud);
    }

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);

        clouds.forEach(cloud => {
            cloud.position.x += cloud.speed;
            if (cloud.position.x > 100) {
                cloud.position.x = -100;
            }
            cloud.rotation.z += cloud.speed * .01;

            if (Math.random() < 0.002) { // Random chance for lightning
                cloud.material.opacity = 1;
                setTimeout(() => {
                    cloud.material.opacity = Math.random() + 0.3;
                }, 50); // Duration of the lightning flash
            }
        });

        renderer.render(scene, camera);
    }
    animate();
    sky = true;
    } else {
        generateSky();
    }
});
