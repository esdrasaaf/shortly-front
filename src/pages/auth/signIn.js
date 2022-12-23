import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState, useContext} from "react"
import { UserInfoContext } from "../../contexts/userInfo"
import BASE_URL from "../../constants/url"
import axios from "axios"
import LogoContainer from "../../constants/logo"
import Header from "../../constants/header"

export default function SignInPage () {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setToken } =  useContext(UserInfoContext)

    function postLogin (e) {
        e.preventDefault();
        const promisse = axios.post(`${BASE_URL}/signin`, { email, password });

        promisse.then((res) => {
            setToken(res.data)
            navigate("/home")
        })

        promisse.catch((err) => {
            alert(err.data)
        })
    }

    return (
        <Container>
            <Header/>
            <LogoContainer/>

            <FormContainer onSubmit={postLogin}>
                <input required type="email" onChange={(e) => setEmail(e.target.value)} placeholder={"E-mail"}/>
                <input required type="password" onChange={(e) => setPassword(e.target.value)} placeholder={"Senha"}/>
                <button> Entrar </button>
            </FormContainer>
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    display: flex;
    padding-top: 100px;
    align-items: center;
    
    header {
        margin-bottom: 110px;
    }
`
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    margin-top: 110px;

    input {
        box-sizing: border-box;
        font-family: 'Lexend Deca';
        padding: 20px;
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;

        &::placeholder {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #9C9C9C;
        }
    }

    button {
        margin-top: 36px;
        box-sizing: border-box;
        width: 182px;
        height: 60px;
        background: #5D9040;
        border-radius: 12px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        color: #FFFFFF;
        cursor: pointer;
    }
`