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


      

    </Route>
    
    
    <Route path='/employee-dashboard' element={<EmployeeDashboard/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
