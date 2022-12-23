import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BASE_URL from "../../constants/url"
import axios from "axios"
import LogoContainer from "../../constants/logo"
import Header from "../../constants/header"


export default function SignUpPage () {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function postRegister (e) {
        e.preventDefault()
        if (confirmPassword !== password) {
            return alert(`Algo deu errado! Dados do perfil inválidos`)
        }
        const promisse = axios.post(`${BASE_URL}/signup`, {name, email, password, confirmPassword});

        promisse.then((res) => {
            navigate("/")
            console.log(res.data)
        })

        promisse.catch((err) => {
            alert(err.response.data)
        })
    }

    return (
        <Container>
            <Header/>
            <LogoContainer/>

            <FormContainer onSubmit={postRegister}>
                <input required type="text" onChange={(e) => setName(e.target.value)} placeholder={"Digite o seu nome"}/>
                <input required type="email" onChange={(e) => setEmail(e.target.value)} placeholder={"E-mail"}/>
                <input required type="password" onChange={(e) => setPassword(e.target.value)} placeholder={"Senha"}/>
                <input required type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder={"Confirme a senha"}/>
                <button> Logar </button>
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