import { Progress } from "antd";
import { FC } from "react";

interface CircularProgressBarProps {
  waterLevel: number;
  river: string;
}

const CircularProgressBar: FC<CircularProgressBarProps> = ({ waterLevel,river }) => {
  const getColor = (waterLevel: number) => {
    if ((waterLevel/2000) *100 >= 90) {
      return "#ff4d4f"; // Red color for danger
    } else if ((waterLevel/2000) *100 >= 30) {
      return "#aef359"; // Green color for favorable weather
    }
    return "#d6967a"; // Default brown color for dry season
  };

  const color = getColor(waterLevel);

  return (
    <div style={{ textAlign: "center" }}>
      <Progress
        type="circle"
        percent={(waterLevel/200) *100}
        strokeColor={color}
        
      />
     
      <h3 style={{ marginTop: "1rem", color }}>Water Level: {waterLevel}m</h3>
      <h4 style={{ marginTop: "1rem", color:'GrayText' }}>
        {
          river
        }
      </h4>
    </div>
  );
};

export default CircularProgressBar;


