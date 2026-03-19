"use client";

import { useTheme } from "../ThemeProvider";
import Starfield from "./Starfield";
import ShootingStars from "./ShootingStars";
import Nebula from "./Nebula";
import Planet from "./Planet";

export default function SpaceBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Starfield isDark={isDark} />
      <Nebula isDark={isDark} />
      <ShootingStars isDark={isDark} />
      <Planet isDark={isDark} />
    </>
  );
}
