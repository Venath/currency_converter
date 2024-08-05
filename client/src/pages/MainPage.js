import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../index.css'

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
    <div className='container'>
      <h1>Convert your currency today</h1>
      <form onSubmit={handleSubmit}> 

      
      <div className="form-group">
        <label htmlFor='date' className='form-label'>Date</label>
        <input type='date' id='date' name='date' className="form-input" onChange={(e)=>{setDate(e.target.value)}}/>
      </div>

      <div className="form-group">
        <label htmlFor="sourceCurrancy" className='form-label'>Source Currancy</label>
        <select id="sourceCurrancy" name="sourceCurrancy" className="form-input" onChange={(e)=>{setSourceCurrancy(e.target.value)}}>
          <option value="" id={sourceCurrancy} name={sourceCurrancy}>Select Source Currancy</option>
          {Object.keys(currencyNames).map((currency) => (
              <option key={currency} value={currency}>{currencyNames[currency]}</option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="targerCurrancy" className='form-label'>Target Currancy</label>
        <select id="targerCurrancy" name="targerCurrancy" className="form-input" onChange={(e)=>{setTargerCurrancy(e.target.value)}}>
          <option value="" id={targerCurrancy} name={targerCurrancy}>Select Target Currancy</option>
          {Object.keys(currencyNames).map((currency) => (
              <option key={currency} value={currency}>{currencyNames[currency]}</option>
            ))}
        </select>
      </div>


      <div className="form-group">
        <label htmlFor="amountInSourceCurrancy" className='form-label'>Amount In Source Currancy</label>
        <input type='text' id="amountInSourceCurrancy" name="amountInSourceCurrancy" className="form-input" onChange={(e)=>{setAmountInSourceCurrancy(e.target.value)}}/>
      </div>

      <button type="submit" className='button'>Get The Target Currancy</button>
      <div>
      
      {amountInTargetCurrancy}
      </div>
      </form>
      
      
    </div>
  )
}
