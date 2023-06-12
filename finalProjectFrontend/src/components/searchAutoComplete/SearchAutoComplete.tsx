import Form from "react-bootstrap/Form";
import { ProductsForSearch } from "../productsForSearch/ProductsForSearch";
import { useState } from "react";
import css from "./SearchAutoComplete.module.scss";
const SearchAutoComplete = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.mainDiv}>
      <Form className="d-flex me-auto">
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="me-2"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 100);
          }}
        />
        <ProductsForSearch inputValue={inputValue} isOpen={isOpen} />
      </Form>
    </div>
  );
};

export default SearchAutoComplete;
