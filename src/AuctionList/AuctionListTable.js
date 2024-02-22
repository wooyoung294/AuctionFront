import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import AuctionListJoinButton from "./AuctionListJoinButton";
import axios from "../Config/AxiosConfig";
import {useNavigate} from "react-router-dom";

const renderJoinCell = (params) => {
    return <div>{params.value}</div>;
};
const columns = [
    {field: 'image', headerName: '물품', flex: 1, sortable: false, renderCell: renderJoinCell},
    {field: 'name', headerName: '물품명', flex: 2, sortable: false},
    {field: 'seller', headerName: '판매자', flex: 1, sortable: false},
    {field: 'sellDate', headerName: '경매시작일시', flex: 2, sortable: false},
    {field: 'startPrice', headerName: '시작가격', flex: 1, sortable: false},
    {field: 'nowPrice', headerName: '현재가격', flex: 1, sortable: false},
    {field: 'join', headerName: '참가하기', flex: 1, sortable: false, renderCell: renderJoinCell,},
];

function AuctionListTable({sell}) {
    const navigate = useNavigate()
    const navigateAuctionPage = (no) => {
        navigate(`/list/${no}`)
    }
    const [rows, setRows] = useState([])
    useEffect(() => {
        if (sell === false) {
            setRows([]);

            async function getListData() {
                const res = await axios.get('/getListData')
                res.data.map(value => {
                    const imageUrl = `data:image/jpeg;base64,${value.image}`;
                    const newRows = {
                        id: value.no,
                        image: <img className={"w50"} src={imageUrl} alt="Base64 Image"/>,
                        name: value.contentName,
                        seller: value.seller,
                        sellDate: value.startTime,
                        startPrice: value.startPrice,
                        nowPrice: value.nowPrice,
                        join: <AuctionListJoinButton navigateAuctionPage={navigateAuctionPage} no={value.no}/>,
                    }
                    setRows(prevValue => ([...prevValue, newRows]))
                })
            }

            getListData();
        }
    }, [sell])
    return (
        <div style={{height: 'calc(95% - 10px)', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 11},
                    },
                }}
                sortingOrder={[]}
                localeText={{noRowsLabel: '현재 경매중인 물품이 없습니다.'}}
                pageSizeOptions={[5, 10]}
            />
        </div>

    );
}

export default AuctionListTable;