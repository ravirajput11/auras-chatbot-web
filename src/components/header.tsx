import aurasLogo2x from "../assets/auras-logo/auras-logo-2x.png";
import aspiresSystemLogo2x from "../assets/aspires-system-logo/aspire_systems_logo_rgb_a_white@2x.png";
const Header = () => {
  return (
    <>
      <header className="bg-[#804C9E] w-full h-full px-20">
      <div className="w-full flex justify-between">
        <img className="h-32 w-32 object-contain" src={aurasLogo2x} alt="" />
        <img className="h-40 w-40 object-contain" src={aspiresSystemLogo2x} alt="" />
      </div>
      </header>
    </>
  );
};

export default Header;
