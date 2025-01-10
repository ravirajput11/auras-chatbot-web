import aurasLogo2x from "../assets/auras-logo/auras-logo-1x.png";
import aspiresSystemLogo2x from "../assets/aspires-system-logo/aspire_systems_logo_rgb_a_white.png";
const SecondaryHeader = () => {
  return (
    <>
      <header className="fixed bg-[#804C9E] w-full h-24 z-10  px-20">
      <div className="w-full flex justify-between">
        <img className=" w-32 object-contain" src={aurasLogo2x} alt="" />
        <img className="w-40 object-contain" src={aspiresSystemLogo2x} alt="" />
      </div>
      </header>
    </>
  );
};

export default SecondaryHeader;
