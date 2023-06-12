import css from './FooterContactUs.module.scss';
import { Link } from 'react-router-dom';
import {BsTelephoneFill} from 'react-icons/bs'
import {FiMail} from 'react-icons/fi';
import {MdPlace} from 'react-icons/md';
import {BsLinkedin} from 'react-icons/bs';

const FooterContactUs = () => {
  return (
        <div className={css.semiBox}>

            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <div><BsTelephoneFill size={70} color="#adbf5a"/></div>
                <span className='text-yellow'>054-7002548</span>
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <div><FiMail size={70} color="#adbf5a"/> </div>
                <span className='text-yellow'>tomer.dahan10@gmail.com</span>
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <div><MdPlace size={70} color="#adbf5a"/></div>
                <span className='text-yellow'>Igal Alon 98, Tel Aviv</span>
            </div>

            <Link to="https://www.linkedin.com/in/tomer-dahan-fullstack-developer/" target={'_blank'} className='d-flex flex-column justify-content-center align-items-center gap-3 text-yellow text-decoration-none'>
                <div>
                    <BsLinkedin size={70} color="#adbf5a"/>
                </div>
                Click Here
            </Link>
        
        </div>

  )
}

export default FooterContactUs