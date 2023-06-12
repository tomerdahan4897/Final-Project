import { useNavigate } from 'react-router-dom'
import {BiSad} from 'react-icons/bi';
import css from './NotFound.module.scss';

const NotFound = () => {
  const nav= useNavigate();
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <h1 className={css.firstTitle}>404</h1>
        <BiSad 
        size={300}
        color={"#8c9674"}
        />
        <h2 className={css.secondTitle}>Page Not Found</h2>
        <div className='mb-5'><button className='btn btn-orange' onClick={()=> {nav('/')}}>Click To Home Page</button></div>
    </div>
  )
}

export default NotFound