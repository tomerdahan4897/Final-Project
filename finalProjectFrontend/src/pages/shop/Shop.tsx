import Fruits from '../../services/Fruits'
import Nuts from '../../services/Nuts'
import Vegetables from '../../services/Vegetables'

const Shop = () => {
  return (
    <div>
      <h1 className='text-center text-brown mt-3'>Shop</h1>
      <hr />
      <Vegetables/>
      <hr />
      <Fruits/>
      <hr />
      <Nuts/>
    </div>
  )
}

export default Shop;