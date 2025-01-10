import { Button } from "@/components/ui/button";
import HomeRobotImage from "../assets/robot-image/Robot-image-2x.png"


const Home = () => {
  return (
    <div className="font-bold text-2xl bg-[#804C9E] h-[73vh] px-20">
      <div className="flex items-center">
        {/* AURAS image  */}
        <div className="mr-16">
          <img className="min-w-80 min-h-80" src={HomeRobotImage} alt="" />
        </div>

        {/* AURAS intro */}
        <div className="space-y-5">
          <h1 className="text-3xl">Discover AURAS</h1>
          <p className="text-base leading-7 font-light	">Welcome to AURAS, your ultimate destination for custom Composable Commerce solutions. Explore our innovative Gen AI-powered chatbots designed to streamline your experience and provide expert assistance.</p>

          {/* search bar */}
          <div className="relative">
          <input className="w-full rounded-full text-base px-6 py-4 text-[#804C9E]" type="text" placeholder="Type your question here..." />
          <button className="absolute flex top-1/4 text-[#804C9E] right-5">Send</button>
          </div>
        
        {/* prompt buttons */}
          <div className="flex text-sm font-thin gap-5">
            <Button className="ring-1 ring-gray-300 bg-slate-50/20 px-3 py-1 rounded-full">What is Auras ?</Button>
            <Button className="ring-1 ring-gray-300 bg-slate-50/20 px-3 py-1 rounded-full">What is Composable Commerce?</Button>
            <Button className="ring-1 ring-gray-300 bg-slate-50/20 px-3 py-1 rounded-full">How to migrate to Composable Commerce?</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
