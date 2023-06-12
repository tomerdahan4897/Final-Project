import css from './ShopFooter.module.scss';
import { Link } from 'react-router-dom';

const ShopFooter = () => {
  return (
        <div className={` ${css.mainBox} d-flex flex-column justify-content-start align-items-center`}>
        <h4>Shop Now</h4>
        <Link className={css.link} to="/shop">Buy Now</Link>
        <Link className={css.link} to="/shop/vegetables">Our Vegetables</Link>
        <Link className={css.link} to="/shop/fruits">Our Fruits</Link>
        <Link className={css.link} to="/shop/nuts">Our Nuts</Link>
    </div>
  )
}

export default ShopFooter;