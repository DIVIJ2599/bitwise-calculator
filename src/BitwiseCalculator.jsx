import { useState } from 'react';

const BitwiseCalculator = () => {
  const [variables, setVariables] = useState([{ name: '', value: false }]);
  const [selectedVariables, setSelectedVariables] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState('Constant');
  const [result, setResult] = useState(false);

  const handleVariableNameChange = (index, name) => {
    const updatedVariables = [...variables];
    updatedVariables[index].name = name;
    setVariables(updatedVariables);
  };

  const handleVariableValueChange = (index, value) => {
    const updatedVariables = [...variables];
    updatedVariables[index].value = value === 'true';
    setVariables(updatedVariables);
  };

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', value: false }]);
  };

  const handleRemoveVariable = (index) => {
    const updatedVariables = variables.filter((variable, i) => i !== index);
    setVariables(updatedVariables);
  };

  const handleVariableSelection = (index, selectedVariable) => {
    const updatedSelectedVariables = [...selectedVariables];
    updatedSelectedVariables[index] = selectedVariable;
    setSelectedVariables(updatedSelectedVariables);
  };

  const handleAddSelectedVariable = () => {
    setSelectedVariables([...selectedVariables, variables[0]]);
  };

  const handleRemoveSelectedVariable = (index) => {
    const updatedSelectedVariables = selectedVariables.filter((variable, i) => i !== index);
    setSelectedVariables(updatedSelectedVariables);
  };

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const handleCalculate = () => {
    let bitwiseResult;
  
    if (selectedOperation === 'Constant') {
      bitwiseResult = selectedVariables[0]?.value || false;
    } else if (selectedOperation === 'Variable') {
      bitwiseResult = selectedVariables.reduce((result, variable) => {
        return result && variable.value;
      }, true);
    } else if (selectedOperation === 'And') {
      bitwiseResult = selectedVariables.reduce((result, variable) => {
        return result && variable.value;
      }, true);
    } else if (selectedOperation === 'Or') {
      bitwiseResult = selectedVariables.reduce((result, variable) => {
        return result || variable.value;
      }, false);
    }
  
    setResult(bitwiseResult ? 'true' : 'false');
  };
  

  return (
    <div>
      <h1>Bitwise Calculator</h1>
      <div>
        {variables.map((variable, index) => (
          <div key={index}>
            <input
              type="text"
              value={variable.name}
              placeholder="Variable name"
              onChange={(e) => handleVariableNameChange(index, e.target.value)}
            />
            <select
              value={variable.value.toString()}
              onChange={(e) => handleVariableValueChange(index, e.target.value)}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <button onClick={() => handleRemoveVariable(index)}>X</button>
          </div>
        ))}
        <button onClick={handleAddVariable}>+</button>
      </div>
      <div>
        <h3>Select Variables for Calculation:</h3>
        {selectedVariables.map((variable, index) => (
          <div key={index}>
            {selectedOperation === 'Constant' ? (
              <select
                value={variable.value.toString()}
                onChange={(e) => handleVariableValueChange(index, e.target.value)}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            ) : (
              <select
                value={variable.name}
                onChange={(e) => handleVariableSelection(index, variables.find(v => v.name === e.target.value))}
              >
                {variables.map((variable, index) => (
                  <option key={index} value={variable.name}>
                    {variable.name}
                  </option>
                ))}
              </select>
            )}
            <button onClick={() => handleRemoveSelectedVariable(index)}>X</button>
          </div>
        ))}
        <button onClick={handleAddSelectedVariable}>+</button>
      </div>
      <div>
        <label>Operation: </label>
        <select value={selectedOperation} onChange={handleOperationChange}>
          <option value="Constant">Constant</option>
          <option value="Variable">Variable</option>
          <option value="And">And</option>
          <option value="Or">Or</option>
        </select>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      <h1>Result: {result.toString()}</h1>
    </div>
  );
};

export default BitwiseCalculator;
