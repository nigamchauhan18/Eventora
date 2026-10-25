import { Fragment } from 'react'
import AdminNavbar from '../../shares/AdminNavbar'
import AdminFooter from '../../shares/AdminFooter'
import AdminSidebar from '../../shares/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminLanding() {
  return (
    <Fragment>
        <AdminNavbar />
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-auto p-0'>
                    <AdminSidebar />
                </div>
                {/* <main className="col p-0"> */}
                  {/* <Outlet></Outlet> */}
                {/* </main> */}
            </div>
        </div>
        <AdminFooter />
    </Fragment>
  )
}

export default AdminLanding;
