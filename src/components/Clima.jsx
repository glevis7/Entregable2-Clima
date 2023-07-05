import axios from 'axios'
import { useState, useEffect } from 'react'

const Clima = () => {

    const [climaData, setClimaData] = useState({})

    const [iscelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ddbf4b57a81f0fcb00da6fa6c810bf72&units=metric&lang=sp, es`)

                .then(resp => {
                    console.log(resp.data)
                    setClimaData(resp.data)
                })
                .catch(error => console.error(error))



            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, [])

    console.log(climaData.weather?.[0].icon)

    const celsius = climaData.main?.temp;
    const Fahrenheit = (climaData.main?.temp * 9 / 5) + 32;

    const changeUnits = () => {
        setIsCelsius(!iscelsius);
    }


    return (
        <>
            <div className="Card-Clima">

                <div class="content">
                    <h1>{Clima.stations}</h1>


                    <img className="icons" src={`/iconos/${climaData.weather?.[0].icon}.svg`} alt="" />

                    <h2>{climaData.name}</h2>
                    <h3><b>País:</b> {climaData.sys?.country}</h3>
                    <h1><b>Temp:</b>{" "}
                        {iscelsius ? celsius :
                            Fahrenheit} {" "}
                        {iscelsius ? 'celsius' :
                            'Fahrenheit'}</h1>

                    <ul>
                        <li><b>Tipo de clima: {climaData.weather?.[0].description}</b></li>
                        <li><b>Latitud: {climaData.coord?.lat}</b></li>
                        <li><b>Longitud: {climaData.coord?.lon}</b></li>

                    </ul>

                    <section>

                        <div className="footer">
                            <button onClick={changeUnits}>Cambiar a °F</button>
                        </div>
                    </section>
                </div>

            </div>
        </>
    );
};

export default Clima
