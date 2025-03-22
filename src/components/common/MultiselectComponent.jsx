import { MultiSelect } from 'primereact/multiselect';

const MultiselectComponent = ({value, options, onChange, name, display, optionLabel, placeholder, maxSelectedLabels, className}) => {
 console.log("data",options)
  return (
    <div>
        <MultiSelect 
            value={value} 
            onChange={onChange} 
            name={name}
            options={options} 
            optionLabel={optionLabel} 
            placeholder={placeholder} 
            maxSelectedLabels={maxSelectedLabels} 
            className={className}
            display={display}  
        />
    </div>
  )
}

export default MultiselectComponent;