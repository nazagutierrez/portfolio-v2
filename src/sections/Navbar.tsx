import GlassSurface from "@/components/GlassSurface";

const Navbar = () => {
  return (
    <GlassSurface
      width={400}
      height={70}
      borderRadius={20}
      displace={2}
      distortionScale={-80}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
      brightness={50}
      opacity={0.93}
      mixBlendMode="screen"
    >
      <ul className="flex text-main-white gap-x-8 px-10">
        <li className="inline-block text-lg hover:underline cursor-pointer">
          Home
        </li>
        <li className="inline-block text-lg hover:underline cursor-pointer">
          About
        </li>
        <li className="inline-block text-lg hover:underline cursor-pointer">
          Work
        </li>
        <li className="inline-block text-lg hover:underline cursor-pointer">
          Contact
        </li>
      </ul>
    </GlassSurface>
  );
};

export default Navbar;
