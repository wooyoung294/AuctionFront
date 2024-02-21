import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../Config/AxiosConfig";

function ChargeModal({show, handleClose}) {
    const [inputValue, setInputValue] = useState();
    const onChangedInput = (e)=>{
        setInputValue(e.target.value);
    }
    async function chargeMoney() {
        const {id} = JSON.parse(sessionStorage.getItem('profile'));
        await axios.get(`/chargeMoney?id=${id}&money=${inputValue}`)
    }
    return (
        <Modal show={show} backdrop="static" onHide={() => handleClose('charge')} animation={false}>
            <Modal.Header closeButton
                          style={{display: 'flex', alignItems: 'end', background: '#fa6394', color: 'white'}}>
                <h4 style={{margin: '0'}}>충전하기</h4>
                <h5 style={{margin: '0'}}>&nbsp;Charge</h5>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <InputGroup className="mb-3 mr-80W-inherit">
                    <Form.Control
                        name={'amount'}
                        placeholder="경매 시작 가격"
                        className={'AuctionInput mr-0'}
                        type={'number'}
                        value={inputValue}
                        onChange={onChangedInput}
                    />
                    <InputGroup.Text className={'AuctionInputSubLabel'}>(원)</InputGroup.Text>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'AuctionBtn'} onClick={chargeMoney}>
                    충전하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ChargeModal;