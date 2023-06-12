import MainAboutBox from "../../components/aboutPageComponents/mainAboutBox/MainAboutBox";
import OurStores from "../../components/aboutPageComponents/ourStores/OurStores";
const About = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center text-brown mt-3">About Us</h1>
      <MainAboutBox />
      <OurStores />
    </div>
  );
};

export default About;
