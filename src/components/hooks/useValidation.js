import { useState } from "react";
import { measurementSchema } from "../utils/validation";

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (id, field, value) => {
    try {
      // Validate the specific field by creating a minimal object
      const testData = {
        dbInput: field === "dbInput" ? value : "",
        expositionTime: field === "expositionTime" ? value : "",
      };

      // Get the field schema and validate just that field
      const fieldSchema = measurementSchema.shape[field];
      fieldSchema.parse(value);

      // Clear error if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${field}`];
        return newErrors;
      });
      return true;
    } catch (error) {
      // Handle Zod error properly
      let errorMessage = "Invalid input";

      if (error?.issues && error.issues.length > 0) {
        errorMessage = error.issues[0].message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setErrors((prev) => ({
        ...prev,
        [`${id}-${field}`]: errorMessage,
      }));
      return false;
    }
  };

  const validateAllMeasurements = (measurements) => {
    let isValid = true;
    const newErrors = {};

    measurements.forEach((measurement) => {
      try {
        // Validate the entire measurement object
        measurementSchema.parse({
          dbInput: measurement.dbInput,
          expositionTime: measurement.expositionTime,
        });
      } catch (error) {
        // Handle multiple field errors safely
        if (error?.issues && Array.isArray(error.issues)) {
          error.issues.forEach((issue) => {
            const fieldName = issue.path[0]; // Get the field name from the path
            newErrors[`${measurement.idOfMeasurement}-${fieldName}`] =
              issue.message;
            isValid = false;
          });
        } else {
          // Fallback for unexpected error structure
          newErrors[`${measurement.idOfMeasurement}-general`] =
            error?.message || "Validation failed";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const hasAnyErrors = () => {
    return Object.keys(errors).length > 0;
  };

  return {
    errors,
    validateField,
    validateAllMeasurements,
    clearErrors,
    hasAnyErrors,
  };
};
