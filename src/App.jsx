import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  
  
  let [largo, setLargo] = useState(5);
  let [sesion, setSesion] = useState(1500);  
  let [min, setMin] = useState(1500);
  let [play, setPlay] = useState(false);
  let [vuelta, setVuelta] = useState(0);

  useEffect(() => {        
    let intervalo;
    if (play == true) {
        intervalo = setInterval( () => {          
          setSesion(sesion => sesion -1)                 
        }

      , 1000)                      
    }

    return () => {
      clearInterval(intervalo)  
    }
  }, [play])

  const reducirBreak = () => {
    if (largo > 1) {
      setLargo(largo - 1)
    }     
  }

  const aumentarBreak = () => {
    if (largo < 60) {
      setLargo(largo + 1)
    }    
  }

  const reducirSesion = () => {
    console.log(sesion/60,  min/60)
    if (sesion/60 > 1 && min/60 > 1) {
      setSesion(sesion - 60)
      setMin(min - 60)
      console.log(sesion)
    }
  }

  const aumentarSesion = () => {
    if (sesion/60  < 60 && min/60 < 60) {
      setSesion(sesion + 60)
      setMin(min + 60)
      console.log(sesion)
    }  
  }

  
  function handleTime() {               
    setPlay(!play)
  }
    
  const caratula = () => {
    let minuto = (Math.floor(sesion/60));
    let segundo = sesion - minuto*60;
    return (`${Math.floor(sesion/60)<10 ? '0'+ Math.floor(sesion/60) : Math.floor(sesion/60) }:${segundo<10 ? '0'+ segundo : segundo}`)    
  }

  const reseteo = () => {
    
    setPlay(false)    
    setMin(1500)
    setSesion(1500)
    setLargo(5)
    setVuelta(0)
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;

  }

  const cambio = () => {
    if (sesion < 0 && vuelta == 0) {
      setVuelta(1)
      setSesion(largo*60)
      document.getElementById('beep').play();
    } else if (sesion < 0 && vuelta == 1) {
      setVuelta(0)
      setSesion(min)
      document.getElementById('beep').play();
      // document.getElementById('beep').currentTime = 0;    
    }
  }

  const reloj = () => {
    if(play){
      cambio()
    } else {
      setPlay(false)
    }
  }

  useEffect(() => {
    reloj()
  })
  return (
    <>
      {/* <div>{caratula()}</div> */}
      {/* <div id='start-stop' onClick={handleTime}>Start</div> */}
      <div className='container-fluid'>
      <div className='row'>
        <div className='text-center title'>25 + 5 Clock</div>
      </div>
      <div className='row align-items-center'>
        <div className='col-md-4 col-sm-12'>
          <div id="break-label" className='text-center h2'>Break Length</div>
          <div id="break-decrement" onClick={reducirBreak} className='h3 btn btn-block btn-dark '>-</div>
          <div id="break-length" className='h1'>{largo}</div>
          <div id="break-increment" onClick={aumentarBreak} className='h3 btn btn-dark'>+</div>
        </div>
        <div className='col-md-4 col-sm-12'>
          <div id="timer-label" className='m-md-5'>{vuelta == 0 ? 'Session' : 'Break'}</div>
          <div id="time-left" >{caratula()}</div>          
          <div className='row'>
            <div id='start_stop' className='col-md-6 mt-md-5 col-sm-12  btn btn-primary' onClick={handleTime}>Play/Pause</div>
            <div id='reset' className='col-md-6 mt-md-5 col-sm-12 btn btn-primary' onClick={reseteo}>Stop</div>
          </div>
        </div>
        <div className='col-md-4 col-sm-12'>
          <div id="session-label" className='h2'>Session Length</div>
          <div id="session-decrement" className='h3 btn btn-dark' onClick={reducirSesion}>-</div>          
          <div id="session-length" className='h1'>{Math.floor(min/60)}</div>
          <div id="session-increment" className='h3 btn btn-dark' onClick={aumentarSesion}>+</div>        
        </div>
      </div>      
      <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
    </>
  )
}






export default App
