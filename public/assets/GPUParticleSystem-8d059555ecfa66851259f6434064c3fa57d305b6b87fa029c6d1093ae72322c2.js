THREE.GPUParticleSystem=function(e){var t=this,e=e||{};t.PARTICLE_COUNT=e.maxParticles||1e6,t.PARTICLE_CONTAINERS=e.containerCount||1,t.PARTICLES_PER_CONTAINER=Math.ceil(t.PARTICLE_COUNT/t.PARTICLE_CONTAINERS),t.PARTICLE_CURSOR=0,t.time=0;var i={vertexShader:["precision highp float;","const vec4 bitSh = vec4(256. * 256. * 256., 256. * 256., 256., 1.);","const vec4 bitMsk = vec4(0.,vec3(1./256.0));","const vec4 bitShifts = vec4(1.) / bitSh;","#define FLOAT_MAX  1.70141184e38","#define FLOAT_MIN  1.17549435e-38","lowp vec4 encode_float(highp float v) {","highp float av = abs(v);","//Handle special cases","if(av < FLOAT_MIN) {","return vec4(0.0, 0.0, 0.0, 0.0);","} else if(v > FLOAT_MAX) {","return vec4(127.0, 128.0, 0.0, 0.0) / 255.0;","} else if(v < -FLOAT_MAX) {","return vec4(255.0, 128.0, 0.0, 0.0) / 255.0;","}","highp vec4 c = vec4(0,0,0,0);","//Compute exponent and mantissa","highp float e = floor(log2(av));","highp float m = av * pow(2.0, -e) - 1.0;","c[1] = floor(128.0 * m);","m -= c[1] / 128.0;","c[2] = floor(32768.0 * m);","m -= c[2] / 32768.0;","c[3] = floor(8388608.0 * m);","//Unpack exponent","highp float ebias = e + 127.0;","c[0] = floor(ebias / 2.0);","ebias -= c[0] * 2.0;","c[1] += floor(ebias) * 128.0;","//Unpack sign bit","c[0] += 128.0 * step(0.0, -v);","//Scale back to range","return c / 255.0;","}","vec4 pack(const in float depth)","{","const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);","const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);","vec4 res = mod(depth*bit_shift*vec4(255), vec4(256))/vec4(255);","res -= res.xxyz * bit_mask;","return res;","}","float unpack(const in vec4 rgba_depth)","{","const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);","float depth = dot(rgba_depth, bit_shift);","return depth;","}","uniform float uTime;","uniform float uScale;","uniform sampler2D tNoise;","attribute vec4 particlePositionsStartTime;","attribute vec4 particleVelColSizeLife;","varying vec4 vColor;","varying float lifeLeft;","void main() {","// unpack things from our attributes","vColor = encode_float( particleVelColSizeLife.y );","// convert our velocity back into a value we can use","vec4 velTurb = encode_float( particleVelColSizeLife.x );","vec3 velocity = vec3( velTurb.xyz );","float turbulence = velTurb.w;","vec3 newPosition;","float timeElapsed = uTime - particlePositionsStartTime.a;","lifeLeft = 1. - (timeElapsed / particleVelColSizeLife.w);","gl_PointSize = ( uScale * particleVelColSizeLife.z ) * lifeLeft;","velocity.x = ( velocity.x - .5 ) * 3.;","velocity.y = ( velocity.y - .5 ) * 3.;","velocity.z = ( velocity.z - .5 ) * 3.;","newPosition = particlePositionsStartTime.xyz + ( velocity * 10. ) * ( uTime - particlePositionsStartTime.a );","vec3 noise = texture2D( tNoise, vec2( newPosition.x * .015 + (uTime * .05), newPosition.y * .02 + (uTime * .015) )).rgb;","vec3 noiseVel = ( noise.rgb - .5 ) * 30.;","newPosition = mix(newPosition, newPosition + vec3(noiseVel * ( turbulence * 5. ) ), (timeElapsed / particleVelColSizeLife.a) );","if( velocity.y > 0. && velocity.y < .05 ) {","lifeLeft = 0.;","}","if( velocity.x < -1.45 ) {","lifeLeft = 0.;","}","if( timeElapsed > 0. ) {","gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );","} else {","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","lifeLeft = 0.;","gl_PointSize = 0.;","}","}"].join("\n"),fragmentShader:["float scaleLinear(float value, vec2 valueDomain) {","return (value - valueDomain.x) / (valueDomain.y - valueDomain.x);","}","float scaleLinear(float value, vec2 valueDomain, vec2 valueRange) {","return mix(valueRange.x, valueRange.y, scaleLinear(value, valueDomain));","}","varying vec4 vColor;","varying float lifeLeft;","uniform sampler2D tSprite;","void main() {","float alpha = 0.;","if( lifeLeft > .995 ) {","alpha = scaleLinear( lifeLeft, vec2(1., .995), vec2(0., 1.));//mix( 0., 1., ( lifeLeft - .95 ) * 100. ) * .75;","} else {","alpha = lifeLeft * .75;","}","vec4 tex = texture2D( tSprite, gl_PointCoord );","gl_FragColor = vec4( vColor.rgb * tex.a, alpha * tex.a );","}"].join("\n")};t.rand=[];for(var a=1e5;a>0;a--)t.rand.push(Math.random()-.5);t.random=function(){return++a>=t.rand.length?t.rand[a=1]:t.rand[a]};var o=new THREE.TextureLoader;t.particleNoiseTex=o.load("textures/perlin-512.png"),t.particleNoiseTex.wrapS=t.particleNoiseTex.wrapT=THREE.RepeatWrapping,t.particleSpriteTex=o.load("textures/particle2.png"),t.particleSpriteTex.wrapS=t.particleSpriteTex.wrapT=THREE.RepeatWrapping,t.particleShaderMat=new THREE.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:{uTime:{type:"f",value:0},uScale:{type:"f",value:1},tNoise:{type:"t",value:t.particleNoiseTex},tSprite:{type:"t",value:t.particleSpriteTex}},blending:THREE.AdditiveBlending,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),t.particleShaderMat.defaultAttributeValues.particlePositionsStartTime=[0,0,0,0],t.particleShaderMat.defaultAttributeValues.particleVelColSizeLife=[0,0,0,0],t.particleContainers=[],THREE.Object3D.apply(this,arguments),this.init=function(){for(var e=0;e<t.PARTICLE_CONTAINERS;e++){var i=new THREE.GPUParticleContainer(t.PARTICLES_PER_CONTAINER,t);t.particleContainers.push(i),t.add(i)}},this.spawnParticle=function(e){t.PARTICLE_CURSOR++,t.PARTICLE_CURSOR>=t.PARTICLE_COUNT&&(t.PARTICLE_CURSOR=1);var i=t.particleContainers[Math.floor(t.PARTICLE_CURSOR/t.PARTICLES_PER_CONTAINER)];i.spawnParticle(e)},this.update=function(e){for(var i=0;i<t.PARTICLE_CONTAINERS;i++)t.particleContainers[i].update(e)},this.init()},THREE.GPUParticleSystem.prototype=Object.create(THREE.Object3D.prototype),THREE.GPUParticleSystem.prototype.constructor=THREE.GPUParticleSystem,THREE.GPUParticleContainer=function(e,t){function i(e,t,i,a){return r[0]=Math.floor(a),r[1]=Math.floor(i),r[2]=Math.floor(t),r[3]=Math.floor(e),l[0]}function a(e){var t=e>>16,i=(65280&e)>>8,a=255&e;return t>0&&t--,i>0&&i--,a>0&&a--,[t,i,a]}var o=this;o.PARTICLE_COUNT=e||1e5,o.PARTICLE_CURSOR=0,o.time=0,o.DPR=window.devicePixelRatio,o.GPUParticleSystem=t;Math.floor(o.PARTICLE_COUNT/o.MAX_ATTRIBUTES);THREE.Object3D.apply(this,arguments);var r=new Uint8Array(4),l=new Float32Array(r.buffer);o.particles=[],o.deadParticles=[],o.particlesAvailableSlot=[],o.particleUpdate=!1,o.particleShaderGeo=new THREE.BufferGeometry,o.particleVertices=new Float32Array(3*o.PARTICLE_COUNT),o.particlePositionsStartTime=new Float32Array(4*o.PARTICLE_COUNT),o.particleVelColSizeLife=new Float32Array(4*o.PARTICLE_COUNT);for(var n=0;n<o.PARTICLE_COUNT;n++)o.particlePositionsStartTime[4*n+0]=100,o.particlePositionsStartTime[4*n+1]=0,o.particlePositionsStartTime[4*n+2]=0,o.particlePositionsStartTime[4*n+3]=0,o.particleVertices[3*n+0]=0,o.particleVertices[3*n+1]=0,o.particleVertices[3*n+2]=0,o.particleVelColSizeLife[4*n+0]=i(128,128,0,0),o.particleVelColSizeLife[4*n+1]=i(0,254,0,254),o.particleVelColSizeLife[4*n+2]=1,o.particleVelColSizeLife[4*n+3]=0;o.particleShaderGeo.addAttribute("position",new THREE.BufferAttribute(o.particleVertices,3)),o.particleShaderGeo.addAttribute("particlePositionsStartTime",new THREE.BufferAttribute(o.particlePositionsStartTime,4).setDynamic(!0)),o.particleShaderGeo.addAttribute("particleVelColSizeLife",new THREE.BufferAttribute(o.particleVelColSizeLife,4).setDynamic(!0)),o.posStart=o.particleShaderGeo.getAttribute("particlePositionsStartTime"),o.velCol=o.particleShaderGeo.getAttribute("particleVelColSizeLife"),o.particleShaderMat=o.GPUParticleSystem.particleShaderMat,this.init=function(){o.particleSystem=new THREE.Points(o.particleShaderGeo,o.particleShaderMat),o.particleSystem.frustumCulled=!1,this.add(o.particleSystem)};var n,c=new THREE.Vector3,s=new THREE.Vector3,p=0,f=0,v=16777215,d=0,u=0,T=0,R=0,S=2,m=250;this.offset=0,this.count=0,this.spawnParticle=function(e){e=e||{},c=void 0!==e.position?c.copy(e.position):c.set(0,0,0),s=void 0!==e.velocity?s.copy(e.velocity):s.set(0,0,0),p=void 0!==e.positionRandomness?e.positionRandomness:0,f=void 0!==e.velocityRandomness?e.velocityRandomness:0,v=void 0!==e.color?e.color:16777215,d=void 0!==e.colorRandomness?e.colorRandomness:1,E=void 0!==e.turbulence?e.turbulence:1,u=void 0!==e.lifetime?e.lifetime:5,T=void 0!==e.size?e.size:10,R=void 0!==e.sizeRandomness?e.sizeRandomness:0,smoothPosition=void 0!==e.smoothPosition?e.smoothPosition:!1,void 0!==o.DPR&&(T*=o.DPR),n=o.PARTICLE_CURSOR,o.posStart.array[4*n+0]=c.x+t.random()*p,o.posStart.array[4*n+1]=c.y+t.random()*p,o.posStart.array[4*n+2]=c.z+t.random()*p,o.posStart.array[4*n+3]=o.time+.02*t.random(),smoothPosition===!0&&(o.posStart.array[4*n+0]+=-(s.x*t.random()),o.posStart.array[4*n+1]+=-(s.y*t.random()),o.posStart.array[4*n+2]+=-(s.z*t.random()));var r=s.x+t.random()*f,l=s.y+t.random()*f,C=s.z+t.random()*f,E=Math.floor(254*E);r=Math.floor(m*((r- -S)/(S- -S))),l=Math.floor(m*((l- -S)/(S- -S))),C=Math.floor(m*((C- -S)/(S- -S))),o.velCol.array[4*n+0]=i(r,l,C,E);for(var P=a(v),h=0;h<P.length;h++)P[h]=Math.floor(P[h]+t.random()*d*254),P[h]>254&&(P[h]=254),P[h]<0&&(P[h]=0);o.velCol.array[4*n+1]=i(P[0],P[1],P[2],254),o.velCol.array[4*n+2]=T+t.random()*R,o.velCol.array[4*n+3]=u,0==this.offset&&(this.offset=o.PARTICLE_CURSOR),o.count++,o.PARTICLE_CURSOR++,o.PARTICLE_CURSOR>=o.PARTICLE_COUNT&&(o.PARTICLE_CURSOR=0),o.particleUpdate=!0},this.update=function(e){o.time=e,o.particleShaderMat.uniforms.uTime.value=e,this.geometryUpdate()},this.geometryUpdate=function(){1==o.particleUpdate&&(o.particleUpdate=!1,o.offset+o.count<o.PARTICLE_COUNT?(o.posStart.updateRange.offset=o.velCol.updateRange.offset=4*o.offset,o.posStart.updateRange.count=o.velCol.updateRange.count=4*o.count):(o.posStart.updateRange.offset=0,o.posStart.updateRange.count=o.velCol.updateRange.count=4*o.PARTICLE_COUNT),o.posStart.needsUpdate=!0,o.velCol.needsUpdate=!0,o.offset=0,o.count=0)},this.init()},THREE.GPUParticleContainer.prototype=Object.create(THREE.Object3D.prototype),THREE.GPUParticleContainer.prototype.constructor=THREE.GPUParticleContainer;