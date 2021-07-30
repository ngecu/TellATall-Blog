import React, { useEffect,useState } from 'react'
import Ticker from 'react-ticker'
import {getPostsAction} from  '../actions/postActions';
import { useDispatch, useSelector } from 'react-redux'

const GetRatesFromAPI = ({rates}) => {

    // A placeholder is needed, to tell react-ticker, that width and height might have changed
    // It uses MutationObserver internally
    return rates ? (
      <p style={{ whiteSpace: "nowrap" }}>{rates.map((rate)=> `${rate.title} -}--}--}- `)} -]-  </p>
    ) : (
      <p style={{ visibility: "hidden" }}>Placeholder</p>
    );
  };
   
  function StockTicker({posts}) {
    return (
      <Ticker offset="run-in" speed={10}>
        {() => <GetRatesFromAPI rates={posts} />}
      </Ticker>
    );
  }
   
  export default StockTicker;