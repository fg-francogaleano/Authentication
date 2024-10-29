import React, { useRef, useState, useContext } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { Formik } from "formik";
import axios from "axios";
import validations from "./validation";
import {
  Box,
  Grid2,
  Typography,
  Link,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { Context } from "../../Context/Context";

function Formlogin() {
  const navigate = useNavigate();
  const { login } = useContext(Context);

  const inputs = [
    { type: "email", label: "Email" },
    { type: "password", label: "Password" },
  ];

  const [shrinkLabel, setShrinkLabel] = useState(
    Array(inputs.length).fill(false)
  );
  const handleShrinkLabel = (index, value) => {
    const updatedShrinkLabel = [...shrinkLabel];
    updatedShrinkLabel[index] = value;
    setShrinkLabel(updatedShrinkLabel);
  };
  const [loading, setLoading] = useState(false);

  const refForm = useRef();

  const initialValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");

  const handleError = (error) => {
    console.log(error);

    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred, please try again");
    }
    setLoading(false);
  };

  const handlerSubmit = async (values) => {
    setShrinkLabel(Array(inputs.length).fill(false));
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/signin", values);
      const token = response.data;
      console.log(token);

      login(token);

      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 1000);
    } catch (error) {
      handleError(error);
      console.error(
        "an unexpected error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {/* VIDEO*/}
      <Box
        component="img"
        src="Espacio-tierra.jpg"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Link
        component={LinkRouter}
        to="/home"
        sx={{ textDecoration: "none", botton: "300px" }}
      >
        <i className="bi bi-arrow-left"></i>
      </Link>
      <Formik
        initialValues={initialValues}
        validate={(values) => validations(values)}
        onSubmit={(values, { resetForm }) => {
          handlerSubmit(values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            height="100vh"
            padding="10px"
          >
            <Grid2
              outline="solid 1px rgba(255, 255, 255, 0.5)"
              borderRadius="3px"
              width="350px"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                padding: "20px",
              }}
            >
              {/* TITLE */}
              <Grid2 display="flex" justifyContent="center">
                <Typography variant="h5" color="black">
                  Welcome
                </Typography>
              </Grid2>

              {/* FORM */}
              <Grid2 sx={{ padding: "25px" }} container>
                <Box
                  ref={refForm}
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {/* INPUT/LABEL */}
                  <Grid2
                    container
                    columnSpacing={0}
                    spacing={3}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    {inputs.map((input, index) => (
                      <Input
                        key={index}
                        index={index}
                        id={input.label.toLocaleLowerCase()}
                        type={input.type}
                        label={input.label}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        shrinkLabel={shrinkLabel[index]}
                        handleShrinkLabel={handleShrinkLabel}
                        touched={touched}
                        errors={errors}
                      />
                    ))}
                  </Grid2>
                  {/* FORGOT PASSWORD */}
                  <Grid2
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "5px",
                    }}
                  >
                    <Link
                      variant="caption"
                      component={LinkRouter}
                      to="/signup"
                      sx={{ textDecoration: "none" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid2>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {/* BUTTON SUBMIT */}
                  <Grid2 sx={{ padding: "10px 0px 10px 0px" }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      fullWidth
                      loading={loading}
                      margin="normal"
                      sx={{ borderRadius: "20px" }}
                    >
                      Sign in
                    </LoadingButton>
                  </Grid2>
                  {/* LINK SIGNUP */}
                  <Grid2 padding="5px 0 5px 0">
                    <Box component="span">Don't have an account?</Box>
                    <Link
                      variant="caption"
                      component={LinkRouter}
                      to="/signup"
                      sx={{ textDecoration: "none" }}
                    >
                      Sign up
                    </Link>
                  </Grid2>
                  {/* DIVIDER */}
                  <Grid2 color="black">
                    <Divider>or</Divider>
                  </Grid2>
                  {/* CONTINUE WITH GOOGLE*/}
                  <Grid2 padding="10px 0 10px 0">
                    <Button
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      Continue with Google
                    </Button>
                  </Grid2>
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        )}
      </Formik>
    </>
  );
}

export default Formlogin;
