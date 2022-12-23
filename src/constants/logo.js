import styled from "styled-components";
import logo from '../assets/images/logo.png'

export default function LogoContainer () {
    return (
        <Container>
            <h1>Shortly</h1>
            <img src={logo} alt="Logo do shortly"/>
        </Container>
    )
}

//Styled COmponent
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 314px;
    height: 102px;
    gap: 8px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 200;
    font-size: 64px;
    line-height: 80px;
    color: #000000;
`