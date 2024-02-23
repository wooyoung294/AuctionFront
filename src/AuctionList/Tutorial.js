import React, {useEffect, useState} from 'react';
import Joyride from "react-joyride";
import axios from "../Config/AxiosConfig";

function Tutorial({run}) {
    const steps = [
        {
            content: <h4>환영합니다.<br/>처음 방문하셨군요!</h4>,
            placement: 'center',
            target: 'body',
        },
        {
            content: <h5>먼저 금액을 충전해주세요!</h5>,
            target: '.charge',


        },
        {
            content: <h5>판매하실 물품을 등록해주세요!</h5>,
            target: '.sell',
        },
        {
            content: <h5>설정한 시간에 경매가 시작될거에요!</h5>,
            target: '#root > div:nth-child(2) > div.ListTableWrapper > div > div > div.MuiDataGrid-main.css-204u17-MuiDataGrid-main > div.MuiDataGrid-virtualScroller.css-qvtrhg-MuiDataGrid-virtualScroller > div > div > div:nth-child(1) > div:nth-child(4)',
        },
        {
            content: <h5>이제 경매에 참가해보세요!</h5>,
            target: '#root > div:nth-child(2) > div.ListTableWrapper > div > div > div.MuiDataGrid-main.css-204u17-MuiDataGrid-main > div.MuiDataGrid-virtualScroller.css-qvtrhg-MuiDataGrid-virtualScroller > div > div > div:nth-child(1) > div:nth-child(7)',
        },
    ];
    const handleJoyrideCallback = async (data) => {
        const { index, status, lifecycle } = data;

        const toggleActiveClass = (add) => {
            document.querySelector('li.charge').classList.toggle('active', add);
            document.querySelector('li.sell').classList.toggle('active', add);
        };

        if (lifecycle === 'tooltip') {
            if (index === 0) {
                console.log('is it true');
                toggleActiveClass(true);
            } else if (index === 3) {
                toggleActiveClass(false);
            }
        }

        if (status === 'finished' && index === 4) {
            const prevValue = JSON.parse(sessionStorage.getItem('profile')) || {};
            prevValue.tutorial = "1";

            try {
                await axios.get(`/updateTutorial?id=${prevValue.id}`);
                sessionStorage.setItem('profile', JSON.stringify(prevValue));
            } catch (error) {
                throw new Error(`Error updating tutorial:${error}`);
            }
        }
    };

    return (
        <>
            <Joyride
                run={run}
                callback={handleJoyrideCallback}
                showProgress
                disableOverlayClose
                disableCloseOnEsc
                continuous
                steps={steps}
            />
        </>
    );
}

export default Tutorial;