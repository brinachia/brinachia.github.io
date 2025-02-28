import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Interfaces } from "./components/interfaces";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "./components/ScrollManager";
import { Suspense, useEffect, useState } from "react";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Cursor } from "./components/Cursor";
import {LoadingScreen} from "./components/LoadingScreen";
function App() {

  const[section, setSection] = useState(0);
  const [started,setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(()=>{
    setMenuOpened(false);
  }, [section]);

  return (
    <>
    <LoadingScreen setStarted={setStarted} started={started} />
    <MotionConfig transition={{
      ...framerMotionConfig
    }}>
      <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
      <color attach="background" args={["#e6e7ff"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection}/>
          <Scroll>
            <Suspense>
              {started && (
              <Experience section = {section} menuOpened={menuOpened}/>
              )}
            </Suspense>
          </Scroll>
          <Scroll html>
            {started && <Interfaces setSection={setSection} />}
          </Scroll>
        </ ScrollControls>
      </Canvas>
      <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
      <Cursor />
    </MotionConfig>
    <Leva hidden />
    </>
  );
}

export default App;
