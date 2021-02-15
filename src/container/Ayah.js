import React, { useState, useEffect,useCallback } from "react";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import "./../styles/container/home.scss";


function Ayah() {
    return(
      <div className="px-4">
        <UiStep step="2" />
        <p className="text-center container mx-auto font-extralight text-xl my-10">Pilih surat</p>
      </div>
    )
}

export default Ayah;
