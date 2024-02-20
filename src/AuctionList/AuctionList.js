import React, {useEffect, useState} from 'react';
import AuctionListTable from "./AuctionListTable";
import SideMenu from "./SideMenu";
import piggy from "../assets/img/piggy-bank.svg"
import {useLocation} from 'react-router-dom'
import SellModal from "../Modals/SellModal";
import axios from "../Config/AxiosConfig";
import {IsSessionExist} from "../Function/IsSessionExist";

function AuctionList() {

    const [profile, setProfile] = useState({amount:0,name:''})
    const {amount,name} = profile;
    const [show, setShow] = useState({sell: false, charge: false});
    const {sell, charge} = show;

    async function getUserAmount (){
        const {id} = JSON.parse(sessionStorage.getItem('profile'));
        return  await axios.get(`/userAmount?id=${id}`)
    }
    useEffect(()=>{
        IsSessionExist();
        getUserAmount()
            .then(({data})=> {
                setProfile((prevValue)=>({...prevValue,amount:data}))
                console.log(data)
            })
            .catch(e=>{
                throw new Error(e);
            })
    },[])

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
                    <AuctionListTable/>
                </div>
            </div>
            <SideMenu handleShow={handleShow}/>
            <SellModal show={sell} handleClose={handleClose} seller={name}/>
        </>
    );
};

export default AuctionList;