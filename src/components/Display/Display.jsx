import style from "./Display.module.css";

export default function Display({
  numberOfMeasurements,
  totalExpositionTime,
  handleNoiseCalculation,
  result,
}) {
  return (
    <div className={style.container}>
      <button onClick={handleNoiseCalculation} className={style.displayButton}>
        calculate
      </button>
      <h3>
        Equivalent Exposure Level (L<small>AEX,8h</small>) without (U)
      </h3>
      <h1 className={style.displayHeading}>
        {result} <span>(dB)</span>
      </h1>
      <p>number of measurements: {numberOfMeasurements}</p>
      <p>exposition in minutes: {totalExpositionTime}</p>
    </div>
  );
}
