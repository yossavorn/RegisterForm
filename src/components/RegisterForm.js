import useInput from "../hooks/use-input";
import { useSearchParams } from "react-router-dom";
import FormItem from "./FormItem";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isLine = (value) => {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (value.match(phoneno)) {
    return true;
  } else {
    return false;
  }
};

const BasicForm = (props) => {
  const [search, setSearch] = useSearchParams();
  const emailParam = search.get("email");
  const refParam = search.get("ref");
  const fnameParam = search.get("fname");
  const lnameParam = search.get("lname");
  const lineParam = search.get("line");

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty, fnameParam);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty, lnameParam);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail, emailParam);
  const {
    value: refValue,
    isValid: refIsValid,
    hasError: refHasError,
    valueChangeHandler: refChangeHandler,
    inputBlurHandler: refBlurHandler,
    reset: resetRef,
  } = useInput(isNotEmpty, refParam);

  const {
    value: lineValue,
    isValid: lineIsValid,
    hasError: lineHasError,
    valueChangeHandler: lineChangeHandler,
    inputBlurHandler: lineBlurHandler,
    reset: resetLine,
  } = useInput(isLine, lineParam);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    refIsValid &&
    lineIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const postData = {
      firstName: firstNameValue,
      lastname: lastNameValue,
      email: emailValue,
      phonenum: lineValue,
      reference: refValue,
    };
    console.log(JSON.stringify(postData));

    async function postReq(data, url) {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const postDataRes = await response.json();
      console.log(postDataRes);
    }

    if (!formIsValid) {
      return;
    }

    postReq(postData, "https://react-http-5eded-default-rtdb.firebaseio.com/");
    resetFirstName();
    resetLastName();
    resetEmail();
    resetRef();
    resetLine();
  };

  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const refClasses = refHasError ? "form-control invalid" : "form-control";
  const lineClasses = lineHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <FormItem
          formClass={firstNameClasses}
          label="First Name"
          value={firstNameValue}
          changeFn={firstNameChangeHandler}
          blurFn={firstNameBlurHandler}
          error={firstNameHasError}
        ></FormItem>
        <FormItem
          formClass={lastNameClasses}
          label="Last Name"
          value={lastNameValue}
          changeFn={lastNameChangeHandler}
          blurFn={lastNameBlurHandler}
          error={lastNameHasError}
        ></FormItem>
        <FormItem
          formClass={emailClasses}
          label="Email Address"
          value={emailValue}
          changeFn={emailChangeHandler}
          blurFn={emailBlurHandler}
          error={emailHasError}
        ></FormItem>
        <FormItem
          formClass={refClasses}
          label="Ref"
          value={refValue}
          changeFn={refChangeHandler}
          blurFn={refBlurHandler}
          error={refHasError}
        ></FormItem>
        <FormItem
          formClass={lineClasses}
          label="Phone number"
          value={lineValue}
          changeFn={lineChangeHandler}
          blurFn={lineBlurHandler}
          error={lineHasError}
        ></FormItem>
        
        
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Register</button>
      </div>
    </form>
  );
};

export default BasicForm;
