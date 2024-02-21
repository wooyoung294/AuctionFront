import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../Config/AxiosConfig";

function ChargeModal({show, handleClose}) {
    const [inputValue, setInputValue] = useState('');
    const onChangedInput = (e) => {
        setInputValue(e.target.value);
    }

    async function chargeMoney() {
        const regex = /^[0-9]+$/;
        const regex2 = /^(0|[1-9][0-9]{0,5}|1000000)$/;
        if (regex.test(inputValue)) {
            if (regex2.test(inputValue)) {
                const {id} = JSON.parse(sessionStorage.getItem('profile'));
                await axios.get(`/chargeMoney?id=${id}&money=${inputValue}`)
                        .then(({data}) => data === 1 && handleClose('charge'))
                        .catch(e => console.log(e));
            } else {
                alert('1회에 1,000,000원까지 입력됩니다.')
            }
        } else {
            alert('숫자만 입력하셔야 됩니다.')
        }
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
                        placeholder="충전할 금액을 입력하세요."
                        className={'AuctionInput mr-0'}
                        type={'text'}
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