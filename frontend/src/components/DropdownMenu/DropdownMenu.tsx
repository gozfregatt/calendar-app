import React, { useState } from 'react'; // Importing Modules

interface Props {
  values: string[];
  selectedValue: string;
  handleValueChange:any;
  className:string;
}

function DropdownMenu({values, selectedValue, handleValueChange, className}: Props) {

  return (
    <select className={className} value={selectedValue} onChange={(event) => handleValueChange(event.target.value)}>
      {values.map( (value, index) => (
        <option key={`departments-${value}-${index}`} value={value}>{value}</option>
      ))}
    </select>
    );
}

export default DropdownMenu;