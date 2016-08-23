function initVisualizer(){container=document.createElement("div"),document.body.appendChild(container),camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1e4),camera.position.z=900,scene=new THREE.Scene,renderer=new THREE.WebGLRenderer({alpha:!0}),renderer.setSize(window.innerWidth,window.innerHeight),renderer.setClearColor(0),document.body.appendChild(renderer.domElement),stats=new Stats,container.appendChild(stats.domElement),controls=new THREE.TrackballControls(camera),controls.addEventListener("change",render),dirLight=pointLight=new THREE.DirectionalLight(16777215,.2),dirLight.position.set(0,-1,0).normalize(),scene.add(dirLight),dirLight.color.setHSL(.1,.7,.5),addPointLights(13),createCubes(1e3),controls=new THREE.TrackballControls(camera),controls.addEventListener("change",render),animate()}function addPointLights(e){for(var n=400,t=0;e>t;t++){var i=new THREE.PointLight(colors[t%13],2,350);i.position.x=n*Math.cos(t/e*2*Math.PI),i.position.y=n*Math.sin(t/e*2*Math.PI),i.position.z=0,pointLights.push(i),scene.add(i)}}function createCubes(e){for(var n=new THREE.BoxGeometry(20,20,20),t=new THREE.MeshPhongMaterial({color:16777215,specular:16777215,shininess:50}),i=0;e>i;i++){var o=new THREE.Mesh(n,t);o.position.x=2e3*Math.random()-1e3,o.position.y=1500*Math.random()-750,o.position.z=1e3*Math.random()-500,o.rotation.x=2*Math.random()*Math.PI,o.rotation.y=2*Math.random()*Math.PI,cubes.push(o),scene.add(o)}}function animatePointLights(){var e=clock.getDelta();if(tick+=e,0>tick&&(t=0),e>0)for(var n=0;n<pointLights.length;n++){var i=pointLights[n],o=getFrequencyValue(2e4*n/pointLights.length+1);i.intensity=25*Math.pow(o/256,3)}}function render(){renderer.render(scene,camera)}function animate(){stats.begin(),isPlaying()&&(animateCubes(),animatePointLights()),controls.update(),render(),stats.end(),requestAnimationFrame(animate)}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function animateCubes(){for(var e=(1e-4*Date.now(),0);e<cubes.length;e++){var n=cubes[e];n.position.z>500?n.position.z=-500:n.position.z++,n.rotation.x+=.01,n.rotation.y+=.01}}var camera,scene,renderer,container,controls,stats,light1,dirLight,tick=0,cubes=[],pointLights=[],clock=new THREE.Clock,colors=["#ff0000","#ff8000","#ffff00","#80ff00","#00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#8000ff","#ff00ff","#ff0080","#ff0000"];