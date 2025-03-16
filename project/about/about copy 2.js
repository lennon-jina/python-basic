function initThreeJS() {
    // THREE.js 객체들이 올바르게 초기화되었는지 확인
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfefdfd);
    
    // 스캔 컨테이너 요소 먼저 가져오기
    const scanContainer = document.querySelector(".scan-container");
    const scanContainerRect = scanContainer.getBoundingClientRect();
    
    const camera = new THREE.PerspectiveCamera(
        75,
        scanContainerRect.width / scanContainerRect.height,
        0.1,
        1000
    );
    
    // 렌더러 생성 및 설정
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    
    // 렌더러가 올바르게 생성되었는지 확인
    if (!renderer) {
        console.error("THREE.WebGLRenderer 생성 실패");
        return;
    }
    
    // 렌더러 설정
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(scanContainerRect.width, scanContainerRect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Three.js 버전에 따라 다른 속성명을 사용할 수 있음
    if ('physicallyCorrectLights' in renderer) {
        renderer.physicallyCorrectLights = true;
    } else if ('useLegacyLights' in renderer) {
        renderer.useLegacyLights = false;
    }
    
    renderer.toneMappingExposure = 2.5;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // 스캔 컨테이너에 렌더러 DOM 요소 추가
    scanContainer.appendChild(renderer.domElement);
    
    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7.5);
    scene.add(mainLight);
    
    // 기본 애니메이션 함수
    function animate() {
        requestAnimationFrame(animate);
        
        // 모델 회전 추가
        if (typeof rotModel !== 'undefined' && rotModel) {
            rotModel.rotation.y += 0.01;
        }
        
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }
    
    // 모델 변수 선언
    let rotModel;
    
    // GLB 파일 불러오기
    const loader = new THREE.GLTFLoader();
    loader.load("./david.glb", function (gltf) {
        const model = gltf.scene;
        
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
        
        // 모델 위치 및 크기 설정
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // 극단적으로 아래로 위치 조정 - 매우 큰 값 설정
        model.position.set(-center.x, -center.y - 50, -center.z);
        
        // 스캔 컨테이너에 맞게 크기 조정 - 작게 표시
        const containerWidth = scanContainerRect.width;
        const containerHeight = scanContainerRect.height;
        const scale = Math.min(containerWidth, containerHeight) / Math.max(size.x, size.y, size.z) * 0.2;
        
        model.scale.set(scale, scale, scale);
        scene.add(model);
        
        // 회전 모델 할당
        rotModel = model;
        
        // 카메라 위치 조정 - 훨씬 더 위에서 아래를 내려다보기
        camera.position.set(0, 20, 30);
        camera.lookAt(0, -50, 0); // 카메라가 내려간 모델을 바라보도록 조정
        
        // 디버깅 정보 출력
        console.log("컨테이너 크기:", scanContainerRect.width, scanContainerRect.height);
        console.log("모델 위치:", model.position);
        console.log("모델 크기:", size);
        console.log("모델 스케일:", scale);
        console.log("카메라 위치:", camera.position);
        
        // 애니메이션 시작
        animate();
    });
    
    // 창 크기 변경 시 처리 함수
    function handleResize() {
        if (renderer && camera && scanContainer) {
            const newRect = scanContainer.getBoundingClientRect();
            console.log("리사이즈:", newRect.width, newRect.height);
            
            renderer.setSize(newRect.width, newRect.height);
            camera.aspect = newRect.width / newRect.height;
            camera.updateProjectionMatrix();
            
            // 카메라 포지션 다시 설정
            camera.position.set(0, 20, 30);
            camera.lookAt(0, -50, 0);
        }
    }
    
    // 창 크기 변경 시 업데이트
    window.addEventListener('resize', handleResize);
    
    // 페이지 로드 후 추가 초기화
    window.addEventListener('load', function() {
        // 페이지 로드 후 강제로 리사이즈 이벤트 발생
        setTimeout(handleResize, 100);
    });
}

// 초기화 함수 호출
initThreeJS();

// 스크립트 로드 후 강제로 초기화 함수 실행
window.onload = function() {
    // 기존 초기화가 실패했을 경우를 대비해 다시 실행
    setTimeout(initThreeJS, 500);
};