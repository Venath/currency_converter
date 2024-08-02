import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function MainPages() {

const [date, setDate]=useState("");
const [sourceCurrancy, setSourceCurrancy]=useState("");
const [targerCurrancy, setTargerCurrancy]=useState("");
const [amountInSourceCurrancy, setAmountInSourceCurrancy]=useState(0);
const [amountInTargetCurrancy, setAmountInTargetCurrancy]=useState(0);
const [currencyNames, setCurrencyNames]=useState([]);

const handleSubmit= async(e)=>{
  e.preventDefault();
console.log(sourceCurrancy)
try {
  const res= await axios.get("http://localhost:5000/convert", {params: {
    date,
    sourceCurrancy, 
    targerCurrancy, 
    amountInSourceCurrancy
  },
});
setAmountInTargetCurrancy(res.data)
} catch (error) {
  console.error(error)
}
}
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getAllCurruncies");
        setCurrencyNames(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrencyNames();
  }, []);
  return (
    <div>
      <h1>Convert your currency today</h1>
      <form onSubmit={handleSubmit}> 

      
      <div>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' name='date' onChange={(e)=>{setDate(e.target.value)}}/>
      </div>

      <div>
        <label htmlFor="sourceCurrancy">Source Currancy</label>
        <select id="sourceCurrancy" name="sourceCurrancy" onChange={(e)=>{setSourceCurrancy(e.target.value)}}>
          <option value="" id={sourceCurrancy} name={sourceCurrancy}>Select Source Currancy</option>
          {Object.keys(currencyNames).map((currency) => (
              <option key={currency} value={currency}>{currencyNames[currency]}</option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="targerCurrancy">Target Currancy</label>
        <select id="targerCurrancy" name="targerCurrancy" onChange={(e)=>{setTargerCurrancy(e.target.value)}}>
          <option value="" id={targerCurrancy} name={targerCurrancy}>Select Target Currancy</option>
          {Object.keys(currencyNames).map((currency) => (
              <option key={currency} value={currency}>{currencyNames[currency]}</option>
            ))}
        </select>
      </div>


      <div>
        <label htmlFor="amountInSourceCurrancy">Amount In Source Currancy</label>
        <input type='text' id="amountInSourceCurrancy" name="amountInSourceCurrancy" onChange={(e)=>{setAmountInSourceCurrancy(e.target.value)}}/>
      </div>

      <button type="submit">Get The Target Currancy</button>
      </form>
      <div>
        <p>
        {amountInTargetCurrancy}
        </p>
     
      </div>
      
    </div>
  )
}
