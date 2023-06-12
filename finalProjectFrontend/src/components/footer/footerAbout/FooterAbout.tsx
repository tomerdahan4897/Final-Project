import css from './FooterAbout.module.scss';
import { Link } from 'react-router-dom';

const FooterAbout = () => {
  return (
    <div className={` ${css.mainBox} d-flex flex-column justify-content-center align-items-center`}>
        <h4>About</h4>
        <Link className={css.link} to="/about">About Us</Link>
        <Link className={css.link} to="/signup">Sign Up</Link>
        <Link className={css.link} to="/contactus">Contact Us</Link>
    </div>
  )
}

export default FooterAbout