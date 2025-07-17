export default function Display({
  numberOfMeasurements,
  totalExpositionTime,
  normalizedSoundLevel,
}) {
  return (
    <div>
      <h1>Hello from display</h1>
      <p>number of measurements: {numberOfMeasurements}</p>
      <p>exposition in minutes: {totalExpositionTime}</p>
      <h3>
        Equivalent Exposure Level (Lex,8) without (u) : {normalizedSoundLevel}
      </h3>
    </div>
  );
}
