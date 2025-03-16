    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfefdfd);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.tonMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.5;
    document.querySelector(".model").appendChild(renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7.5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    hemiLight.position.set(0, 25, 0);
    scene.add(hemiLight);

    // 네모 상자 생성
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, 
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const targetBox = new THREE.Mesh(boxGeometry, boxMaterial);
    targetBox.position.set(0, -10, 0); // 스크롤 시 모델이 이동할 목표 위치
    targetBox.scale.set(0, 0, 0);
    scene.add(targetBox);

    function basicAnimate() {
        renderer.render(scene, camera);
        requestAnimationFrame(basicAnimate);
    }
    basicAnimate();

    let model;
    const loader = new THREE.GLTFLoader();
    loader.load("./david.glb", function (gltf) {
        console.log("모델 로드 성공:", gltf);
        model = gltf.scene;
        model.traverse((node) => {
            if (node.isMesh) {
                if(node.material) {
                    node.material.metalness = 0.3;
                    node.material.roughness = 0.4;
                    node.material.envMapIntensity = 1.5;
                }
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 2.5;

        // 초기에는 모델을 표시
        model.scale.set(1, 1, 1);
        playInitialAnimation();

        // 박스를 모델 크기에 맞게 조정
        targetBox.scale.set(1, 1, 1);
        gsap.set(targetBox.scale, { x: 0, y: 0, z: 0 });

        cancelAnimationFrame(basicAnimate);
        animate();
    });

    const floatAmplitude = 0.2;
    const floatSpeed = 1.5;
    const rotationSpeed = 0.3;
    let isFloating = true;
    let currentScroll = 0;
    let boxAnimationTriggered = false;

    const stickyHeight = window.innerHeight;
    const scannerSection = document.querySelector(".scanner");
    const scannerPosition = scannerSection.offsetTop;
    const scanContainer = document.querySelector(".scan-container");
    gsap.set(scanContainer, { scale: 0 });

    function playInitialAnimation() {
        if (model) {
            gsap.from(model.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            });
        }
        gsap.to(scanContainer, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        });
    }

    // 스크롤 트리거 설정
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "top -10",
        onEnterBack: () => {
            if (model) {
                gsap.to(model.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1,
                    ease: "power2.out",
                });
                isFloating = true;
                boxAnimationTriggered = false;
                
                // 박스 크기 리셋
                gsap.to(targetBox.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "power2.in"
                });
            }
            gsap.to(scanContainer, {
                scale: 1,
                duration: 1,
                ease: "power2.out",
            });
        },
    });

    ScrollTrigger.create({
        trigger: ".scanner",
        start: "top 70%", // 스크롤이 70% 지점에 도달하면 애니메이션 시작
        end: `bottom bottom`,
        onEnter: () => {
            if (model && !boxAnimationTriggered) {
                boxAnimationTriggered = true;
                isFloating = false;
                
                // 박스 등장 애니메이션
                gsap.to(targetBox.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
                
                // 모델이 회전하며 박스로 이동하는 애니메이션
                gsap.to(model.position, {
                    y: targetBox.position.y,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
                
                // 빙글빙글 회전 효과
                gsap.to(model.rotation, {
                    x: Math.PI * 2,
                    y: Math.PI * 4,
                    z: Math.PI,
                    duration: 1.5,
                    ease: "power1.inOut",
                    onComplete: () => {
                        // 모델이 박스에 도착하면 축소하는 애니메이션
                        gsap.to(model.scale, {
                            x: 0.5,
                            y: 0.5,
                            z: 0.5,
                            duration: 0.5,
                            ease: "power2.in",
                            onComplete: () => {
                                // 모델이 완전히 사라지는 애니메이션
                                gsap.to(model.scale, {
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    duration: 0.3,
                                    ease: "power2.in",
                                    delay: 0.2
                                });
                                
                                // 모델이 사라진 후 박스도 축소
                                gsap.to(targetBox.scale, {
                                    x: 0.1,
                                    y: 0.1,
                                    z: 0.1,
                                    duration: 0.5,
                                    delay: 0.5,
                                    ease: "power2.in"
                                });
                            }
                        });
                    }
                });
            }
        },
        onLeaveBack: () => {
            if (model && boxAnimationTriggered) {
                boxAnimationTriggered = false;
                isFloating = true;
                
                // 모델 원위치 및 스케일 복구
                gsap.to(model.position, {
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
                
                gsap.to(model.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });
                
                // 박스 크기 리셋
                gsap.to(targetBox.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "power2.in"
                });
            }
        }
    });

    lenis.on("scroll", (e) => {
        currentScroll = e.scroll;
    });

    function animate() {
        if (model) {
            if (isFloating) {
                // 떠다니는 효과
                const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
                model.position.y = floatOffset;
                
                // 자연스러운 회전
                model.rotation.y += 0.001 * rotationSpeed;
            }
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    loader.load(
        "./david.glb", 
        function (gltf) {
            console.log("모델 로드 성공:", gltf);
            // 기존 코드...
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% 로드됨');
        },
        function (error) {
            console.error("모델 로드 실패:", error);
        }
    );
    
    