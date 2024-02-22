import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function AuctionItemCarousel({imagePaths}) {
    return (
        <Carousel style={{padding:'5px', background:'#fa6394'}}>
            {
                imagePaths.map((value,index)=> value !== null ?
                    <Carousel.Item key={index}>
                        <img src={`data:image/jpeg;base64,${value}`}
                             text={`${index}slide`}
                             style={{objectFit: 'fill', width: '100%', height: '100%'}}/>
                    </Carousel.Item>
                    :
                    null
                )
            }
        </Carousel>
    );
}

export default AuctionItemCarousel;