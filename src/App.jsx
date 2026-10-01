import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  RoundedBox,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "ARTISAN AI",
    type: "AI / MOBILE",
    description:
      "An AI-powered marketplace designed to help marginalized artisans create digital product catalogs, improve product images and connect with buyers.",
    stack: ["React Native", "Expo", "FastAPI", "AI"],
  },
  {
    number: "02",
    title: "STADIUM OS AI",
    type: "GENERATIVE AI",
    description:
      "An AI-powered stadium operations platform designed for navigation, crowd management, emergency assistance and accessibility.",
    stack: ["Firebase", "GenAI", "JavaScript", "AI"],
  },
  {
    number: "03",
    title: "ECO BEAUTY",
    type: "WEB / DIGITAL",
    description:
      "A modern eco-beauty website combining product discovery, visual branding and digital marketing concepts.",
    stack: ["React", "CSS", "JavaScript", "Marketing"],
  },
];

const skills = [
  ["React", "FRONTEND", 85],
  ["JavaScript", "LANGUAGE", 88],
  ["C++", "PROGRAMMING", 80],
  ["DSA", "COMPUTER SCIENCE", 75],
  ["Python", "PROGRAMMING", 72],
  ["FastAPI", "BACKEND", 65],
  ["SQL", "DATABASE", 70],
  ["Git / GitHub", "TOOLS", 78],
];

const cameraViews = {
  home: {
    position: [9.5, 3.4, 12],
    target: [0, -0.8, -1.5],
  },

  projects: {
    position: [4.8, 1.4, 6],
    target: [3, -0.2, -2.4],
  },

  about: {
    position: [-5.5, 1.8, 6],
    target: [-3.2, 0.2, -2.2],
  },

  skills: {
    position: [6.3, 0.8, 5],
    target: [4.4, -0.5, -2.8],
  },

  achievements: {
    position: [0, 1.5, 5.8],
    target: [0, 0.8, -4.8],
  },

  contact: {
    position: [4.5, 0.8, 5.5],
    target: [4.2, -0.7, 0.8],
  },
};

function CameraController({ view }) {
  const { camera } = useThree();

  const controls = useRef();

  const position = useRef(
    new THREE.Vector3(
      ...cameraViews.home.position
    )
  );

  const target = useRef(
    new THREE.Vector3(
      ...cameraViews.home.target
    )
  );

  useEffect(() => {
    const destination =
      cameraViews[view] || cameraViews.home;

    position.current.set(
      ...destination.position
    );

    target.current.set(
      ...destination.target
    );
  }, [view]);

  useFrame(() => {
    camera.position.lerp(
      position.current,
      0.045
    );

    if (controls.current) {
      controls.current.target.lerp(
        target.current,
        0.045
      );

      controls.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.06}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
}

function Room() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
      >
        <planeGeometry args={[20, 18]} />

        <meshStandardMaterial
          color="#211e1a"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      <gridHelper
        args={[
          20,
          20,
          "#38332c",
          "#29251f",
        ]}
        position={[0, -2.98, 0]}
      />

      <mesh position={[0, 3, -6]}>
        <boxGeometry
          args={[18, 12, 0.25]}
        />

        <meshStandardMaterial
          color="#292724"
          roughness={0.9}
        />
      </mesh>

      <mesh position={[-9, 3, 0]}>
        <boxGeometry
          args={[0.25, 12, 18]}
        />

        <meshStandardMaterial
          color="#25231f"
          roughness={0.9}
        />
      </mesh>

      <mesh position={[9, 3, 0]}>
        <boxGeometry
          args={[0.25, 12, 18]}
        />

        <meshStandardMaterial
          color="#25231f"
          roughness={0.9}
        />
      </mesh>

      <mesh position={[0, 8.9, 0]}>
        <boxGeometry
          args={[18, 0.2, 18]}
        />

        <meshStandardMaterial
          color="#1c1a18"
        />
      </mesh>
    </group>
  );
}

function Window() {
  return (
    <group position={[-4.8, 2.2, -5.8]}>
      <mesh>
        <boxGeometry
          args={[4.3, 4.2, 0.18]}
        />

        <meshStandardMaterial
          color="#111417"
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <planeGeometry
          args={[3.75, 3.65]}
        />

        <meshStandardMaterial
          color="#18252b"
          emissive="#0e171c"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh
        position={[0, 0, 0.2]}
      >
        <boxGeometry
          args={[0.08, 3.65, 0.04]}
        />

        <meshStandardMaterial
          color="#37342f"
        />
      </mesh>

      <mesh
        position={[0, 0, 0.2]}
      >
        <boxGeometry
          args={[3.75, 0.08, 0.04]}
        />

        <meshStandardMaterial
          color="#37342f"
        />
      </mesh>

      <mesh
        position={[0, 2.05, 0]}
      >
        <boxGeometry
          args={[4.5, 0.25, 0.35]}
        />

        <meshStandardMaterial
          color="#38332d"
        />
      </mesh>

      <Text
        position={[0, -2.45, 0.15]}
        fontSize={0.12}
        color="#b8afa2"
        anchorX="center"
      >
        NIGHT VIEW
      </Text>
    </group>
  );
}

function Bed() {
  return (
    <group position={[-4.3, -1.65, -0.8]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry
          args={[4.5, 0.55, 6]}
        />

        <meshStandardMaterial
          color="#292725"
          roughness={0.9}
        />
      </mesh>

      <RoundedBox
        args={[4.3, 0.42, 5.8]}
        radius={0.12}
        smoothness={4}
        position={[0, 0.42, 0]}
      >
        <meshStandardMaterial
          color="#514b43"
          roughness={0.95}
        />
      </RoundedBox>

      <RoundedBox
        args={[4.2, 0.5, 2]}
        radius={0.14}
        smoothness={4}
        position={[0, 0.83, -1.8]}
      >
        <meshStandardMaterial
          color="#3d3934"
          roughness={0.9}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.7, 0.25, 1.2]}
        radius={0.12}
        smoothness={4}
        position={[-1.05, 0.78, -2.1]}
      >
        <meshStandardMaterial
          color="#8b8174"
          roughness={0.9}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.7, 0.25, 1.2]}
        radius={0.12}
        smoothness={4}
        position={[1.05, 0.78, -2.1]}
      >
        <meshStandardMaterial
          color="#72695e"
          roughness={0.9}
        />
      </RoundedBox>

      <mesh position={[-2.15, -0.6, 0]}>
        <boxGeometry
          args={[0.18, 1.8, 0.18]}
        />

        <meshStandardMaterial
          color="#302d29"
        />
      </mesh>

      <mesh position={[2.15, -0.6, 0]}>
        <boxGeometry
          args={[0.18, 1.8, 0.18]}
        />

        <meshStandardMaterial
          color="#302d29"
        />
      </mesh>
    </group>
  );
}

function BedsideTable() {
  return (
    <group position={[-1.1, -1.55, -3.1]}>
      <RoundedBox
        args={[1.3, 1.6, 1.2]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#342e28"
          roughness={0.65}
        />
      </RoundedBox>

      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry
          args={[0.18, 0.18, 0.08, 24]}
        />

        <meshStandardMaterial
          color="#b8a68e"
        />
      </mesh>

      <pointLight
        position={[0, 1.3, 0]}
        intensity={1.5}
        distance={4}
        color="#e6cda7"
      />
    </group>
  );
}

function Desk({ onSelect }) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <group
      position={[3.6, -1.5, -2.6]}
      onClick={() => onSelect("projects")}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      <RoundedBox
        args={[6.2, 0.38, 2.4]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#46382c"
          roughness={0.55}
          metalness={0.08}
        />
      </RoundedBox>

      <mesh
        position={[-2.5, -1.6, 0]}
      >
        <boxGeometry
          args={[0.28, 3, 0.28]}
        />

        <meshStandardMaterial
          color="#302821"
        />
      </mesh>

      <mesh
        position={[2.5, -1.6, 0]}
      >
        <boxGeometry
          args={[0.28, 3, 0.28]}
        />

        <meshStandardMaterial
          color="#302821"
        />
      </mesh>

      <mesh
        position={[-1.7, -1.6, 0]}
      >
        <boxGeometry
          args={[0.18, 3, 0.18]}
        />

        <meshStandardMaterial
          color="#302821"
        />
      </mesh>

      <Text
        position={[0, 0.45, 1.05]}
        fontSize={0.1}
        color="#b8afa2"
        anchorX="center"
      >
        CLICK MONITOR TO EXPLORE PROJECTS
      </Text>

      {hovered && (
        <pointLight
          position={[0, 1.2, 1]}
          intensity={3}
          distance={4}
          color="#b9d6d8"
        />
      )}
    </group>
  );
}

function Monitor() {
  return (
    <group
      position={[3.6, 0.45, -2.95]}
    >
      <RoundedBox
        args={[3.9, 2.35, 0.16]}
        radius={0.07}
        smoothness={5}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      <mesh
        position={[0, 0, 0.1]}
      >
        <planeGeometry
          args={[3.55, 2]}
        />

        <meshStandardMaterial
          color="#171b1b"
          emissive="#1b2726"
          emissiveIntensity={0.4}
        />
      </mesh>

      <Text
        position={[0, 0.62, 0.19]}
        fontSize={0.13}
        color="#b8d3d0"
        anchorX="center"
      >
        DEVELOPER DESK
      </Text>

      <Text
        position={[0, 0.15, 0.19]}
        fontSize={0.3}
        color="#eee9e1"
        anchorX="center"
      >
        SWARA
      </Text>

      <Text
        position={[0, -0.32, 0.19]}
        fontSize={0.13}
        color="#a79f94"
        anchorX="center"
      >
        BUILDING DIGITAL EXPERIENCES
      </Text>

      <mesh
        position={[0, -1.45, 0]}
      >
        <boxGeometry
          args={[0.18, 1.3, 0.18]}
        />

        <meshStandardMaterial
          color="#262626"
        />
      </mesh>

      <mesh
        position={[0, -2.05, 0]}
      >
        <boxGeometry
          args={[1.1, 0.12, 0.55]}
        />

        <meshStandardMaterial
          color="#262626"
        />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[3.6, -1.02, -1.55]}>
      <RoundedBox
        args={[2.6, 0.12, 0.85]}
        radius={0.04}
        smoothness={3}
      >
        <meshStandardMaterial
          color="#171717"
          roughness={0.35}
        />
      </RoundedBox>

      {Array.from({
        length: 5,
      }).map((_, row) =>
        Array.from({
          length: 11,
        }).map((_, column) => (
          <mesh
            key={`${row}-${column}`}
            position={[
              -1.02 +
                column * 0.2,
              -0.92,
              -1.84 +
                row * 0.13,
            ]}
          >
            <boxGeometry
              args={[
                0.14,
                0.035,
                0.08,
              ]}
            />

            <meshStandardMaterial
              color="#514c45"
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mouse() {
  return (
    <mesh
      position={[5.2, -0.92, -1.55]}
      scale={[0.65, 0.3, 0.9]}
    >
      <sphereGeometry
        args={[0.25, 24, 16]}
      />

      <meshStandardMaterial
        color="#191919"
        roughness={0.3}
      />
    </mesh>
  );
}

function Chair() {
  return (
    <group position={[3.6, -1.8, 0.2]}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry
          args={[1.8, 0.3, 1.7]}
        />

        <meshStandardMaterial
          color="#252525"
          roughness={0.75}
        />
      </mesh>

      <mesh position={[0, 1.65, 0.45]}>
        <boxGeometry
          args={[1.65, 2, 0.3]}
        />

        <meshStandardMaterial
          color="#222222"
          roughness={0.75}
        />
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry
          args={[0.12, 0.16, 1.5, 16]}
        />

        <meshStandardMaterial
          color="#161616"
        />
      </mesh>

      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry
          args={[0.75, 0.75, 0.08, 16]}
        />

        <meshStandardMaterial
          color="#191919"
        />
      </mesh>
    </group>
  );
}

function PC({ onSelect }) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <group
      position={[6.6, -0.8, -2.35]}
      onClick={() => onSelect("skills")}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      <RoundedBox
        args={[1.25, 2.7, 1.25]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#191817"
          metalness={0.45}
          roughness={0.3}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.64]}>
        <planeGeometry
          args={[0.85, 2.1]}
        />

        <meshStandardMaterial
          color="#18201f"
          emissive="#27403c"
          emissiveIntensity={
            hovered ? 0.8 : 0.3
          }
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[0, 0.65, 0.68]}>
        <sphereGeometry
          args={[0.14, 20, 20]}
        />

        <meshStandardMaterial
          color="#9dbdb6"
          emissive="#8bb7ad"
          emissiveIntensity={
            hovered ? 3 : 1
          }
        />
      </mesh>

      <Text
        position={[0, -1.85, 0.65]}
        fontSize={0.09}
        color="#b8afa2"
        anchorX="center"
      >
        TECH STACK
      </Text>
    </group>
  );
}

function Bookshelf({ onSelect }) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <group
      position={[-6.8, -0.5, -4.8]}
      onClick={() => onSelect("about")}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      <mesh>
        <boxGeometry
          args={[2.5, 5.5, 0.7]}
        />

        <meshStandardMaterial
          color="#3b3027"
          roughness={0.7}
        />
      </mesh>

      {[1.4, 0, -1.4].map(
        (y) => (
          <mesh
            key={y}
            position={[0, y, 0.42]}
          >
            <boxGeometry
              args={[2.25, 0.08, 0.1]}
            />

            <meshStandardMaterial
              color="#6a5544"
            />
          </mesh>
        )
      )}

      {Array.from({
        length: 12,
      }).map((_, index) => (
        <mesh
          key={index}
          position={[
            -0.75 +
              (index % 4) *
                0.5,
            1.8 -
              Math.floor(
                index / 4
              ) * 1.4,
            0.47,
          ]}
          rotation={[
            0,
            0,
            index % 3 === 0
              ? 0.08
              : 0,
          ]}
        >
          <boxGeometry
            args={[
              0.28,
              0.9,
              0.16,
            ]}
          />

          <meshStandardMaterial
            color={
              index % 2 === 0
                ? "#6d665d"
                : "#84776a"
            }
          />
        </mesh>
      ))}

      {hovered && (
        <pointLight
          position={[0, 1, 1]}
          intensity={2}
          distance={3}
          color="#d7c8ae"
        />
      )}
    </group>
  );
}

function Plant({ position, scale = 1 }) {
  return (
    <group
      position={position}
      scale={scale}
    >
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry
          args={[
            0.55,
            0.7,
            0.8,
            20,
          ]}
        />

        <meshStandardMaterial
          color="#4c3d30"
        />
      </mesh>

      {[
        [-0.35, 0.25, 0],
        [0.3, 0.35, 0.1],
        [0, 0.55, 0],
        [-0.1, 0.25, 0.3],
      ].map((p, index) => (
        <mesh
          key={index}
          position={p}
          rotation={[
            index * 0.2,
            index * 0.3,
            index % 2
              ? -0.4
              : 0.4,
          ]}
        >
          <sphereGeometry
            args={[
              0.4,
              12,
              12,
            ]}
          />

          <meshStandardMaterial
            color={
              index % 2 === 0
                ? "#3f5142"
                : "#52644f"
            }
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function WallFrames({ onSelect }) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <group
      position={[0, 2.5, -5.82]}
      onClick={() =>
        onSelect("achievements")
      }
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      {[
        [-2.6, 0],
        [0, 0.3],
        [2.6, 0],
      ].map((p, index) => (
        <group
          key={index}
          position={[
            p[0],
            p[1],
            0,
          ]}
          rotation={[
            0,
            0,
            index === 1
              ? -0.025
              : 0,
          ]}
        >
          <mesh>
            <boxGeometry
              args={[
                1.8,
                1.4,
                0.1,
              ]}
            />

            <meshStandardMaterial
              color="#40372e"
            />
          </mesh>

          <mesh
            position={[
              0,
              0,
              0.07,
            ]}
          >
            <planeGeometry
              args={[
                1.55,
                1.15,
              ]}
            />

            <meshStandardMaterial
              color={
                index === 0
                  ? "#776f63"
                  : index === 1
                  ? "#9a8e7e"
                  : "#625b53"
              }
            />
          </mesh>

          <Text
            position={[
              0,
              0,
              0.14,
            ]}
            fontSize={0.12}
            color="#25221e"
            anchorX="center"
          >
            {index === 0
              ? "PROMPT WARS"
              : index === 1
              ? "PROJECTS"
              : "BUILD"}
          </Text>
        </group>
      ))}

      {hovered && (
        <pointLight
          position={[0, 0, 1]}
          intensity={2}
          distance={4}
          color="#d7c8ae"
        />
      )}
    </group>
  );
}

function Phone({
  onSelect,
}) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <group
      position={[5.4, -0.82, -1.5]}
      rotation={[
        0,
        0.1,
        0,
      ]}
      onClick={() =>
        onSelect("contact")
      }
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor =
          "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor =
          "default";
      }}
    >
      <RoundedBox
        args={[0.65, 0.12, 1.25]}
        radius={0.06}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#171717"
          metalness={0.6}
        />
      </RoundedBox>

      <mesh
        position={[0, 0.07, 0]}
      >
        <planeGeometry
          args={[0.5, 1]}
        />

        <meshStandardMaterial
          color="#222725"
          emissive="#34423e"
          emissiveIntensity={
            hovered ? 0.6 : 0.2
          }
        />
      </mesh>
    </group>
  );
}

function RoomScene({ onSelect }) {
  return (
    <>
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[-4, 8, 4]}
        intensity={1.8}
        color="#fff7eb"
      />

      <pointLight
        position={[-4, 2, -3]}
        intensity={3}
        distance={8}
        color="#d5b98f"
      />

      <pointLight
        position={[4, 2, -4]}
        intensity={2.5}
        distance={7}
        color="#9eb8b1"
      />

      <Room />

      <Window />

      <Bed />

      <BedsideTable />

      <Desk onSelect={onSelect} />

      <Monitor />

      <Keyboard />

      <Mouse />

      <Chair />

      <PC onSelect={onSelect} />

      <Bookshelf
        onSelect={onSelect}
      />

      <Plant
        position={[-6.2, -1.2, -1.8]}
        scale={1.1}
      />

      <Plant
        position={[7.2, -1.2, -4.2]}
        scale={0.8}
      />

      <WallFrames
        onSelect={onSelect}
      />

      <Phone onSelect={onSelect} />

      <ContactShadows
        position={[0, -2.95, 0]}
        opacity={0.55}
        scale={18}
        blur={2.8}
        far={8}
      />

      <Environment
        preset="apartment"
        environmentIntensity={0.35}
      />

      <CameraController
        view="home"
      />
    </>
  );
}

function ProjectPanel({
  project,
  onClose,
}) {
  return (
    <div className="panel-overlay">
      <div className="content-panel project-panel">
        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="eyebrow">
          PROJECT {project.number}
        </div>

        <h2>{project.title}</h2>

        <div className="panel-type">
          {project.type}
        </div>

        <p>
          {project.description}
        </p>

        <div className="stack">
          {project.stack.map(
            (item) => (
              <span key={item}>
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function SectionPanel({
  section,
  onClose,
}) {
  const content = {
    about: {
      eyebrow: "ABOUT ME",
      title: "THE PERSON BEHIND THE DESK.",
      text:
        "I'm a Information Technology engineering student who enjoys turning ideas into interactive digital experiences. I work across frontend development, AI-powered applications and problem solving.",
    },

    achievements: {
      eyebrow: "ACHIEVEMENTS",
      title: "THINGS I'VE BUILT AND LEARNED.",
      text:
        "Hackathons, projects and experiments have shaped my journey as a developer. I'm interested in building practical technology that solves real problems.",
    },

    contact: {
      eyebrow: "CONTACT",
      title: "LET'S BUILD SOMETHING.",
      text:
        "Have an idea, project or opportunity? I'd love to connect and build something meaningful together.",
    },
  };

  const item = content[section];

  return (
    <div className="panel-overlay">
      <div className="content-panel">
        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="eyebrow">
          {item.eyebrow}
        </div>

        <h2>{item.title}</h2>

        <p>{item.text}</p>

        {section ===
          "achievements" && (
          <div className="achievement-list">
            <div>
              <strong>
                PROMPT WARS
              </strong>
              <span>
                RANK 1222 · 60K+
                PARTICIPANTS
              </span>
            </div>

            <div>
              <strong>
                ARTISAN AI
              </strong>
              <span>
                AI MARKETPLACE
                APPLICATION
              </span>
            </div>

            <div>
              <strong>
                STADIUM OS AI
              </strong>
              <span>
                GENERATIVE AI
                PLATFORM
              </span>
            </div>
          </div>
        )}

        {section === "contact" && (
          <div className="contact-links">
            <button>
              GITHUB
              <span>↗</span>
            </button>

            <button>
              LINKEDIN
              <span>↗</span>
            </button>

            <button>
              EMAIL
              <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillsPanel({
  onClose,
}) {
  return (
    <div className="panel-overlay">
      <div className="content-panel skills-panel">
        <button
          className="close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="eyebrow">
          TECHNOLOGY
        </div>

        <h2>MY TOOLKIT.</h2>

        <div className="skills-list">
          {skills.map(
            ([name, type, level]) => (
              <div
                className="skill-row"
                key={name}
              >
                <div className="skill-info">
                  <div>
                    <span>
                      {type}
                    </span>

                    <strong>
                      {name}
                    </strong>
                  </div>

                  <b>{level}%</b>
                </div>

                <div className="skill-bar">
                  <i
                    style={{
                      width: `${level}%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] =
    useState("home");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const selectSection = (section) => {
    setSelectedProject(null);
    setActiveSection(section);
  };

  const closePanel = () => {
    setSelectedProject(null);
    setActiveSection("home");
  };

  return (
    <main className="portfolio">
      <Canvas
        camera={{
          position: [9.5, 3.4, 12],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        <RoomScene
          onSelect={selectSection}
        />
      </Canvas>

      <div className="overlay">
        <header className="topbar">
          <div className="brand">
            SWARA<span>.</span>
          </div>

          <div className="availability">
            <i />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <div className="year">
            2026
          </div>
        </header>

        {activeSection === "home" && (
          <>
            <section className="hero">
              <div className="hero-kicker">
                SOFTWARE DEVELOPER
              </div>

              <h1>
                BUILDING
                <br />
                <em>DIGITAL</em>
                <br />
                EXPERIENCES.
              </h1>

              <p>
                Welcome to my workspace.
                Explore the room to
                discover my projects,
                technology and journey.
              </p>

              <div className="hint">
                <span className="hint-dot" />
                EXPLORE THE ROOM
              </div>
            </section>

            <div className="room-label desk-label">
              <b>01</b>
              PROJECT DESK
            </div>

            <div className="room-label shelf-label">
              <b>02</b>
              MY JOURNEY
            </div>

            <div className="room-label pc-label">
              <b>03</b>
              TECHNOLOGY
            </div>

            <div className="room-label wall-label">
              <b>04</b>
              ACHIEVEMENTS
            </div>

            <div className="room-label phone-label">
              <b>05</b>
              CONTACT
            </div>
          </>
        )}

        {activeSection !== "home" &&
          !selectedProject && (
            <div className="section-header">
              <span>
                DEVELOPER ROOM
              </span>

              <h1>
                {activeSection ===
                  "projects" &&
                  "PROJECTS"}

                {activeSection ===
                  "about" &&
                  "ABOUT ME"}

                {activeSection ===
                  "skills" &&
                  "TECHNOLOGY"}

                {activeSection ===
                  "achievements" &&
                  "ACHIEVEMENTS"}

                {activeSection ===
                  "contact" &&
                  "CONTACT"}
              </h1>
            </div>
          )}

        <div className="bottom-bar">
          {activeSection === "home" ? (
            <span>
              A PORTFOLIO BUILT LIKE A ROOM
            </span>
          ) : (
            <button
              onClick={closePanel}
            >
              ← RETURN TO ROOM
            </button>
          )}

          <div className="location">
            INDIA · DEVELOPER ROOM
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectPanel
          project={selectedProject}
          onClose={closePanel}
        />
      )}

      {activeSection === "about" &&
        !selectedProject && (
          <SectionPanel
            section="about"
            onClose={closePanel}
          />
        )}

      {activeSection ===
        "achievements" &&
        !selectedProject && (
          <SectionPanel
            section="achievements"
            onClose={closePanel}
          />
        )}

      {activeSection === "contact" &&
        !selectedProject && (
          <SectionPanel
            section="contact"
            onClose={closePanel}
          />
        )}

      {activeSection === "skills" &&
        !selectedProject && (
          <SkillsPanel
            onClose={closePanel}
          />
        )}

      <div className="grain" />
      <div className="vignette" />
    </main>
  );
}