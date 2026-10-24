import { Fragment } from 'react'
import Header from '../../shares/Header'
import Footer from '../../shares/Footer'
// import Sidebar from '../../shares/Sidebar'
// import Mainpage from './Mainpage'
// import { Outlet } from 'react-router-dom'

function Landingpage() {
  return (
    <Fragment>
        <Header />
        <Footer />
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-2 border'>
                    
                </div>
                <div className='col-10 border ch'>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Landingpage
