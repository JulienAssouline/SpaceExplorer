import React, { useState}  from "react"
import { Formik, Form } from "formik"
import { signupValidation } from "./validationSchemas"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useMutation } from 'react-apollo-hooks';
import {SIGN_UP_MUTATION} from "../gql/mutations"
import LoginSignup from "./LoginSignup"



function SignUp(props) {
  const [error, setError] = useState("") ;

  const signUp = useMutation(SIGN_UP_MUTATION);

  return (
    <div id = "signup">
      <div className="get-started">
      <LoginSignup data = {props} />
        <Formik
            initialValues = {{ email: "", password: "", username: "", fullname: "", country: "", confirmpassword: '' }}
            onSubmit={async (values, {setSubmitting}) => {
              try {
                  let result = await signUp({variables: {
                    email: values.email,
                    fullname: values.fullname,
                    country: values.country,
                    username: values.username,
                    password: values.password
                  }})
                  if (result !== undefined) {props.history.push("/home")}
                  setSubmitting(false)
                  alert(JSON.stringify(values, null, 2))
                } catch(error) {
                  setError("Email is already taken")
                }
            }}
            validationSchema = {
              signupValidation
            }
            >
              {
                 propsFormik => {
                      const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,

                      } = propsFormik;

                      return (
                        <Form className = "form" onSubmit={handleSubmit}>
                          <h1 className = "signup-or-login"> Sign Up </h1>
                            <TextField
                              id= "username"
                              label= "User Name"
                              value = {values.username}
                              className= "signup-username"
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              type = "text"
                              margin="normal"
                              />

                            <TextField
                              id= "fullname"
                              label= "Full Name"
                              value = {values.fullname}
                              className = "signup-fullname"
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              type = "text"
                              margin="normal"
                              />
                            <TextField
                              id= "country"
                              label= "Country"
                              value = {values.country}
                              className = "signup-country"
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              type = "text"
                              margin="normal"
                              />
                            <TextField
                              required
                              error={errors.email && touched.email}
                              id= "email"
                              label= {(errors.email && touched.email) ? errors.email : "Email"}
                              value = {values.email}
                              className = "signup-email"
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              type = "text"
                              margin="normal"
                              />
                            <TextField
                              required
                              error={errors.password && touched.password}
                              className = "signup-password"
                              label= {(errors.password && touched.password) ? "Password is required!" : "Password"}
                              id = "password"
                              type="password"
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              value = {values.password}
                              margin="normal"
                            />
                            <TextField
                              required
                              error={errors.confirmpassword && touched.confirmpassword}
                              className = "signup-confirmpassword"
                              type="password"
                              label= {(errors.confirmpassword && touched.confirmpassword) ? "Confirm Password is required!" : "Confirm Password"}
                              value = {values.confirmpassword}
                              id = "confirmpassword"
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              margin="normal"
                            />
                              <label>{touched.confirmpassword && values.confirmpassword !== values.password && <div className="invalid-feedback">{"Passwords don't match!"}</div>}
                            </label>
                          <p className = "password-check"> {error} </p>
                          <br/>
                          <div className = "submit-button-container">
                            <Button
                              variant="contained"
                              color="primary"
                              className="submit button"
                              type="submit"
                              disabled={values.confirmpassword !== values.password || isSubmitting}> Submit
                              </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              type="button"
                              className="reset button"
                              onClick={handleReset}
                              disabled={!dirty}
                            >
                              Reset
                            </Button>
                            <p className="member-status"
                              onClick = {() => {props.history.push("/login")}}
                            > I'm already a member </p>
                          </div>

                        </Form>
                     )
                  }
                }
        </Formik>
      </div>
    </div>
  )
}

export default SignUp