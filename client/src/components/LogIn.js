import React, { useState}  from "react"
import { Formik, Form } from "formik"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useMutation } from 'react-apollo-hooks';
import { loginValidation } from "./validationSchemas"
import {LOG_IN_MUTATION} from "../gql/mutations"

function LogIn(props) {
  const [error, setError] = useState("");

  const logIn = useMutation(LOG_IN_MUTATION);

  return (
    <div className = "login-form">
    <div className="get-started">
    <br />
      <Formik
              initialValues = {{ email: "", password: ""}}
              onSubmit={async (values, {setSubmitting}) => {
                try {
                  setError("")
                 let result = await logIn({variables: {
                   email: values.email,
                   password: values.password
                  }})

                  if (result !== undefined) {props.history.push("/home")}
                  setSubmitting(false)
                  alert(JSON.stringify(values, null, 2))
                } catch (error) {
                   setError("Email or password is incorrect")
                }
              }}
              validationSchema = {
                loginValidation
              }
              >
              {
                props => {
                   const {
                     values,
                     touched,
                     errors,
                     handleChange,
                     handleBlur,
                     handleSubmit,

                   } = props;
                  return (
                       <Form className = "form" onSubmit={handleSubmit}>
                          <div className = "form-button-container" >
                          <Button
                            variant="contained"
                            color="primary"
                            className="login button"
                            type="submit"
                            margin = "normal"> Login </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            className="signup button"
                            type="submit"
                            margin = "normal"> Signup </Button>
                          </div>
                          <TextField
                          required
                          error={errors.email && touched.email}
                          id= "email"
                          label= {(errors.email && touched.email) ? errors.email : "Email"}
                          value = {values.email}
                          className = "login-email"
                          onChange={handleChange}
                          onBlur = {handleBlur}
                          type = "text"
                          margin="normal"
                          />
                          <TextField
                          required
                          error={errors.password && touched.password}
                          id = "password"
                          label = {errors.password && touched.password ? "Password is required!" : "Password"}
                          value = {values.password}
                          className = "login-password"
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          type = "password"
                          margin = "normal"
                          />
                          <p className = "password-check"> {error} </p>
                          <br/>
                          <Button
                          variant="contained"
                          color="primary"
                          className="submit button"
                          type="submit"
                          margin = "normal"
                          >
                            Submit
                          </Button>

                       </Form>
                    )
                }
              }
        </Formik>
    </div>
    </div>
  )
}

export default LogIn