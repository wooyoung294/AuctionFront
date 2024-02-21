import React from 'react';
import coin from "../assets/img/coin.svg";
import shoes from "../assets/img/shoes.svg";
import refund from "../assets/img/refund.svg";
import quit from "../assets/img/door.svg";
function SideMenu({handleShow}) {
    function logOut() {
        sessionStorage.clear();
        window.location.href='/';
    };
    return (
        <section className="rightnav">
            <ul>
                <li className="charge" name={'charge'} onClick={()=>handleShow('charge')}>
                    <img src={coin} alt="ico" name={'charge'}/>
                    <div className="label" name={'charge'}>
                        <span className="title" name={'charge'}>충전</span>
                        <br name={'charge'}/>
                        <span className="subtitle" name={'charge'}>CHARGE</span>
                    </div>
                </li>
                <li className="sell" onClick={()=>handleShow('sell')}>
                    <img src={shoes}  alt="ico" onClick={()=>handleShow('sell')}/>
                    <div className="label" onClick={()=>handleShow('sell')}>
                        <span className="title" onClick={()=>handleShow('sell')}>판매</span>
                        <br onClick={()=>handleShow('sell')}/>
                        <span className="subtitle" onClick={()=>handleShow('sell')}>SELL</span>
                    </div>
                </li>
                <li className="refund" name={'exchange'} onClick={handleShow}>
                    <img src={refund} alt="ico"/>
                    <div className="label">
                        <span className="title">환전</span>
                        <br/>
                        <span className="subtitle">EXCHANGE</span>
                    </div>
                </li>
                <li className="quit" name={'quit'} onClick={logOut}>
                    <img src={quit} alt="ico"/>
                    <div className="label">
                        <span className="title">종료</span>
                        <br/>
                        <span className="subtitle">QUIT</span>
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default SideMenu;