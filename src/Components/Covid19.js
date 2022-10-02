import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Covid19 = () => {

    const [covid, setCovid] = useState([])
    const [covidFilter, setCovidFilter] = useState(null)
    const [tempcovidFilter, setTempCovidFilter] = useState('')
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        async function getCovid() {
            const response = await axios.get("https://data.covid19india.org/data.json")
            setCovid([...response.data.statewise]);
        } getCovid();
    }, [])

   
    const handleSubmit = (e) => {
        e.preventDefault()
        setCovidFilter(tempcovidFilter)
    }


    const handleDarkMode = (e) => {
        setIsDark(!isDark)
        if(isDark == false){
           e.target.innerText = 'Dark Mode'
           e.target.style.backgroundColor = 'tomato'
           e.target.style.color = 'black'
        }else{
            e.target.innerText = 'Light Mode'
            e.target.style.backgroundColor = 'magenta'
            e.target.style.color = 'white'
           
        }
    }

    return (
        <div className={isDark? 'light':'dark'}>
            <form className="headerContainer" onSubmit={handleSubmit}> 
            <div >
            <h1 className='heading'>Covid19 Tracker</h1> 
            
            <div className="inputContainer">
            <input className='searchBox' type="text" placeholder='Enter State To Search' value={tempcovidFilter} onChange={(e)=>{setTempCovidFilter(e.target.value)}}/>
            <input className='searchBtn' type="submit" value="search" />
            </div>
            </div>
             </form>

            
            {covid.filter((value)=> {
                if (covidFilter == null){
                    return value
                } if(value.state.toLowerCase().includes(covidFilter.toLowerCase())){
                    return value
                } 
                
            }).map((item, index) => {
                return <div key={index} className="mainContainer">
                <div className='containerForIndia'>

                    <h2 className='casesHeading'>{`Cases in ${item.state}`}</h2>
                    <p> {`Active = ${item.active}`} </p>

                    <p> {`Confirmed = ${item.confirmed}`} </p>

                    <p> {`Deaths = ${item.deaths}`} </p>

                    <p> {`Last Updated Time = ${item.lastupdatedtime}`} </p>

                    <p> {`Recovered = ${item.recovered}`} </p>
                </div>
                </div>
            })}
            <button onClick={handleDarkMode} className='appearanceBtn'>Dark Mode</button>

        </div>
    )
}

export default Covid19