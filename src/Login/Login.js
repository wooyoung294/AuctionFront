import React, {useRef, useState} from 'react';
import logoImage from '../assets/img/LoginLogo.png';
import JoinModal from "./JoinModal";
import {useNavigate} from "react-router-dom";
import axios from "../Config/AxiosConfig";


function Login() {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputValue, setInputValue] = useState({id: null, password: null});
    const idInputRef = useRef();
    const pwInputRef = useRef();
    const handledLoginInput = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    };
    const handledLogin = async () => {
        const {id, password} = inputValue;
        if (!id) {
            alert('ID 가 공백입니다.');
            idInputRef.current.focus()

        } else if (!password) {
            alert('PASSWORD 가 공백입니다.');
            pwInputRef.current.focus()
        } else {
            const res = await axios.post('/login',
                {id, password},
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            if(!res.data) alert('사용자 정보가 존재하지 않습니다.')
            else{
                sessionStorage.setItem('profile',JSON.stringify(res.data));
                navigate('/list');
            }
        }
    };
    return (
        <>
            <div className='LoginParentWrapper'>
                <div className={'LoginWrapper'}>
                    <img style={{width: '50%'}} src={logoImage} alt={"LOGO"}/>
                    <div className={'LoginWrapperItem'}>
                        <div className={'LoginTitleWrapper'}>
                            Auction
                        </div>
                        <div className={'LoginItemWrapper'}>
                            <input
                                type="text"
                                name='id'
                                ref={idInputRef}
                                placeholder={'ID'}
                                autoFocus={true}
                                onChange={handledLoginInput}
                            />
                            <input
                                type="password"
                                name='password'
                                ref={pwInputRef}
                                placeholder={'PASSWORD'}
                                onChange={handledLoginInput}
                            />
                            <span onClick={handleShow}>Already a member?</span>
                        </div>
                        <div className={'LoginButtonWrapper'}>
                            <button onClick={handledLogin}>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
            <JoinModal show={show} handleClose={handleClose}/>
        </>
    );
}

export default Login;