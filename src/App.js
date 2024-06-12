import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch, } from 'react-icons/io';

import { BsCloudHaze2Fill, BsFillCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudy, BsCloudDrizzleFill, } from "react-icons/bs";

import { TbHaze, TbTemperatureCelsius, TbSmoking } from "react-icons/tb"
import { ImSpinner, ImSpinner8 } from "react-icons/im"
import Footer from './footer';


const APIkey = 'f2a3cf63ecc999accc6b160dcf5ff6dc';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Ahmedabad");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) =>{
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) =>{
    
    //if input value is not empty
    if(inputValue !== ''){
      setLocation(inputValue);
    }
    //select input
    const input = document.querySelector('input');
    //if input value is empty
    if(input.value === ''){
      //set animate to true
      setAnimate(true);
      setTimeout(()=>{
        setAnimate(false);
      },500)
    }
    //clear input
    input.value = '';

    //prevent default
    e.preventDefault();
  }
  useEffect(() => {
    //loading to true
    setLoading(true)


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then(res => {
      

      setTimeout(() => {
        //after 1500ms
        setData(res.data);
        setLoading(false)
      }, 1500);
    }).catch(err => {
      setLoading(false)
      setErrorMsg(err);
    })
  }, [location]);

  useEffect(()=>{
    const timer =setTimeout(() => {
        setErrorMsg("")
    }, 2000)
    //clear timer
    return()=> clearTimeout(timer);
},[errorMsg])

  //if the data is false, then loader will be displayed
  if (!data) {
    return <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center ">
      <div>
        <ImSpinner8 className='text-5xl animate-spin text-white' />
      </div>
    </div>
  }

  // icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy className='text-[#C7C4BF]'/>
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill className='text-[#C1C5C9]'/>
      break
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]'/>
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>
      break
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />
      break

    case 'Snow':
      icon = <IoMdSnow className='text-[#D9F1F9]'/>
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-[#867681]'/>
      break
    case 'Smoke':
      icon = <IoMdCloudy className='text-[#738276]'/>
      break

  };

  const date = new Date();


  return (
  <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
    
    {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errorMsg.response.data.message}`}
      </div>}

    {/* {form} */}
    <form 
    className={`${ 
      animate ? 'animate-shake' : 'animate-none'}
      h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 mt-16 lg:mt-18`} >

      <div className='h-full relative flex items-center justify-between p-2'>

        <input onChange={(e)=>handleInput(e)} 
        className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15pxpx] font-light pl-6 h-full' 
        type='text' 
        placeholder='Search by City or Country'/>

        <button onClick={(e)=> handleSubmit(e)} 
        className='bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition duration-300 ease-in-out transform hover:bg-[#0a87b8] hover:scale-105'>
          <IoMdSearch className='text-2xl text-white'/>
          </button>
      </div>
    </form>

    {/* {card} */}
    <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
    {loading ? (
      <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='flex-grow flex justify-center items-center'>
        <ImSpinner8 className='text-white text-5xl animate-spin'/>
      </div>
      <footer className="w-full text-white py-4 flex justify-center items-center fixed bottom-6">
        <p>Made With ❤️ Piyush Bhagchandani</p>
      </footer>
    </div>) 
    : 
    (      <div>

      {/* {card-top} */}
      <div className=' flex item-center gap-x-5'>
        {/* {icon} */}
        <div className='text-[87px]'>{icon}</div>

        <div>
          {/* {country-name} */}
          <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}

          </div>
          {/* {date} */}
          <div>
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
          </div>

        </div>
      </div>
      {/* {card body} */}
      <div className='my-20'>
        <div className='flex justify-center items-center'>
          {/* {temp} */}
          <div className='text-[144px] leading-none font-light'>
            {parseInt(data.main.temp)}
          </div>
          {/* {celc-icon} */}
          <div className='text-4xl '>
            <TbTemperatureCelsius />
          </div>
        </div>
        {/* {weatherdesc} */}
        <div className='capitalize text-center'>{data.weather[0].description}
        </div>
      </div>

      {/* {card bottom} */}
      <div className='max-w-[378px mx-auto flex flex-col gap-y-6'>
        <div className='flex justify-between'>
          <div className='flex item-center  gap-x-2'>
            {/* {icon} */}
            <div className='text-[20px]'>
              <BsEye />
            </div>
            <div>
              Visibility{' '} 
              <span className='ml-2'>{data.visibility/1000} Km</span>
            </div>
          </div>
          <div className='flex item-center  gap-x-2'>
            {/* {icon} */}
            <div className='text-[20px]'>
              <BsThermometer />
            </div>
            <div className='flex'>
              Feels like 
              <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                <TbTemperatureCelsius />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex item-center  gap-x-2'>
            {/* {icon} */}
            <div className='text-[20px]'>
              <BsWater />
            </div>
            <div>
              Humidity 
              <span className='ml-2'>{data.main.humidity} %</span>
            </div>
          </div>
          <div className='flex item-center  gap-x-2'>
            {/* {icon} */}
            <div className='text-[20px]'>
              <BsWind />
            </div>
            <div>
              Wind 
              <span className='ml-2'> {data.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      </div>

    </div>)}


    </div>

  </div>)

};

export default App;
