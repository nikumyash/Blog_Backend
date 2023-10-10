import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import LogInPage from './pages/LogInPage'
import MainLayout from './layout/MainLayout'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
              </Route>
              <Route path="/auth">
                <Route path="login" element={<LogInPage/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
