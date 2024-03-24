import { forwardRef } from 'react';
import style from './Input.module.css'


const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} className={style.input} {...props}/>
  );
});

export default Input;