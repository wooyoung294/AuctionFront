import React, {useEffect, useState} from 'react';
import AuctionListTable from "./AuctionListTable";
import SideMenu from "./SideMenu";
import piggy from "../assets/img/piggy-bank.svg"
import {useLocation} from 'react-router-dom'
import SellModal from "../Modals/SellModal";
import axios from "../Config/AxiosConfig";
import {IsSessionExist} from "../Function/IsSessionExist";
import ChargeModal from "../Modals/ChargeModal";
import Tutorial from "./Tutorial";

function AuctionList() {

    const [profile, setProfile] = useState({amount:0})
    const {amount} = profile;
    const [show, setShow] = useState({sell: false, charge: false});
    const {sell, charge} = show;
    const [run,setRun] = useState(false);
    async function getUserAmount (){
        const {id} = JSON.parse(sessionStorage.getItem('profile'));
        return  await axios.get(`/userAmount?id=${id}`)
    }
    useEffect(()=>{
        IsSessionExist();
        getUserAmount()
            .then(({data})=> {
                setProfile((prevValue)=>({...prevValue,amount:data}));
                setRun(!Boolean(Number(JSON.parse(sessionStorage.getItem('profile')).tutorial)))
            })
            .catch(e=>{
                throw new Error(e);
            })
    },[charge])

    const handleClose = (key) => {
        setShow((prevValue)=>({
            ...prevValue,
            [key] : false

        }))
    };
    const handleShow = (key) => {
        setShow((prevValue)=>({
            ...prevValue,
            [key] : true
        }))
    };
    return (
        <>
            <Tutorial run={run}/>
            <div style={{padding: '40px', height: '100%'}}>
                <div className={'ListTitleWrapper'}>
                    <div className={'titlePaint'}>Auction List</div>
                    <div className={'ListTitleItem'}>
                        <div>
                            <img src={piggy} alt={'보유금액'}/>
                            {amount}원
                        </div>
                    </div>
                </div>
                <div className={'ListTableWrapper'}>
                    <AuctionListTable sell={sell}/>
                </div>
            </div>
            <SideMenu handleShow={handleShow}/>
            <SellModal show={sell} handleClose={handleClose}/>
            <ChargeModal show={charge} handleClose={handleClose}/>
        </>
    );
};

export default AuctionList;