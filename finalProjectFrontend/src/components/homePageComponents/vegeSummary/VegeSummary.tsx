import css from "./VegeSummary.module.scss";
import vegePic from "../../../assets/coverPics/vegeCoverPic.jpg";
import { useNavigate } from "react-router-dom";

const VegeSummary = () => {
  const nav = useNavigate();
  return (
    <div className={css.mainBox}>
      <img
        className={css.pic}
        width={500}
        height={300}
        src={vegePic}
        alt="vegetables"
      />

      <div
        className={`d-flex flex-column justify-content-center align-items-center ${css.textBox}`}
      >
        <h2>Our Vegetables</h2>
        <p style={{ textAlign: "center" }}>
          GoNature's vegetables are something special and come in their prime.
          Whether you want to make a salad for lunch or just design a rich and
          colorful vegetable plate for the guests who arrive, you cannot miss
          the special flavors that come straight from the field.
        </p>
        <button
          className="btn btn-orange mb-5"
          onClick={() => {
            nav("/shop/vegetables");
          }}
        >
          Buy Vegetables
        </button>
      </div>
    </div>
  );
};

export default VegeSummary;
