import { useState, useEffect } from "react";
import { ApiPaths } from "../utils/constants";

export function usePlotPoints() {
  const [plotPoints, setPlotPoints] = useState([]);

  useEffect(() => {
    fetch(ApiPaths.Api_PlotPoints)
      .then((res) => res.json())
      .then((data) => setPlotPoints(data))
      .catch((err) => console.error("Error loading plot points:", err));
  }, []);

  const addPlotPoint = () => {
    setPlotPoints(prev => [
      ...prev,
      { description: "", triggers: [] }
    ]);
  };

  const updatePlotPoint = (index, updatedPlotPoint) => {
    const currentPlotPoints = [...plotPoints];
    currentPlotPoints[index] = updatedPlotPoint;
    setPlotPoints(currentPlotPoints);

    fetch(ApiPaths.Api_PlotPoints, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentPlotPoints),
    }).catch(err => console.error("Error saving plot points:", err));
  };

  return { plotPoints, addPlotPoint, updatePlotPoint };
}