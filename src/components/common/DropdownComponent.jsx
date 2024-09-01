import { Dropdown } from 'primereact/dropdown';

const DropdownComponent = ({selectedCity, cities, optionLabel, placeholder, className}) => {
  
  const selectValue=(value)=>{
    console.log("Data",value)
  }

  return (
    <div>
        <Dropdown 
            value={selectedCity} 
            onChange={(e) => selectValue(e.value)} 
            options={cities} 
            optionLabel={optionLabel}
            placeholder={placeholder}
            className={className}
         />
    </div>
  )
}

export default DropdownComponent;