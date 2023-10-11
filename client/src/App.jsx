import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import LogInPage from './pages/LogInPage'
import MainLayout from './layout/MainLayout'
import SignUpPage from './pages/SignUpPage'
import {Provider} from "react-redux"
import store from "./store"
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='*' element={<PageNotFound/>}></Route>
              </Route>
              <Route path="/auth">
                <Route path="login" element={<LogInPage/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
