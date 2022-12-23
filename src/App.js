import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from './assets/styles/globalStyle'
import UserInfoProvider from './contexts/userInfo'
import SignInPage from './pages/auth/signIn'
import SignUpPage from './pages/auth/signUp'
import HomePage from './pages/home/home'
import RankingPage from './pages/ranking/ranking'

export default function App () {
    return (
        <BrowserRouter>
            <GlobalStyle/>
            <UserInfoProvider>
                <Routes>
                    <Route path='/' element={<SignInPage/>}/>
                    <Route path='/sign-in' element={<SignInPage/>}/>
                    <Route path='/sign-up' element={<SignUpPage/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/ranking' element={<RankingPage/>}/>
                </Routes>
            </UserInfoProvider>
        </BrowserRouter>
    )
}