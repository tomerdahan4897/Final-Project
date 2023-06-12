import { useNavigate } from "react-router-dom";

const EmptyBag = () => {
  const nav = useNavigate();
  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center mt-5 border rounded p-3">
      <span
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        className="mb-3 text-orange"
      >
        Your Shopping Bag Is Empty!
      </span>
      <div
        className="btn btn-green1 mt-3"
        onClick={() => {
          nav("/shop");
        }}
      >
        Buy Now
      </div>
    </div>
  );
};

export default EmptyBag;
