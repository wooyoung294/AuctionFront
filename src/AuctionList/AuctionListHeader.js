import React from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import SearchIco from "../assets/img/search.svg";

function AuctionListHeader() {
    return (
        <>
            <Form.Select className={'ListSearchWrapperItemBasis15 hoverStyle'}>
                <option>최근 등록순</option>
                <option>현재 진행중</option>
            </Form.Select>
            <InputGroup className={'ListSearchWrapperItemBasis33'}>
                <Form.Control
                    className={'hoverStyle'}
                    placeholder="입찰하실 금액을 입력하세요."
                />
                <Button className={'searchImgStyle'} id="button-addon2">
                    <img src={SearchIco}/>
                </Button>
            </InputGroup>
        </>
    );
}

export default AuctionListHeader;