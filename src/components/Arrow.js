import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./../styles/components/arrow.scss";

function Arrow(props) {
  const renderArrow = function() {
    if(props.type === 'next') {
      return(
        <div className="arrow next">
          <span className="text-xs font-light mr-4">{(props.text) ? props.text :'Selanjutnya'}</span>
          <img src={`${process.env.PUBLIC_URL}/arrow.png`} alt="arrow" />
        </div>
      )
    }
    if(props.type === 'prev') {
      return(
        <div className="arrow prev">
           <img src={`${process.env.PUBLIC_URL}/arrow.png`} alt="arrow" />
          <span className="text-xs font-light ml-4">{(props.text) ? props.text :'Sebelumnya'}</span>
        </div>
      )
    }

  }
  return (
    <Link className="arrow mt-4" to={`${props.to}`}>
      {renderArrow()}
    </Link>
  );
}

export default Arrow;
