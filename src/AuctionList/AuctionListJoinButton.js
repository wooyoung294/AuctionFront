import React from 'react';

function AuctionListJoinButton({navigateAuctionPage,no}) {
    return (
        <button className={'ListAuctionJoinButton'} onClick={()=>navigateAuctionPage(no)}>참가하기</button>
    );
}

export default AuctionListJoinButton;