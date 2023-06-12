import css from "./NutsSummary.module.scss";
import nutsPic from "../../../assets/coverPics/nutsCooverPic.jpg";
import { useNavigate } from "react-router-dom";

const NutsSummary = () => {
  const nav = useNavigate();
  return (
    <div className={css.mainBox}>
      <img
        className={css.pic}
        width={500}
        height={300}
        src={nutsPic}
        alt="nuts"
      />

      <div
        className={`d-flex flex-column justify-content-center align-items-center ${css.textBox}`}
      >
        <h2>Our Nuts</h2>
        <p style={{ textAlign: "center" }}>
          At GoNature we believe in a healthy life and proper nutrition, so with
          us you will find types of crackers and health products, gluten-free
          products, a reduced sodium series and a variety of other products
          adapted to our healthy lives today.
        </p>
        <button
          className="btn btn-orange mb-5"
          onClick={() => {
            nav("/shop/nuts");
          }}
        >
          Buy Nuts
        </button>
      </div>
    </div>
  );
};

export default NutsSummary;
