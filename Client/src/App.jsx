import {BrowserRouter , Navigate, Route  , Routes} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseROutes from './utils/RoleBaseROutes'
import AdminSummary from './components/dashBoard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EditComponent from './components/departments/EditComponent'
import EmployeeList from './components/employees/EmployeeList'
import AddEmployee from './components/employees/AddEmployee'
import View from './components/employees/View'
import EditEmployee from './components/employees/EditEmployee'
import AddSallary from './components/sallary/AddSallary'
import ViewSallary from './components/sallary/ViewSallary'
import Summary from './EmployeeDashboard/Summary'
import List from './leave/List'
import AddLeave from './leave/AddLeave'
import Setting from './EmployeeDashboard/Setting'
import Table from './leave/Table'
import LeaveDetails from './leave/LeaveDetails'
function App() {


  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Navigate to ="/admin-dashboard"/>} />
    <Route path='/login' element={<Login/>} />

    <Route path='/admin-dashboard' element={
      <PrivateRoutes>
        <RoleBaseROutes requiredRole={['admin']} >
        <AdminDashboard/>
        </RoleBaseROutes>
      </PrivateRoutes>
    }>
      <Route index element={<AdminSummary/>}></Route>
      <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
      <Route path='/admin-dashboard/add-new-department' element={<AddDepartment/>}></Route>
      <Route path='/admin-dashboard/department/:id' element={<EditComponent/>}></Route>


      <Route path='/admin-dashboard/employees' element={<EmployeeList/>}></Route>
      <Route path='/admin-dashboard/add-employee' element={<AddEmployee/>}></Route>
      <Route path='/admin-dashboard/employees/:id' element={<View/>}></Route>
      <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployee/>}></Route>
      <Route path='/admin-dashboard/sallary/add' element={<AddSallary/>}></Route>
      <Route path='/admin-dashboard/employees/sallary/:id' element={<ViewSallary/>}></Route>
      <Route path='/admin-dashboard/leaves' element={<Table/>}></Route>
      <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetails/>}></Route>
      <Route path='/admin-dashboard/employees/leaves/:id' element={<List/>}></Route>
      <Route path='/admin-dashboard/setting' element={<Setting/>}></Route>
       

      

    </Route>
    
    
    <Route path='/employee-dashboard' element={
      <PrivateRoutes>
        <RoleBaseROutes requiredRole={["admin","employee"]}>
        <EmployeeDashboard  />
        </RoleBaseROutes>
      </PrivateRoutes>
      }>
<Route  index  element={<Summary/>}></Route>
<Route path='/employee-dashboard/profile/:id'  element={<View/>} />
<Route path='/employee-dashboard/leaves/:id'  element={<List/>} />
<Route path='/employee-dashboard/add-leave'  element={<AddLeave/>} />
<Route path='/employee-dashboard/sallary/:id'  element={<ViewSallary/>} />
<Route path='/employee-dashboard/setting'  element={<Setting/>} />
</Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
