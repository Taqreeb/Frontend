//main page export
export {default as App} from './App'

//component exports
export {default as Navbar}  from  "./components/Navbar";

//page exports
export {default as Home}  from   "./pages/Home";
export {default as Contact}  from  "./pages/Contact";
export {default as Events}  from   "./pages/Events";
export {default as Login} from './pages/Login'
export {default as SignupVendor} from './pages/SignupVendor'
export {default as SignupUser} from './pages/SignupUser'
export {default as About}  from './pages/About'
export {default as PageNotFound} from "./pages/PageNotFound"

//dependencies
export * from 'react-router-dom'
