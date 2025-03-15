import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { Title } from "./ui";

const TooltipContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h4 {
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: #2c3e50;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 30%;
  background-color: ${({ color }) => color};
`;

const prepareChartData = (data) => {
  if (!data) return [];

  return data.map((item) => ({
    name: getEmotionLabel(item.emotion),
    value: item.count,
    emotion: item.emotion,
    intensity: item.averageIntensity,
  }));
};

const getEmotionLabel = (emotion) => {
  const labels = {
    happy: "Feliz",
    sad: "Triste",
    angry: "Enojado",
    anxious: "Ansioso",
    neutral: "Neutral",
  };
  return labels[emotion] || emotion;
};

const getEmotionColor = (emotion) => {
  const colors = {
    happy: "#FFC107",
    sad: "#2196F3",
    angry: "#F44336",
    anxious: "#8230c8",
    neutral: "#9E9E9E",
  };
  return colors[emotion] || "#000000";
};

const EmotionChart = ({ data }) => {
  const chartKey = Date.now();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart key={chartKey}>
        <Pie
          data={prepareChartData(data)}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          animationDuration={800}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {prepareChartData(data).map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getEmotionColor(entry.emotion)}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <TooltipContainer>
                  <Title order={4}>{getEmotionLabel(data.emotion)}</Title>
                  <p>Registros: {data.value}</p>
                  <p>
                    Intensidad promedio:{" "}
                    {data.intensity % 1 === 0
                      ? data.intensity
                      : data.intensity.toFixed(1)}
                    /10
                  </p>
                </TooltipContainer>
              );
            }
            return null;
          }}
        />
        <Legend
          content={
            <LegendContainer>
              <LegendList>
                {prepareChartData(data).map((entry, index) => (
                  <LegendItem key={`legend-${index}`}>
                    <ColorIndicator color={getEmotionColor(entry.emotion)} />
                    <span>{getEmotionLabel(entry.emotion)}</span>
                  </LegendItem>
                ))}
              </LegendList>
            </LegendContainer>
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EmotionChart;
