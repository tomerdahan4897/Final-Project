import css from './Footer.module.scss';
import FooterAbout from './footerAbout/FooterAbout';
import FooterContactUs from './footerContactUs/FooterContactUs';
import ShopFooter from './shopFooter/ShopFooter';
import SocialLinks from './socialLinks/SocialLinks';
import {AiOutlineCopyrightCircle} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className={css.mainFooter}>
      <div className={css.socialLinks}><SocialLinks/></div>
      <div className={css.footerAbout}><FooterAbout/></div>
      <div className={css.shopFooter}><ShopFooter/></div>
      <div className={css.footerContactUs}><FooterContactUs/></div>
      <div className={css.copyR}><p className='text-orange'> <AiOutlineCopyrightCircle color="#e05c16"/> All Right Reserved To Tomer Dahan 2023</p></div>
    </div>
  )
}

export default Footer;