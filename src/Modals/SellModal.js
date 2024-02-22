import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Camera from '../assets/img/camera-fill.svg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CameraToast from "./Toast";
import axios from "../Config/AxiosConfig";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
function SellModal({show, handleClose}) {
    const [previewImgs, setPreviewImg] = useState([]);
    const [toastShow, setToastShow] = useState(false);
    const [inputValue, setInputValue] = useState({contentName: null, amount: 0});
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const handleDateChange = (dateInput) => {
        setDate(dateInput);
    };
    const handleTimeChange = (timeInput) => {
        setTime(timeInput);
    };
    const handleSave = async (e) => {
        const selectedFiles = document.querySelector('#file').files;
        const {contentName, amount} = inputValue;
        if (!contentName) {
            alert('물품명이 공백입니다.')
            return false;
        } else if (previewImgs.length === 0) {
            setToastShow(true);
            return false;
        } else if (!amount) {
            alert('경매 시작 가격을 설정해주세요.')
            return false;
        } else if (!date) {
            alert('경매 시작 날짜를 설정해주세요.')
            return false;
        } else if (!time) {
            alert('경매 시작 시간을 설정해주세요.')
            return false;
        }  else {
            const data = new FormData();
            data.append('contentName', contentName);
            data.append('amount', amount);
            data.append('seller', JSON.parse(sessionStorage.getItem('profile')).name);
            data.append('startTime', dayjs(date).format('YYYY-MM-DD')+' '+dayjs(time).format('hh:mm:ss'));
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('files', selectedFiles[i]);
            }
            const result = await axios.post('/createSellItem',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',  // Content-Type 설정
                    },
                }
            );
            if (result.data === 1) {
                alert('등록되었습니다.');
                setInputValue(prevState => ({...prevState, contentName: null, amount: 0}));
                setPreviewImg([]);
                handleClose('sell');
            }

        }
    }

    const onChangedInput = (e) => {
        const {name, value} = e.target;
        setInputValue((prevValue) => ({...prevValue, [name]: value}))
    }

    const handledPreviewImg = (e) => {
        const imageLists = e.target.files;
        let imageUrlLists = [...previewImgs];


        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }

        setPreviewImg(imageUrlLists);
    }
    return (
        <Modal show={show} backdrop="static" onHide={() => handleClose('sell')} animation={false}>
            <Modal.Header closeButton
                          style={{display: 'flex', alignItems: 'end', background: '#fa6394', color: 'white'}}>
                <h4 style={{margin: '0'}}>판매하기</h4>
                <h5 style={{margin: '0'}}>&nbsp;Sell</h5>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <h3 style={{textAlign: 'center'}}>무엇을 판매할까요?</h3>
                <input
                    type="text"
                    name='contentName'
                    className={'AuctionInput'}
                    placeholder={'물품명'}
                    autoFocus={true}
                    onChange={onChangedInput}
                />
                {/*Datepicker*/}
                <div style={{display:'flex', margin:'10px 60px', fontSize:'10px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker format="YYYY-MM-DD" value={date} onChange={handleDateChange} disablePast/>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <TimePicker
                            minutesStep={5}
                            ampm={false}
                            value={time}
                            onChange={handleTimeChange}
                            className={'custom-timepicker'}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{display: 'flex', paddingLeft: '70px'}}>
                    {previewImgs.map((image, id) => (
                        <img src={image} alt={`${image}-${id}`}
                             style={{width: '100px', height: '100px', margin: '10px'}}/>
                    ))}
                    <div className="btn-upload" style={{visibility: previewImgs.length < 3 ? 'visible' : 'hidden'}}>
                        <label htmlFor="file" id={'fileLabel'}>
                            <img src={Camera} alt={'카메라'}/>
                            <div>{previewImgs.length}/3</div>
                        </label>
                    </div>
                    <input type="file" name="file" id="file" onChange={handledPreviewImg} multiple={true}/>
                    <CameraToast show={toastShow} setShow={setToastShow}/>
                </div>
                <InputGroup className="mb-3 mr-80W-inherit">
                    <Form.Control
                        name={'amount'}
                        placeholder="경매 시작 가격"
                        className={'AuctionInput mr-0'}
                        type={'number'}
                        onChange={onChangedInput}
                    />
                    <InputGroup.Text className={'AuctionInputSubLabel'}>(원)</InputGroup.Text>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'AuctionBtn'} onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SellModal;