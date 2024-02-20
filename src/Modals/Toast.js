import React from 'react';
import Toast from 'react-bootstrap/Toast';

function CameraToast({show,setShow}) {
    return (
        <Toast style={{left:'-70px', position:'relative'}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header style={{background:'#fa6394', color:'white', fontWeight:'bold'}}>
                <strong className="me-auto">Auction</strong>
            </Toast.Header>
            <Toast.Body>최소 한장의 사진을 <br/> 등록해야 해요.</Toast.Body>
        </Toast>
    );
}

export default CameraToast;