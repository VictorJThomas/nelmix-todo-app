import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGuest, setLogin } from "../../redux/slices/authSlice";
import { LoginValidate, RegisterValidate } from "../../utils/validateForm";

type LoginType = {
  username: string;
  password: string;
};

type RegisterType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const initialValuesLogin: LoginType = {
    username: "",
    password: "",
  };

  const initialValuesRegister: RegisterType = {
    username: "",
    password: "",
  };

  const handleFormSubmit = async (
    values: LoginType | RegisterType,
    { resetForm }: FormikHelpers<LoginType | RegisterType>
  ) => {
    try {
      if (isLogin) {
        const loginResponse = await axios.post(
          "http://localhost:3000/api/auth/login",
          values
        );
        const loggedIn = loginResponse.data;
        resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        }
      } else if (isRegister) {
        const savedUserResponse = await axios.post(
          "http://localhost:3000/api/auth/register",
          values
        );
        const savedUser = savedUserResponse.data;
        resetForm();
        if (savedUser) {
          setPageType("login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createGuesteProfile = async () => {
    try {
      const apiKey = "95C61AD4-9A6B-F40B-FF32-D9A56D987D00";
      const apiRestKey = "9F288FA0-10EF-4CEA-81F7-D89B1803137A";

      const response = await axios.post(
        `https://api.backendless.com/${apiKey}/${apiRestKey}/users/register/guest`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "application-id": apiKey,
            "secret-key": apiRestKey,
          },
        }
      );
      console.log("Guest profile created:", response.data);
      dispatch(setGuest());
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "90vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
              {isRegister ? "Create Account" : "Log In"}
            </Typography>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={
                isLogin ? initialValuesLogin : initialValuesRegister
              }
              validationSchema={isLogin ? LoginValidate : RegisterValidate}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
              }: FormikProps<LoginType | RegisterType>) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    as={TextField}
                    label="Username"
                    margin="normal"
                    fullWidth
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={touched.username && errors.username}
                    sx={{ mt: 2, mb: 1.5 }}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    type="password"
                    margin="normal"
                    fullWidth
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ mt: 1.5, mb: 1.5 }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1.5, mb: 0.5 }}
                  >
                    {isLogin ? "LOGIN" : "REGISTER"}
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 0.5, mb: 3 }}
                    onClick={() => createGuesteProfile()}
                  >
                    JOIN AS GUEST
                  </Button>
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up here."
                      : "Already have an account? Login here."}
                  </Typography>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
