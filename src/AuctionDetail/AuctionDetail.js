import React, {useCallback, useEffect, useRef, useState} from 'react';
import AuctionItemCarousel from "./AuctionItemCarousel";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import xIco from "../assets/img/x.svg";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {Client} from '@stomp/stompjs';
import axios from "../Config/AxiosConfig";

function AuctionDetail() {

    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');
    const client = useRef({});
    const {no} = useParams();
    const navigate = useNavigate();
    const [imagePaths, setImagePaths] = useState([])
    const [itemObj, setItemObj] = useState({buyer: null})
    const [timeLeft, setTimeLeft] = useState("-1");
    const unblock = () => {
        const unblock = window.confirm('경매를 떠나실껀가요?');
        if (unblock) {
            navigate('/list');
        }
    }
    const disconnect = useCallback(() => {
        setTimeLeft("close");
        client.current.deactivate();
        alert('경매시간이 종료 되었습니다.');
        navigate('/list');
    }, [setTimeLeft, navigate]);

    const subscribe = useCallback(() => {
        console.log('subscribe');
        client.current.subscribe('/sub/chat/' + no, (body, headers) => {

            const json_body = JSON.parse(body.body);
            const {writerId, chat} = json_body
            if (writerId === "timer") {
                console.log('json_body Timer', json_body);
                if (chat === 'close') {
                    // disconnect();
                } else {
                    setTimeLeft(chat);
                }
            } else if (writerId === "SYSTEM") {
                console.log('json_body System', json_body);
            } else {
                setChatList((_chat_list) => [
                    ..._chat_list, {writerId, chat}
                ]);
                setItemObj((prevValue) => ({...prevValue, startPrice: chat, buyer: writerId}))
            }
        });
        // client.current.publish({
        //     destination: '/pub/chat',
        //     body: JSON.stringify({
        //         channelId: no,
        //         writerId: "SYSTEM",
        //         chat: "GIVE DATA",
        //     }),
        // });
    }, [no, setTimeLeft, disconnect, setChatList, setItemObj]);
    const connect = useCallback(() => {
        client.current = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                subscribe();
                // client.current.subscribe('/user/queue/welcome/' + no, (body) => {
                //     const welcomeMessage = JSON.parse(body.body);
                //     console.log('Welcome message:', welcomeMessage);
                //     const json_body = JSON.parse(body.body);
                //     const {writerId, chat} = json_body
                //     setChatList((_chat_list) => [
                //         ..._chat_list, {writerId, chat}
                //     ]);
                //     setTimeLeft(timeLeft);
                //     setItemObj((prevValue) => ({...prevValue, startPrice: chat, buyer: writerId}))
                // });
            },
        });

        client.current.activate();
    }, [subscribe]);

    const publish = (chat) => {
        const {name} = JSON.parse(sessionStorage.getItem('profile'));
        if (!client.current.connected) return;
        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                applyId: no,
                channelId: no,
                writerId: name,
                chat: chat,
            }),
        });

        setChat('');
    };

    const handleChange = (e) => { // 채팅 입력 시 state에 값 설정
        setChat(e.target.value);
    };
    const checkedMoney = (money) => {
        const {id} = JSON.parse(sessionStorage.getItem('profile'))
        const data = axios.get(`/checkedMoney?id=${id}&money=${money}&no=${no}`);
        return data;
    }
    const handleSubmit = async (e, chat) => { // 보내기 버튼 눌렀을 때 publish
        e.preventDefault();
        if (parseInt(itemObj.startPrice) >= chat) {
            alert('현재 입찰가격보다 작거나 같은 금액입니다.')
        } else {
            const {data} = await checkedMoney(chat);
            if (data === 0) {
                alert('보유금액이 부족합니다.')
            } else {
                publish(chat);
            }
        }
    };

    const getItem = useCallback(() => {
        return axios.get(`/getItem?no=${no}`);
    }, [no])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchDataAndConnect = async () => {
            try {
                const {data} = await getItem();
                const {imgPath1, imgPath2, imgPath3, startPrice, buyerId, nowPrice, status} = data;
                if (status === "finish") {
                    navigate("/list");
                } else {
                    setImagePaths([imgPath1, imgPath2, imgPath3])
                    if (nowPrice !== null && buyerId !== null) {
                        setItemObj((prevValue) => ({...prevValue, startPrice: nowPrice, buyer: buyerId}))
                        setChatList((prevValue) => ([...prevValue, {writerId: buyerId, chat: nowPrice}]))
                    } else {
                        setItemObj((prevValue) => ({...prevValue, startPrice: startPrice}));
                    }
                }
                return true;
            } catch (e) {
                navigate("/list");
                return false;
            }
        };
        fetchDataAndConnect().then((success)=>{success && connect()});

        return () => {
        }
    }, [connect, getItem, navigate, setChatList, setItemObj, setImagePaths]);
    return (
        <div className={'AuctionDetailParentWrapper'}>
            <div className={'AuctionDetailWrapper'}>
                <div className={'AuctionDetailImage'}>
                    <AuctionItemCarousel imagePaths={imagePaths}/>
                </div>
                <div className={'AuctionDetailStatus'}>
                    <div style={{
                        width: '100%',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginLeft: '20px'
                    }}>
                        {
                            itemObj.buyer !== null ?
                                <div style={{width: '90%', display: 'flex', justifyContent: 'center'}}>현재가격
                                    : {itemObj.startPrice}원(입찰자:{itemObj.buyer})</div>
                                :
                                <div style={{width: '90%', display: 'flex', justifyContent: 'center'}}>현재가격
                                    : {itemObj.startPrice}원</div>
                        }
                        <img src={xIco} alt={'나가기'} style={{cursor: 'pointer'}} onClick={unblock}/>
                    </div>
                    <div className={'laWrapper'}>
                        <ul className={'auctionChat'}>
                            <li className={'liNoDot'}>경매 시작</li>
                            {
                                chatList.map((chatListItem, idx) =>
                                    idx === chatList.length - 1 ?
                                        <li key={idx}
                                            className={'liNoDot liActive'}>{chatListItem.writerId} : {chatListItem.chat}원</li>
                                        :
                                        <li key={idx}
                                            className={'liNoDot'}>{chatListItem.writerId} : {chatListItem.chat}</li>
                                )
                            }
                            <li className={'liNoDot'}>9 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot'}>1 : A</li>
                            <li className={'liNoDot liActive'}>5 : A</li>

                        </ul>

                    </div>
                    {
                        timeLeft === "-1" ?
                            <div className={'timeCountWrapper flexJCAC'}> READY </div>
                            :
                            timeLeft === "close" ?
                                <div className={'timeCountWrapper flexJCAC'}> FINISH </div>
                                :
                                <div className={'timeCountWrapper flexJCAC'}> TIME COUNT {formatTime(timeLeft)} </div>
                    }
                    <div className={'cashWrapper'}>
                        <form onSubmit={(e) => handleSubmit(e, chat)}>
                            <InputGroup className={''} style={{height: '100%'}}>
                                {
                                    timeLeft === "-1" ?
                                        <>
                                            <InputGroup.Text>₩</InputGroup.Text>
                                            <Form.Control
                                                className={'hoverStyle'}
                                                placeholder="경매가 시작되면 활성화 됩니다."
                                                type={'number'}
                                                // onChange={handleChange}
                                                // value={chat}
                                                disabled={true}
                                            />
                                            <Button className={'searchImgStyle'} id="button-addon2" disabled={true}>
                                                입찰하기
                                            </Button>
                                        </>

                                        :
                                        <>
                                            <InputGroup.Text>₩</InputGroup.Text>
                                            <Form.Control
                                                className={'hoverStyle'}
                                                placeholder="입찰하실 금액을 입력하세요."
                                                type={'number'}
                                                onChange={handleChange}
                                                value={chat}
                                            />
                                            <Button className={'searchImgStyle'} id="button-addon2" type={"submit"}>
                                                입찰하기
                                            </Button>
                                        </>
                                }

                            </InputGroup>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;