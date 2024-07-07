import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

const BatchNormalizationExample = () => {
  const [step, setStep] = useState(0);
  const [inputValues, setInputValues] = useState([
    [2, -1, 3],
    [0, 2, -2],
    [-1, 1, 0],
    [3, -2, 1],
  ]);

  const handleInputChange = (i, j, value) => {
    const newValues = [...inputValues];
    newValues[i][j] = parseFloat(value);
    setInputValues(newValues);
  };

  const means = inputValues[0].map(
    (_, j) =>
      inputValues.reduce((sum, row) => sum + row[j], 0) / inputValues.length
  );
  const variances = inputValues[0].map(
    (_, j) =>
      inputValues.reduce(
        (sum, row) => sum + Math.pow(row[j] - means[j], 2),
        0
      ) / inputValues.length
  );
  const normalized = inputValues.map((row) =>
    row.map((x, j) => (x - means[j]) / Math.sqrt(variances[j] + 1e-5))
  );

  const steps = [
    {
      title: "Initial Setup",
      content: (
        <>
          <p>Enter the values for the inputs to the layer:</p>
          {inputValues.map((row, i) => (
            <div key={i} className="mb-2">
              {row.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  value={val}
                  onChange={(e) => handleInputChange(i, j, e.target.value)}
                  className="block mt-2 p-1 border"
                />
              ))}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Step 1: Calculate Mean per Feature",
      content: (
        <div>
          <p>Means (μ) for each feature:</p>
          <pre>{JSON.stringify(means, null, 2)}</pre>
        </div>
      ),
    },
    {
      title: "Step 2: Calculate Variance per Feature",
      content: (
        <div>
          <p>Variances (σ²) for each feature:</p>
          <pre>{JSON.stringify(variances, null, 2)}</pre>
        </div>
      ),
    },
    {
      title: "Step 3: Normalize Features",
      content: (
        <div>
          <p>Normalized inputs:</p>
          <pre>{JSON.stringify(normalized, null, 2)}</pre>
        </div>
      ),
    },
    {
      title: "Step 4: Scale and Shift",
      content: (
        <p>
          Apply scale (γ) and shift (β). Assuming γ = [1, 0.5, 2] and β = [0, 1,
          -1]
        </p>
      ),
    },
  ];

  return (
    <>
      <CardHeader>
        <CardTitle>Batch Normalization Calculation Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{steps[step].title}</h3>
          {steps[step].content}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default BatchNormalizationExample;
