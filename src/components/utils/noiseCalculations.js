/**
 * Calculates normalized sound level from multiple measurements
 * @param {Array} measurements - Array of measurement objects with dbInput and expositionTime
 * @returns {number|null} - Normalized sound level in dB or null if invalid
 */

export const calculateNormalizedNoise = (measurements) => {
  let totalNumerator = 0;
  let hasValidInputs = false;

  for (let measurement of measurements) {
    const noiseValue = measurement.dbInput;
    const timeValue = measurement.expositionTime;

    // Check if either field is empty
    if (noiseValue === "" || timeValue === "") {
      continue; // Skip empty fields
    }

    // Parse values
    const noiseNum = parseFloat(noiseValue);
    const timeNum = parseFloat(timeValue);

    // Validate that values are valid numbers and positive
    if (!isNaN(noiseNum) && !isNaN(timeNum) && timeNum > 0) {
      const numerator = (timeNum / 60) * Math.pow(10, noiseNum / 10);
      totalNumerator += numerator;
      hasValidInputs = true;
    }
  }

  // Check for invalid results
  if (!hasValidInputs || totalNumerator <= 0) {
    return null;
  }

  const result = 10 * Math.log10(totalNumerator / 8);

  // Check if result is finite
  if (!isFinite(result)) {
    return null;
  }

  return Math.round(result * 100) / 100;
};

/**
 * Calculates total exposition time from measurements
 * @param {Array} measurements - Array of measurement objects
 * @returns {number} - Total exposition time
 */
export const calculateTotalExpositionTime = (measurements) => {
  return measurements.reduce((acc, item) => {
    const timeValue = parseFloat(item.expositionTime);
    return acc + (isNaN(timeValue) ? 0 : timeValue);
  }, 0);
};

/**
 * Validates a single measurement
 * @param {Object} measurement - Measurement object with dbInput and expositionTime
 * @returns {boolean} - True if measurement is valid
 */
export const validateMeasurement = (measurement) => {
  const noiseNum = parseFloat(measurement.dbInput);
  const timeNum = parseFloat(measurement.expositionTime);

  return !isNaN(noiseNum) && !isNaN(timeNum) && timeNum > 0;
};
