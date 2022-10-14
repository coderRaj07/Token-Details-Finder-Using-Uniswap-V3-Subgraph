import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {
  const [tk1, setTk1] = useState("")
  const [tk2, setTk2] = useState("")
  const [pool, setPool] = useState("")

  const onAddress1Change = (event) => {
    setTk1(event.target.value.toString());
  }

  const onAddress2Change = (event) => {
    setTk2(event.target.value.toString());
  }


  const getPool = async () => {
    try {
      //console.log(tk1)
      const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        {
          query:
            ` {
      pools(
        where:{
        token0:"${tk1}",
        token1:"${tk2}"}) 

        {id} 

      }`
        });


      let res = result.data.data.pools;
      // setTk1(res[0].token0.id);
      // setTk2(res[0].token1.id);
      setPool(res[0].id)
      console.log(res[0].id)
      // console.log(result);
      // console.log(tk1);
      // console.log(tk2);
      // console.log(pool);

    }

    catch (error) {
      console.error(error);
    }
  }



  const [symbol, setSymbol] = useState("")

  const onSymbolChange = (event) => {
    setSymbol(event.target.value.toString());
  }

  const [decimals, setDecimals] = useState(0)
  const [id, setId] = useState("0x0000000000000000000000000000000000000000")
  const [name, setName] = useState("Not Available")
  const [feesUSD, setFeesUSD] = useState(0)
  const [volumeUSD, setVolumeUSD] = useState(0)
  const [totalValueLockedUSD, setTotalValueLockedUSD] = useState(0)
  const [untrackedVolumeUSD, setUntrackedVolumeUSD] = useState(0)
  const [flag,setFlag] = useState(false)

  const getTokenDetails = async () => {
    try {
      //console.log(tk1)
      const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        {
          query:
            ` {
        tokens(where:{symbol:"${symbol}"}){
          symbol
          decimals
          id
          feesUSD
          name
          volumeUSD
          totalValueLockedUSD
          untrackedVolumeUSD
        }
        }`
        });


      let res = result.data.data.tokens;
      // setTk1(res[0].token0.id);
      // setTk2(res[0].token1.id);
      setFlag(true)
      setSymbol(res[0].symbol)

      setDecimals(res[0].decimals)

      setId(res[0].id)

      setName(res[0].name)

      setFeesUSD(res[0].feesUSD)

      setVolumeUSD(res[0].volumeUSD)

      setTotalValueLockedUSD(res[0].totalValueLockedUSD)

      setUntrackedVolumeUSD(res[0].untrackedVolumeUSD)



    }

    catch (error) {
     
      setDecimals(0)

      setId("0x0000000000000000000000000000000000000000")

      setName("Not Available")

      setFeesUSD(0)

      setVolumeUSD(0)

      setTotalValueLockedUSD(0)

      setUntrackedVolumeUSD(0)
      console.error(error);
    }
  }



  return (


    <div className={styles.container}>
    <main className={styles.main}>
  
      <form>
        <div className="row">
          
          <div className="col">
            <h1 className={styles.title}>Token Details Finder 🔑</h1>
            <br />
            <input type="text" className="form-control" id="address0" placeholder="Symbol Name" onChange={onSymbolChange} />
            <br/>
            <div className="col-md-12 text-center">
            <button type="button" className="btn btn-primary mb-2" onClick={getTokenDetails}>Get Token Details</button>
            </div>
            
          </div>
          
          
         {flag ?
         (<> 
         <h1>Token Address:</h1>
         <h2 style={{color: " #3333ff"}}>{id}</h2>

         <h1>Token Name:</h1>
         <h2 style={{color: " #3333ff"}}>{name}</h2>

         <h1>Token Decimals:</h1>
         <h2 style={{color: " #3333ff"}}>{decimals}</h2>

         <h1>Token Fees (in USD):</h1>
         <h2 style={{color: " #3333ff"}}>{feesUSD}</h2>

         <h1>Token Volume (in USD):</h1>
         <h2 style={{color: " #3333ff"}}>{volumeUSD}</h2>

         <h1>Token Total Value Locked (in USD): </h1>
         <h2 style={{color: " #3333ff"}}>{totalValueLockedUSD}</h2>

         <h1>Token Total Untracked Value Locked (in USD):</h1>
         <h2 style={{color: " #3333ff"}}> {untrackedVolumeUSD}</h2>
         </>
         ):(<></>)}
        </div>
      </form>
    
    </main>


     {/* To fetch pool address for two tokens uncomment these lines below */}
    
      {/* <form>

        <div className="row">

          <div className="col">
            <label>1st Token Address</label>
            <input type="text" className="form-control" id="address0" placeholder="Asset 1 Address" onChange={onAddress1Change} />
          </div>

          <br /><br /><br />

          <div className="col">
            <label>2nd Token Address</label>
            <input type="text" className="form-control" id="address1" placeholder="Asset 2 Address" onChange={onAddress2Change} />
          </div>

          <br /><br /><br /><br /><br /><br />

          <button type="button" className="btn btn-primary mb-2" onClick={getPool}>Get Pool Addresses</button>
          <h1>{pool}</h1>

        </div>
      </form>

      <br>
      </br> */}

    </div>
  )
}


// {
//   swaps(where:{token0:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"}){
//     token0{
//       id
//     }
//     token1{
//       id
//     }
//   }
// }

// {
  // pools(
  //   where:{
  //   token0:"0xbef81556ef066ec840a540595c8d12f516b6378f",
  //   token1:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}) {
  //   id
  // }
// }
