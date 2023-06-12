import css from './SocialLinks.module.scss';
import {GrFacebook} from 'react-icons/gr';
import {BsInstagram} from 'react-icons/bs';
import {IoLogoYoutube} from 'react-icons/io';
import { Link } from 'react-router-dom';

const SocialLinks = () => {
  return (
    <div className='p-3 d-flex flex-row gap-4 justify-content-center align-items-center'>

        <Link to="">
            <GrFacebook 
            className={css.facebookLink} 
            size={35}/>
        </Link>

        <Link to="">
            <BsInstagram 
            className={css.instagramLink} 
            size={38}/>
        </Link>

        <Link to="">
            <IoLogoYoutube 
            className={css.youtubeLink}
            size={45}/>
        </Link>
    </div>
  )
}

export default SocialLinks