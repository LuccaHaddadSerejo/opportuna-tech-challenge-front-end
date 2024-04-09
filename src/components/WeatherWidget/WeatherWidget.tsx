import "./WeatherWidget.css";
import { useEffect, useState } from "react";

interface WeatherResponse {
  list: WeatherData[];
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  dt_txt: string;
}

interface getWeatherProps {
  city: string;
  date: string;
}

const API_KEY = "2cddc023dd09005c1b277ed47e80342e";

function WeatherWidget({ city, date }: getWeatherProps) {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const currentDate = new Date().toISOString().split("T")[0];

  const intervalOfDays = Array.from(
    {
      length: Math.abs(
        parseInt(currentDate.split("-")[2]) - parseInt(date.split("-")[2])
      ),
    },
    (_, i) => i + 1
  );

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = (await response.json()) as WeatherResponse;
        if (date == currentDate) {
          const currentDateData = data.list.filter((item) =>
            item.dt_txt.includes(currentDate)
          );
          setWeather(currentDateData);
        } else {
          const nextDaysData = data.list.filter((item) =>
            item.dt_txt.includes(date + " 12:00:00")
          );
          setWeather(nextDaysData);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (currentDate <= date && intervalOfDays.length <= 6) {
      getWeather();
    }
  }, []);

  if (currentDate <= date) {
    if (intervalOfDays.length <= 6) {
      return (
        <>
          <div className="ReminderWeatherWidget">
            <div>
              <p>
                {weather[0]?.weather[0]?.main}
                <img
                  src={`./assets/${weather[0]?.weather[0]?.icon}@2x.png`}
                  width="50"
                  height="50"></img>
              </p>
              <p>{weather[0]?.main.temp}ºC</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="ReminderWeatherWidget">No weather information</div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="ReminderWeatherWidget">No weather information</div>
      </>
    );
  }
}

export default WeatherWidget;
