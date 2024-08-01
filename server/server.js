const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app=express();

app.use(express.json());
app.use(cors());

app.get("/getAllCurruncies", async (req, res)=>{
const api="https://openexchangerates.org/api/currencies.json?app_id=d996a6b18bb04e4a8e63df671eb6a8d4";
try {
    const namesRes= await axios.get(api);
    const nameData=await namesRes.data;
return  res.json(nameData);
} catch (error) {
    console.error(error)
}
})

app.get("/convert", async (req, res)=>{
    const {date,
        sourceCurrancy, 
        targerCurrancy, 
        amountInSourceCurrancy}=req.query;

    const api=`https://openexchangerates.org/api/historical/${date}.json?app_id=d996a6b18bb04e4a8e63df671eb6a8d4`;

    try {
        const dataRes= await axios.get(api);
        const rates=await dataRes.data.rates; 

        const sourceRate= rates[sourceCurrancy]
        const targetRate= rates[targerCurrancy]


        
        const targetAmount=(targetRate/ sourceRate)*amountInSourceCurrancy;

      

        
    return  res.json(targetAmount);
    } catch (error) {
        console.error(error)
    }
    })


app.listen(5000,()=>{console.log("Server started")})