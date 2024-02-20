import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "../Config/AxiosConfig";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import check from "../assets/img/check.svg";
function JoinModal({show, handleClose}) {
    const [joinUserData, setJoinUserData] = useState({id: null, checkedId:false,password: null, name: null})
    const {id, password, name, checkedId} = joinUserData;
    const onChangeJoinUserInput = (e) => {
        const {name, value} = e.target;
        setJoinUserData((prevValue) => (
            {
                ...prevValue,
                [name]: value
            }
        ))
        if(name === 'id'){
            setJoinUserData((prevValue) => (
                {
                    ...prevValue,
                    checkedId: false
                }
            ))
        }
    }
    const checkedDuplicateId = async () =>{
        if(!id){
            alert('아이디가 공백입니다.');
            return;
        }
        const res = await axios.get('/api/duplicateId?id='+id)
        if(res.data>0){
            alert('중복된 아이디가 있습니다.')
        }
        else{
            setJoinUserData((prevValue) => (
                {
                    ...prevValue,
                    checkedId: true
                }
            ))
        }
    }
    const joinUser = async () => {
        if(!id){
            alert('아이디가 공백입니다.');
            return;
        }
        else if(!password){
            alert('비밀번호가 공백입니다.');
            return;
        }
        else if(!name){
            alert('이름이 공백입니다.');
            return;
        }
        else if(!checkedId){
            alert('아이디 중복체크를 해주세요.');
            return;
        }
         const res = await axios.post('/api/createUser',
            {id, password, name},
            {
                headers: {'Content-Type': 'application/json'},
            }
        )
        if(res.data === 1){
            alert('가입을 축하드립니다!');
        }
        else{
            alert('가입에 실패하셨습니다!');
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton style={{background: '#fa6394'}}>
                    <Modal.Title style={{color: 'white'}}>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'LoginItemWrapper'}>
                        <InputGroup className="mb-3 mr-80W-inherit">
                            <Form.Control
                                className={'AuctionInput mr-0'}
                                name={'id'}
                                onChange={onChangeJoinUserInput}
                                placeholder={'ID'}
                                autoFocus={true}
                                type="text"
                            />
                            {checkedId&&<img src={check} alt={'check'} className={'checkImg'}/>}
                            <Button style={{background: '#fa6394', border: '#fa6394', height:'50%', marginTop:'12px'}} disabled={checkedId} onClick={checkedDuplicateId}>중복확인</Button>
                            {/*<InputGroup.Text className={'AuctionInputSubLabel'}>(원)</InputGroup.Text>*/}
                        </InputGroup>

                        <input
                            type="password"
                            name={'password'}
                            onChange={onChangeJoinUserInput}
                            placeholder={'PASSWORD'}
                        />
                        <input
                            type="text"
                            name={'name'}
                            onChange={onChangeJoinUserInput}
                            placeholder={'NAME'}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: '#fa6394', border: '#fa6394'}} onClick={joinUser}>가입하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default JoinModal;