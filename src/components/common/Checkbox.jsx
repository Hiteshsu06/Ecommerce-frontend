import { Checkbox } from 'primereact/checkbox';

export const Checkbox = ({checked}) => {
  return (
      <Checkbox 
          onChange={e => setChecked(e.checked)} 
          checked={checked}>
      </Checkbox>
  )
}