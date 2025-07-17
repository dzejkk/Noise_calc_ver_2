export default function Display({
  numberOfMeasurements,
  totalExpositionTime,
  handleNoiseCalculation,
  result,
}) {
  return (
    <div>
      <h1>Hello from display</h1>
      <p>number of measurements: {numberOfMeasurements}</p>
      <p>exposition in minutes: {totalExpositionTime}</p>
      <h3>Equivalent Exposure Level (Lex,8) without (u) : {result}</h3>
      <button onClick={handleNoiseCalculation}>calculate</button>
    </div>
  );
}
