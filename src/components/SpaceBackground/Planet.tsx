"use client";

/**
 * DESIGN REFERENCE: infracorp.global (Awwwards Nominee)
 *
 * Real 3D planet using Three.js with:
 * - NASA Earth texture from solarsystemscope.com
 * - Fresnel atmosphere shader (ref: stemkoski.github.io/Three.js/Atmosphere.html)
 * - Rim lighting for backlit blue glow (ref: threejsroadmap.com/blog/rim-lighting-shader)
 * - Positioned bottom-right, only top-left arc visible
 * - Scroll-reactive rotation and position
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Atmosphere vertex shader
const atmosVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Atmosphere fragment shader — Fresnel rim glow
// ref: stemkoski.github.io + threejsroadmap.com rim lighting
const atmosFragmentShader = `
  uniform vec3 glowColor;
  uniform float coeficient;
  uniform float power;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
    float intensity = pow(rim, power) * coeficient;
    gl_FragColor = vec4(glowColor, intensity);
  }
`;

export default function Planet({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const atmosRef = useRef<THREE.Mesh | null>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  isDarkRef.current = isDark;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 3.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg"
    );

    // Earth sphere — dark side with night lights
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      transparent: false,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Dark overlay — make the earth darker to match Infracorp look
    const darkOverlay = new THREE.Mesh(
      new THREE.SphereGeometry(1.001, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.65,
      })
    );
    scene.add(darkOverlay);

    // Atmosphere glow — Fresnel shader (ref: stemkoski)
    const atmosGeometry = new THREE.SphereGeometry(1.12, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosVertexShader,
      fragmentShader: atmosFragmentShader,
      uniforms: {
        glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
        coeficient: { value: 1.2 },
        power: { value: 3.5 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmos = new THREE.Mesh(atmosGeometry, atmosMaterial);
    scene.add(atmos);
    atmosRef.current = atmos;

    // Second inner atmosphere — tighter glow
    const innerAtmosGeometry = new THREE.SphereGeometry(1.04, 64, 64);
    const innerAtmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosVertexShader,
      fragmentShader: atmosFragmentShader,
      uniforms: {
        glowColor: { value: new THREE.Color(0.4, 0.7, 1.0) },
        coeficient: { value: 0.8 },
        power: { value: 5.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const innerAtmos = new THREE.Mesh(innerAtmosGeometry, innerAtmosMaterial);
    scene.add(innerAtmos);

    // Position everything bottom-right (like Infracorp)
    const updatePosition = () => {
      const aspect = window.innerWidth / window.innerHeight;
      // Push planet to bottom-right, mostly off-screen
      earth.position.set(aspect * 0.8, -1.8, 0);
      darkOverlay.position.copy(earth.position);
      atmos.position.copy(earth.position);
      innerAtmos.position.copy(earth.position);
    };
    updatePosition();

    // Scroll handler
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updatePosition();
    };

    // Animation loop
    const animate = () => {
      const scroll = scrollRef.current;

      // Slow rotation
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0008;
        // Scroll moves planet down slightly
        const scrollOffset = scroll * 0.0008;
        const aspect = window.innerWidth / window.innerHeight;
        const baseY = -1.8;
        earthRef.current.position.y = baseY - scrollOffset;

        // Sync all elements
        scene.children.forEach((child) => {
          if (child !== earthRef.current && child !== camera) {
            child.position.x = earthRef.current!.position.x;
            child.position.y = earthRef.current!.position.y;
            if (child === darkOverlay) {
              child.rotation.y = earthRef.current!.rotation.y;
            }
          }
        });
      }

      // Update atmosphere color based on theme
      if (atmosRef.current) {
        const mat = atmosRef.current.material as THREE.ShaderMaterial;
        if (isDarkRef.current) {
          mat.uniforms.glowColor.value.setRGB(0.3, 0.6, 1.0);
          mat.uniforms.coeficient.value = 1.2;
        } else {
          mat.uniforms.glowColor.value.setRGB(0.4, 0.4, 0.9);
          mat.uniforms.coeficient.value = 0.6;
        }
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
