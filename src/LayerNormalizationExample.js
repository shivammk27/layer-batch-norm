// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
// import { Button } from "./components/ui/button";

// const LayerNormalizationExample = () => {
//   const [step, setStep] = useState(0);

//   const steps = [
//     {
//       title: "Initial Setup",
//       content: (
//         <>
//           <p>
//             Consider a simple neural network layer with 4 neurons. The input to
//             this layer for a single sample is:
//           </p>
//           <p className="font-mono mt-2">x = [2, -1, 3, 0]</p>
//         </>
//       ),
//     },
//     {
//       title: "Step 1: Calculate Mean",
//       content: (
//         <>
//           <p>First, we calculate the mean (μ) of the inputs:</p>
//           <p className="font-mono mt-2">μ = (2 + (-1) + 3 + 0) / 4 = 1</p>
//         </>
//       ),
//     },
//     {
//       title: "Step 2: Calculate Variance",
//       content: (
//         <>
//           <p>Next, we calculate the variance (σ²) of the inputs:</p>
//           <p className="font-mono mt-2">
//             σ² = ((2-1)² + (-1-1)² + (3-1)² + (0-1)²) / 4
//           </p>
//           <p className="font-mono">σ² = (1 + 4 + 4 + 1) / 4 = 2.5</p>
//         </>
//       ),
//     },
//     {
//       title: "Step 3: Normalize Inputs",
//       content: (
//         <>
//           <p>
//             Now, we normalize each input using the formula: (x - μ) / √(σ² + ε)
//           </p>
//           <p>
//             Where ε is a small number to prevent division by zero. Let's use ε =
//             1e-5
//           </p>
//           <p className="font-mono mt-2">x̂₁ = (2 - 1) / √(2.5 + 1e-5) ≈ 0.632</p>
//           <p className="font-mono">x̂₂ = (-1 - 1) / √(2.5 + 1e-5) ≈ -1.265</p>
//           <p className="font-mono">x̂₃ = (3 - 1) / √(2.5 + 1e-5) ≈ 1.265</p>
//           <p className="font-mono">x̂₄ = (0 - 1) / √(2.5 + 1e-5) ≈ -0.632</p>
//         </>
//       ),
//     },
//     {
//       title: "Step 4: Scale and Shift",
//       content: (
//         <>
//           <p>
//             Finally, we apply a scale (γ) and shift (β) to the normalized
//             values. These are learnable parameters.
//           </p>
//           <p>Let's assume γ = [1.5, 1, 0.5, 2] and β = [0, 1, -1, 0.5]</p>
//           <p className="font-mono mt-2">y₁ = 1.5 * 0.632 + 0 ≈ 0.948</p>
//           <p className="font-mono">y₂ = 1 * (-1.265) + 1 ≈ -0.265</p>
//           <p className="font-mono">y₃ = 0.5 * 1.265 + (-1) ≈ -0.368</p>
//           <p className="font-mono">y₄ = 2 * (-0.632) + 0.5 ≈ -0.764</p>
//         </>
//       ),
//     },
//     {
//       title: "Final Result",
//       content: (
//         <>
//           <p>The layer-normalized output for this sample is:</p>
//           <p className="font-mono mt-2">y = [0.948, -0.265, -0.368, -0.764]</p>
//           <p className="mt-2">
//             This output maintains the same mean and standard deviation across
//             different samples, which helps to stabilize the learning process.
//           </p>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle>Layer Normalization Calculation Example</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">{steps[step].title}</h3>
//           {steps[step].content}
//         </div>
//         <div className="flex justify-between mt-4">
//           <Button
//             onClick={() => setStep(Math.max(0, step - 1))}
//             disabled={step === 0}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
//             disabled={step === steps.length - 1}
//           >
//             Next
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LayerNormalizationExample;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

const LayerNormalizationExample = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState([2, -1, 3, 0]);
  const [gamma, setGamma] = useState([1.5, 1, 0.5, 2]);
  const [beta, setBeta] = useState([0, 1, -1, 0.5]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = parseFloat(value);
    setInputs(newInputs);
  };

  const handleGammaChange = (index, value) => {
    const newGamma = [...gamma];
    newGamma[index] = parseFloat(value);
    setGamma(newGamma);
  };

  const handleBetaChange = (index, value) => {
    const newBeta = [...beta];
    newBeta[index] = parseFloat(value);
    setBeta(newBeta);
  };

  const mean = inputs.reduce((acc, val) => acc + val, 0) / inputs.length;
  const variance = inputs.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / inputs.length;
  const normalizedInputs = inputs.map(val => (val - mean) / Math.sqrt(variance + 1e-5));
  const output = normalizedInputs.map((val, index) => gamma[index] * val + beta[index]);

  const steps = [
    {
      title: "Initial Setup",
      content: (
        <>
          <p>Consider a simple neural network layer with 4 neurons. The input to this layer for a single sample is:</p>
          {inputs.map((input, index) => (
            <input
              key={index}
              type="number"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="font-mono mt-2 mr-2 p-1 border rounded"
            />
          ))}
        </>
      )
    },
    {
      title: "Step 1: Calculate Mean",
      content: (
        <>
          <p>First, we calculate the mean (μ) of the inputs:</p>
          <p className="font-mono mt-2">μ = ({inputs.join(' + ')}) / {inputs.length} = {mean}</p>
        </>
      )
    },
    {
      title: "Step 2: Calculate Variance",
      content: (
        <>
          <p>Next, we calculate the variance (σ²) of the inputs:</p>
          <p className="font-mono mt-2">
            σ² = ({inputs.map(val => `(${val}-${mean})²`).join(' + ')}) / {inputs.length} = {variance.toFixed(2)}
          </p>
        </>
      )
    },
    {
      title: "Step 3: Normalize Inputs",
      content: (
        <>
          <p>Now, we normalize each input using the formula: (x - μ) / √(σ² + ε)</p>
          <p>Where ε is a small number to prevent division by zero. Let's use ε = 1e-5</p>
          {normalizedInputs.map((val, index) => (
            <p key={index} className="font-mono">x̂{index + 1} = ({inputs[index]} - {mean}) / √({variance.toFixed(2)} + 1e-5) ≈ {val.toFixed(3)}</p>
          ))}
        </>
      )
    },
    {
      title: "Step 4: Scale and Shift",
      content: (
        <>
          <p>Finally, we apply a scale (γ) and shift (β) to the normalized values. These are learnable parameters.</p>
          <p>γ = </p>
          {gamma.map((val, index) => (
            <input
              key={index}
              type="number"
              value={val}
              onChange={(e) => handleGammaChange(index, e.target.value)}
              className="font-mono mt-2 mr-2 p-1 border rounded"
            />
          ))}
          <p>β = </p>
          {beta.map((val, index) => (
            <input
              key={index}
              type="number"
              value={val}
              onChange={(e) => handleBetaChange(index, e.target.value)}
              className="font-mono mt-2 mr-2 p-1 border rounded"
            />
          ))}
          {output.map((val, index) => (
            <p key={index} className="font-mono">y{index + 1} = {gamma[index]} * {normalizedInputs[index].toFixed(3)} + {beta[index]} ≈ {val.toFixed(3)}</p>
          ))}
        </>
      )
    },
    {
      title: "Final Result",
      content: (
        <>
          <p>The layer-normalized output for this sample is:</p>
          <p className="font-mono mt-2">y = [{output.map(val => val.toFixed(3)).join(', ')}]</p>
          <p className="mt-2">This output maintains the same mean and standard deviation across different samples, which helps to stabilize the learning process.</p>
        </>
      )
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Layer Normalization Calculation Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{steps[step].title}</h3>
          {steps[step].content}
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerNormalizationExample;
