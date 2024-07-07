// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // import React from 'react';
// // import LayerNormalizationExample from './LayerNormalizationExample';

// // function App() {
// //   return (
// //     <div className="App">
// //       <LayerNormalizationExample />
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from 'react';
// import LayerNormalizationExample from './LayerNormalizationExample';
// import BatchNormalizationExample from './BatchNormalizationExample';
// // import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
// import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
// import { Button } from './components/ui/button';

// const App = () => {
//   const [selectedNormalization, setSelectedNormalization] = useState(null);

//   return (
//     <div className="container mx-auto my-4">
//       {!selectedNormalization ? (
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Select Normalization Example</h1>
//           <Button className="mr-2" onClick={() => setSelectedNormalization('layer')}>
//             Layer Normalization
//           </Button>
//           <Button onClick={() => setSelectedNormalization('batch')}>
//             Batch Normalization
//           </Button>
//         </div>
//       ) : (
//         <Card className="w-full max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle>
//               {selectedNormalization === 'layer'
//                 ? 'Layer Normalization Calculation Example'
//                 : 'Batch Normalization Calculation Example'}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {selectedNormalization === 'layer' ? (
//               <LayerNormalizationExample />
//             ) : (
//               <BatchNormalizationExample />
//             )}
//             <div className="text-center mt-4">
//               <Button onClick={() => setSelectedNormalization(null)}>Back</Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import LayerNormalizationExample from './LayerNormalizationExample';
import BatchNormalizationExample from './BatchNormalizationExample';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

const App = () => {
  const [selectedNormalization, setSelectedNormalization] = useState(null);

  return (
    <div className="container mx-auto my-4 text-center">
      {!selectedNormalization ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">Select Normalization Example</h1>
          <Button onClick={() => setSelectedNormalization('layer')}>
            Layer Normalization
          </Button>
          <Button onClick={() => setSelectedNormalization('batch')}>
            Batch Normalization
          </Button>
        </div>
      ) : (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {selectedNormalization === 'layer'
                ? 'Layer Normalization Calculation Example'
                : 'Batch Normalization Calculation Example'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNormalization === 'layer' ? (
              <LayerNormalizationExample />
            ) : (
              <BatchNormalizationExample />
            )}
            <div className="text-center mt-6">
              <Button onClick={() => setSelectedNormalization(null)}>Back</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
