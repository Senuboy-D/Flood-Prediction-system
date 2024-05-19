import Title from "antd/es/typography/Title";
import GoogleMap from "google-maps-react-markers";
import { FC, useRef, useState } from "react";

interface Coordinate {
  lat: number;
  lng: number;
}
const AnyReactComponent = ({ text, isGreen, lat, lng }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* <div style={{ fontWeight: 'bold' }}>{`Lat: ${lat}, Lng: ${lng}`}</div> */}
    <div style={{ color: isGreen ? 'green' : 'red', fontWeight: 'bold' }}>
      {text}
    </div> 
  </div>
);

const Map: FC<any> = (
  {status}
) => {
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const coordinates: Coordinate[] = [
    { lat: 8.092345, lng: 80.458888 },
    { lat: 8.023208, lng: 80.055764 },
    { lat: 8.146144, lng: 79.848975 },
    { lat: 8.144798, lng: 80.237000 },
    { lat: 8.001200, lng: 80.207799 },
  ];

  const nearRatnapuraKaluGangaCoordinates :Coordinate[] = [
    { lat: 6.697131, lng: 80.366830},
    { lat: 6.696119, lng: 80.370046 },
    { lat: 6.692379, lng: 80.371379},
    { lat: 6.690743, lng: 80.374203},
    { lat: 6.691133, lng: 80.377654},
    { lat: 6.687627, lng: 80.380713},
    { lat: 6.685602, lng: 80.384085},
    { lat: 6.683732, lng: 80.390125},
    
  
];

  return (
    <GoogleMap
      apiKey="AIzaSyAi12ZRgQQkh7IubNDTpl_7aQ4jcjgeHYw"
      defaultCenter={{ lat: 6.706490560002989, lng: 80.38322173620007}}
      defaultZoom={10}
      mapMinHeight="50vh"
      onGoogleApiLoaded={onGoogleApiLoaded}
      onChange={(map: any) => console.log("Map moved", map)}
    >

      {
        console.log("status", status)
      }
      {nearRatnapuraKaluGangaCoordinates.map(({ lat, lng }, index) => (
        <AnyReactComponent
          key={index}
          lat={lat}
          lng={lng}
          text={
            <Title level={3} type={status === "Alert" || status === "Warning"   ? "danger" : "success"}>
              {status != "Alert"  ? "△" : "▲"}
            </Title>
          }
          isGreen={
            status === "Alert" || status === "Warning"
          } // Determine if it's a green marker
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
