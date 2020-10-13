import React from 'react';

const MarketIframe = () => {
  return (
    <>
      <div style={{ width: '100%', padding: '100px 0', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>TEMP HEADER</div>
      <iframe src="/marketPrice/marketPriceHyundai" width="100%" height="1190px" scrolling="yes" frameBorder="0" />
      {/* <iframe src="/marketPrice/marketPriceHyundai" width="100%" height="1530px" scrolling="no" frameBorder="0" /> */}

      <div style={{ width: '100%', padding: '200px 0', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>TEMP FOOTER</div>
    </>
  );
};

export default MarketIframe;
