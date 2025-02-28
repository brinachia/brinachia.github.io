import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const checkScreen = window.innerWidth<768;

export const projects = [
  {
    title: "Halza",
    url: "projects/halzareport.pdf",
    image: "projects/halza.jpg",
    description: "UX/UI project for web portal and app.",
  },
  {
    title: "Fullerverse",
    url: "projects/fullerverse.pdf",
    image: "projects/full.jpg",
    description: "A gamified interactive UX/UI prototype project for my internship.",
  },
  {
    title: "Cuppuccino",
    url: "projects/cuppuccino.pdf",
    image: "projects/cup.jpg",
    description: "A cafe app project completed for my DES396 module.",
  },
  {
    title: "Dialect Nation SG",
    url: "projects/dialectnationsg.pdf",
    image: "projects/dnsg.jpg",
    description: "Designing a dialect, learning, gamification app for my DES260 module.",
  },
  /*{
    title: "C.O.V.E.R.T",
    url: "projects/covert.pdf",
    image: "projects/co.jpg",
    description: "An interactive mockup showcasing the UXUI of a game concept.",
  },*/
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.65, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 5));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1.5}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: checkScreen ? 0 + (index - currentProject) * 4 : 0 + (index - currentProject) * 4.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
            scale: checkScreen ? 1.5 : 1.4,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};