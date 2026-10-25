import { Fragment } from 'react'
import Header from '../../shares/Header'
import Footer from '../../shares/Footer'
import Sidebar from '../../shares/Sidebar'
import { Outlet } from 'react-router-dom'

function Landingpage() {
  return (
    <Fragment>
        <Header />
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-auto p-0'>
                 <Sidebar />
                </div>
                <main className="col p-0">
                  <Outlet></Outlet>
                </main>
            </div>
        </div>
        <Footer />
    </Fragment>
  )
}

export default Landingpage
