import { useNavigate } from "react-router-dom";
import FruitsSummary from "../../components/homePageComponents/fruitsSummary/FruitsSummary";
import NutsSummary from "../../components/homePageComponents/nutsSummary/NutsSummary";
import StoreSummary from "../../components/homePageComponents/storeSummary/StoreSummary";
import VegeSummary from "../../components/homePageComponents/vegeSummary/VegeSummary";
import Counters from "../../components/counters/Counters";
import { MdOutlineEmojiNature } from "react-icons/md";

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center text-brown mt-3">
        <MdOutlineEmojiNature size={45} color="#8c9674" /> Go Nature!
      </h1>
      <StoreSummary />
      <Counters />
      <VegeSummary />
      <FruitsSummary />
      <NutsSummary />

      <button
        className="btn btn-green1 mb-5"
        onClick={() => {
          nav("/shop");
        }}
      >
        Buy Now!
      </button>
    </div>
  );
};

export default Home;
