import { Card, Col, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useEffect, useState } from "react";
import ReportsTable from "../components/ReportsTable";
import Map from "../components/Map";
import SubscribeForm from "../components/SubscribeForm";
import CircularProgressBar from "../components/CircularProgressBar";
import { API_KEY, locations } from "../utils/const";
import axios from "axios";


const Reports: FC = () => {


  const [weatherData,setWeatherData] = useState<any>();
  const [selectedRiver,setSelectedRiver] = useState<any>("all");
  const [waterLevel,setWaterLevel] = useState<any>([]);
  const [streamLevel,setStreamLevel] = useState<any>(0);
  const [floodStatus,setFloodStatus] = useState<any>("");


  const fetchWeather = async () => {
    const location = locations[0];
    const latitude = location?.lat;
    const longitude = location?.lon;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  };



  const fetchWaterLevelForEachRiver = async (weatherData: { temperature: any; humidity: any; windSpeed: any; }) => {
   
    try {
      const waterLevels = await  axios.post("http://127.0.0.1:5000/prediction/predict",{
      
    
        river_basin: selectedRiver ?? "all",
        temperature: weatherData?.temperature,
        humidity: weatherData?.humidity,
        wind_speed: weatherData?.windSpeed
      
    
    }
    );
    
    console.log(waterLevels.data);
    // get a water level waterLevel.data like  {"riverName":"2m"}
    let waterLevel: any[] = [

    ]
    Object.entries(waterLevels.data).forEach(([key, value]) => {
      setWaterLevel(
        waterLevel.concat({
          river: key,
          waterLevel: value
        })
      );
      console.log(parseFloat((value as string).replace("m", "")));
      let streamLevel = parseFloat((value as string).replace("m", ""));
      let correctValue = (streamLevel) ^3 /3600;
      setStreamLevel(correctValue);
      // setStreamLevel()
    });
    }
    catch (error) {
      console.error("Failed to fetch water level data", error);
    }
  }

  const fetchFloodingStatus = async () => {
    const floodingStatus = await axios.post("http://127.0.0.1:5000/prediction/predictFloodRisk",{
      river_basin: waterLevel?.map((level:any) => level.river)[0],
      waterLevel: parseFloat(waterLevel?.map((level:any) => level.waterLevel)[0].replace("m",""))
      
    });

    console.log(floodingStatus.data?.status);
    setFloodStatus(floodingStatus.data?.status);
    }

  useEffect(() => {
    fetchWeather()
  },[]);


  useEffect(() =>{
    fetchWaterLevelForEachRiver(weatherData)

    
  },[weatherData,selectedRiver])

  useEffect(() => {
    if(waterLevel.length > 0){
      fetchFloodingStatus()
    }
  },[waterLevel])

  return (
    <div>
      <div>
      <Title>Real Time Flood Forecast</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={12}>
              <Card title="Stream Flow" bordered={false}>
                <Title style={{ marginTop: 0 }}> 
                  {streamLevel?.toFixed(2)} m<sup>3</sup>/s
                 </Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Flood status" bordered={false}>
                <Title style={{ marginTop: 0 }} type="danger">
                  {
                    floodStatus === "Flood" ? "Flood" : floodStatus ?? "Unknown"
                  }
                </Title>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={24}>
              <Card title="Get Flood Alerts" bordered={false}>
                <SubscribeForm />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Real time water level" bordered={false} style={{justifyContent: "center", alignItems: "center" }}>
                <Select placeholder="Select a River" style={{ width: 220, marginBottom: "1rem" }}
                
                onChange={(value) => {
                  setSelectedRiver(value)
                  setWaterLevel([])
                }}

                >
                  <Select.Option value="Kalu">Kalu</Select.Option>
                  <Select.Option value="Kelani">
                    Kelani
                  </Select.Option>
                  <Select.Option value="Gin">
                    Gin
                  </Select.Option>
                  <Select.Option value="Nilwala">
                    Nilwala
                  </Select.Option>

                </Select>
                {
                  waterLevel?.map((level:any) => {
                    return (
                      <CircularProgressBar waterLevel={level.waterLevel?.replace("m","")
                    }   river={level?.river}  />
                    )
                  }
                  )
                }
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={24}>
              <Card title="Real time map" bordered={false}>
                <Map  status={floodStatus}
                 />
              </Card>
            </Col>
          </Row>
         
        </Col>
      </Row>
    </div>
     
    </div>
  );
};

export default Reports;
