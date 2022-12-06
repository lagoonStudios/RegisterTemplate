import { StylesConfig } from 'react-select';
export const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    padding: '0.2rem 0rem',
    borderRadius: '0',
    borderColor: 'black',
    border: '0.5',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: 'black',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '0.9rem',
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '0.9rem',
    color: 'black',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
};

export const options = [
  { value: 'juguete', label: 'Instrumento Musical o Juguetes' },
  { value: 'ropa', label: 'Vestimenta' },
  { value: 'medicina', label: 'Insumos Medicos' },
  { value: 'alimentos', label: 'Alimentos No Perecederos' },  
  { value: 'otro', label: 'Otro' }
]

export const inputClass = (IsError: boolean) => (
  {"w-full border-b border-black": true, "border-red-600": IsError}
) 