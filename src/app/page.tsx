import { HeroSectionOne } from "./components/Hero";
import PasswordGenerator from "./components/password-generator";
// import { WavyBackground } from "./components/wavy-background";

export default function Home() {
  return (
    <div className="relative">
      {/* <WavyBackground /> */}
      <HeroSectionOne />
      <PasswordGenerator/>
    </div>
  );
}
