import React from "react";


const FormItem = (props) => {



    return (
        <div className={props.formClass}>
          <label>{props.label}</label>
          <input
            type="text"
            value={props.value}
            onChange={props.changeFn}
            onBlur={props.blurFn}
          />
          {props.error && (
            <p className="error-text">Please enter a valid value.</p>
          )}
        </div>


    )
}

export default FormItem