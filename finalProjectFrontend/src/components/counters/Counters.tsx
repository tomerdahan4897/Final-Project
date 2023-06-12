import css from './Counters.module.scss'

const Counters = () => {
  return (
        <div className={css.counters}>
            <div className={` ${css.customersDiv} d-flex flex-column justify-content-center align-items-center gap-5 bg-orange`}>
                <div className={css.customersCounter}></div>
                <span>Customers Every Week</span> 
            </div>
            <div className={` ${css.yearsDiv} d-flex flex-column justify-content-center align-items-center gap-5 bg-yellow`}>
                <div className={css.yearsCounter}></div>
                <span>Years Of Activity</span> 
            </div>
            <div className={` ${css.storesDiv} d-flex flex-column justify-content-center align-items-center gap-5 bg-green1`}>
                <div className={css.shopsCounter}></div>
                <span>Stores Across The Country </span> 
            </div>
      </div>
  )
}

export default Counters