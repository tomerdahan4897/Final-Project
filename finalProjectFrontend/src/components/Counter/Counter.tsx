import { useEffect, useState } from "react";
import css from "./Counter.module.scss";
import { CounterProps } from "../../@types";

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(props.quantity ? props.quantity : 0);

  useEffect(() => {
    props.onChange?.(count);
  }, [count]);

  const upCount = () => {
    setCount(count + 1);
  };
  const downCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <div className={`${css.clickers} btn btn-green1 m-2`} onClick={downCount}>
        -
      </div>
      <input
        className={css.countInput}
        type="text"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      ></input>
      <div className={`${css.clickers} btn btn-green1 m-2`} onClick={upCount}>
        +
      </div>
    </div>
  );
};

export default Counter;
