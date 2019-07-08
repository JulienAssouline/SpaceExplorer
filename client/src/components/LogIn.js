import React, { useState}  from "react"
import { Formik, Form } from "formik"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useMutation } from 'react-apollo-hooks';
import { loginValidation } from "./validationSchemas"
import {LOG_IN_MUTATION} from "../gql/mutations"
import NavBar from "./NavBar"

function LogIn(props) {
  const [error, setError] = useState("");

  const logIn = useMutation(LOG_IN_MUTATION);

  return (
    <div className = "login-form">
    <div className="get-started">
    <NavBar data = {props} />
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
                Formikprops => {
                   const {
                     values,
                     touched,
                     errors,
                     handleChange,
                     handleBlur,
                     handleSubmit,

                   } = Formikprops;
                  return (
                       <Form className = "form" onSubmit={handleSubmit}>
                          <h2 className = "signup-or-login"> Login </h2>
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
                          <div className = "submit-button-container">
                            <Button
                            variant="contained"
                            color="primary"
                            className="submit button"
                            type="submit"
                            margin = "normal"
                            >
                              Submit
                            </Button>
                            <p className="member-status"
                              onClick = {() => {props.history.push("/signup")}}
                            > I'm not a member </p>
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

export default LogIn