import css from "./FruitsSummary.module.scss";
import fruitsPic from "../../../assets/coverPics/fruitsCoverPic.jpg";
import { useNavigate } from "react-router-dom";

const FruitsSummary = () => {
  const nav = useNavigate();
  return (
    <div className={css.mainBox}>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${css.textBox}`}
      >
        <h2>Our Fruits</h2>
        <p style={{ textAlign: "center" }}>
          GoNature's fruits are something special and arrive at their peak
          freshness. Whether you want to make a fruit salad or just treat the
          family to a colorful plate of fruit for a night snack, you must not
          miss the special flavors that come straight from the field to the
          shelf.
        </p>
        <button
          className="btn btn-orange mb-5"
          onClick={() => {
            nav("/shop/fruits");
          }}
        >
          Buy Fruits
        </button>
      </div>

      <img
        className={css.pic}
        width={500}
        height={300}
        src={fruitsPic}
        alt="store"
      />
    </div>
  );
};

export default FruitsSummary;
