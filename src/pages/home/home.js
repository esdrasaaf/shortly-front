import styled from "styled-components";
import axios from "axios";
import Header from "../../constants/header";
import LogoContainer from "../../constants/logo";
import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../constants/url";
import { UserInfoContext } from "../../contexts/userInfo";
import { useNavigate } from "react-router-dom";
import trashIcon from '../../assets/images/trash.png'

export default function HomePage () {
    const { config, status, setStatus } = useContext(UserInfoContext)
    const navigate = useNavigate()
    const [link, setLink] = useState('')
    const [shotUrl, setShortUrl] = useState('')
    const [urls, setUrls] = useState([])
    const [name, setName] = useState('')
    const body = { url: link}

    useEffect(() => {
        const promisse = axios.get(`${BASE_URL}/users/me`, config);

        promisse.then((res) => {
           setUrls(res.data.shortenedUrls)
           setName(res.data.name)
           setLink('')
        });

        promisse.catch((err) => {
            alert(err.response.data)
            navigate('/sign-in')
        });
    }, [config, shotUrl, status])

    function postLink (e) {
        e.preventDefault ()
        
        const promisse = axios.post(`${BASE_URL}/urls/shorten`, body, config);

        promisse.then((res) => {
            setShortUrl(res.data)
         });
 
         promisse.catch((err) => {
             alert(err.response.data)
             navigate('/sign-in')
         });         
    }

    function deleteUrl (id) {
        const promisse = axios.delete(`${BASE_URL}/urls/${id}`, config);

        promisse.then((res) => {
            setStatus([])
         });
 
         promisse.catch((err) => {
             alert(err.response.data)
             navigate('/sign-in')
         }); 
    }

    return (
        <Container>
            <Header name={name}/>
            <LogoContainer/>

            <LinkForm onSubmit={postLink}>
                <input required type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder={"Links que cabem no bolso!"}/>
                <button> Encurtar Link </button>
            </LinkForm>

            <List>
                {
                    urls.length === 0
                        ?
                    <h1> Você ainda não criou nenhum url encurtado! </h1>
                        :
                    urls.map((u, idx) => 
                        <ListItem key={idx}>
                            <div>
                                <span>{u.url}</span>
                                <span>{u.shortUrl}</span>
                                <span>Quantidade de visitantes: {u.visitCount}</span>
                            </div>
                            
                            <button onClick={() => deleteUrl(u.id)}>
                                <img src={trashIcon} alt="Lixeira"/>
                            </button>
                        </ListItem>
                    )
                }
            </List>
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`
const LinkForm = styled.form`
    margin-top: 150px;
    margin-bottom: 60px;

    input {
        box-sizing: border-box;
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        padding: 21px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        margin-right: 70px;

        ::placeholder {  
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #9C9C9C; 
        }
    }

    button {
        cursor: pointer;
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
    }
`
const List = styled.ul`
    box-sizing: border-box;
    gap: 40px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 15px;
        padding: 5px;
    }
    &::-webkit-scrollbar-track {
        background: none;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #80CC74;
        border-radius: 10px;
        border: 1px solid #ffffff;
    }

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 18px;
        color: gray;
    }
`
const ListItem = styled.li`
    display: flex;
    align-items: center;

    div {  
        display: flex;
        justify-content: space-between;
        padding: 0 90px 0 21px;
        align-items: center;
        width: 887px;
        height: 60px;
        background: #80CC74;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px 0px 0px 12px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #FFFFFF;
    }

    button {
        width: 130px;
        height: 60px;
        cursor: pointer;
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 0px 12px 12px 0px;
    }
`