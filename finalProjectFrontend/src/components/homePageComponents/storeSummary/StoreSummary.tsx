import css from "./StoreSummary.module.scss";
import storePic from "../../../assets/coverPics/storeCoverPic.jpg";
import { useNavigate } from "react-router-dom";

const StoreSummary = () => {
  const nav = useNavigate();
  return (
    <div className={css.mainBox}>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${css.textBox}`}
      >
        <h2>We Are Go Nature!</h2>
        <p style={{ textAlign: "center" }}>
          It all started in 1970. We started our agricultural journey in Moshav
          Shaar Yishuv in the north of the country. In beautiful, spacious
          plantations, as only Israeli agriculture can look like. We started
          growing peaches, nectarines, plums and apples. And over the years, we
          started selling the product in the wholesale market.
        </p>
        <button
          className="btn btn-orange mb-5"
          onClick={() => {
            nav("/about");
          }}
        >
          Read More
        </button>
      </div>

      <img
        className={css.pic}
        width={500}
        height={300}
        src={storePic}
        alt="store"
      />
    </div>
  );
};

export default StoreSummary;
