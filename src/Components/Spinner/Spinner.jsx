import React from 'react'
import spinner1 from '../Spinner/loading.gif'

const Spinner = () => {
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center">
            <img src={spinner1} alt="" className='img-fluid contact-img' />
        </div>
    </div>
  )
}

export default Spinner