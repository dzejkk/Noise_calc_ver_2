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
import { useValidation } from "./components/hooks/useValidation";

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
  const [result, setResult] = useState("0");

  //validations with zod
  const { errors, validateField, validateAllMeasurements } = useValidation();

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
    validateField(id, field, value);
  };

  // utils
  const uniqId = () => crypto.randomUUID();
  const numberOfMeasurements = measurements.length;

  /////////////// main calculation

  const totalExpositionTime = calculateTotalExpositionTime(measurements);

  // calculation handlers
  const handleNoiseCalculation = () => {
    const hasEmptyFields = measurements.some(
      (measurement) =>
        !measurement.dbInput.trim() || !measurement.expositionTime.trim()
    );

    if (hasEmptyFields) {
      alert("please fill in all fields before evaluating");
      return;
    }

    if (!validateAllMeasurements(measurements)) {
      alert("please fix input errors before calculating");
      return;
    }

    // if validtion passes proceed with calculation

    try {
      const calculatedResult = calculateNormalizedNoise(measurements);
      setResult(calculatedResult);
    } catch (error) {
      alert("Error in calculation, Please chekc your inputs");
      console.error("Calculation error:", error);
    }
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
            errors={errors}
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
