import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserInfoContext } from "../contexts/userInfo";

export default function Header ({name}) {
    const navigate = useNavigate()
    const { token, status, setStatus } = useContext(UserInfoContext)

    function clickValidationEntrar () {
        if (!status) {
            navigate('/')
            setStatus(true)
        }
    }   
    
    function clickValidationCadastrar () {
        if (status) {
            navigate('/sign-up')
            setStatus(false)
        }
    }

    return (
        <Container>
            {
                token === ''
                    ?
                <AuthHeader status={status}>
                    <span onClick={clickValidationEntrar}>Entrar</span>
                    <h1 onClick={clickValidationCadastrar}>Cadastrar-se</h1>
                </AuthHeader>
                    :
                <HomeHeader>
                    <h1>Seja bem-vindo(a), {name}!</h1>

                    <div>
                        <Link to={'/home'}>Home</Link>
                        <Link to={'/ranking'}>Ranking</Link>
                        <Link to={'/'}>Sair</Link>
                    </div>
                </HomeHeader>
            }
            
        </Container>
    )
}

//Styled COmponent
const Container = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: right;
    width: 100vw;
    height: 100px;    
`
const AuthHeader = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    padding-right: 10%;
    gap: 20px;

    span { color: ${props => props.status ? '#5D9040' : '#9c9c9c'}; cursor: pointer; }
    h1 { color: ${props => !props.status ? '#5D9040' : '#9c9c9c'}; cursor: pointer; }
`
const HomeHeader = styled.div`
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    padding-right: 10%;
    padding-left: 10%;
    gap: 20px;

    h1 { color: #5D9040; cursor: pointer; }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 200px;

        a { text-decoration: none; color: #9c9c9c; }
    }

    span { cursor: pointer; }
`