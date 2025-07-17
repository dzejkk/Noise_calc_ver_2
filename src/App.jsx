import "./index.css";
import styles from "./app.module.css";
import Heading from "./components/heading/Heading";
import ValueList from "./components/valueList/valueList";
import Display from "./components/Display/Display";
import { useState } from "react";
import {
  calculateTotalExpositionTime,
  calculateNormalizedNoise,
} from "./components/utils/noiseCalculations";

function App() {
  // state
  const [measurements, setMeasurements] = useState([
    {
      dbInput: "",
      expositionTime: "",
      idOfMeasurement: crypto.randomUUID(),
    },
    {
      dbInput: "",
      expositionTime: "",
      idOfMeasurement: crypto.randomUUID(),
    },
    {
      dbInput: "",
      expositionTime: "",
      idOfMeasurement: crypto.randomUUID(),
    },
  ]);
  const [result, setResult] = useState("");

  // handlers
  const handleAddInputRow = () => {
    setMeasurements([
      ...measurements,
      { dbInput: "", expositionTime: "", idOfMeasurement: uniqId() },
    ]);
  };

  const handleRemoveInputRow = () => {
    setMeasurements(measurements.slice(0, -1));
  };

  const handleInputChange = (id, field, value) => {
    setMeasurements((oldState) =>
      oldState.map((item) =>
        item.idOfMeasurement === id ? { ...item, [field]: value } : item
      )
    );
  };

  // utils
  const uniqId = () => crypto.randomUUID();
  const numberOfMeasurements = measurements.length;

  /////////////// main calculation

  const totalExpositionTime = calculateTotalExpositionTime(measurements);

  // calculation handlers
  const handleNoiseCalculation = () => {
    setResult(calculateNormalizedNoise(measurements));
  };

  ///////////////////////////////

  return (
    <>
      <div className={styles.container}>
        <Heading />
        <div className={styles.AppContainer}>
          <ValueList
            measurements={measurements}
            handleInputChange={handleInputChange}
            handleAddInputRow={handleAddInputRow}
            handleRemoveInputRow={handleRemoveInputRow}
          />
          <Display
            numberOfMeasurements={numberOfMeasurements}
            totalExpositionTime={totalExpositionTime}
            handleNoiseCalculation={handleNoiseCalculation}
            result={result}
          />
        </div>
      </div>
    </>
  );
}

export default App;
