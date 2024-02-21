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
                    <img src={coin} alt="ico"/>
                    <div className="label">
                        <span className="title">충전</span>
                        <br name={'charge'}/>
                        <span className="subtitle">CHARGE</span>
                    </div>
                </li>
                <li className="sell" onClick={()=>handleShow('sell')}>
                    <img src={shoes}  alt="ico"/>
                    <div className="label">
                        <span className="title">판매</span>
                        <br/>
                        <span className="subtitle">SELL</span>
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