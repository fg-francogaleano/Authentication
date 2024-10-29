import React, { useRef, useState, useContext } from "react";
import Input from "../Input/Input";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import validations from "../../utils/validation";
import { Box, Grid2, Typography, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Context } from "../../context/Context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function FormRegister() {
  const navigate = useNavigate();
  const { login } = useContext(Context);
  const inputs = [
    { type: "email", label: "Email", id: "email" },
    { type: "password", label: "Password", id: "password" },
    { type: "password", label: "Repeat password", id: "repeatPassword" },
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
    repeatPassword: "",
  };
  const handlerSubmit = async (values) => {
    setShrinkLabel(Array(inputs.length).fill(false));
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email: values.email,
        password: values.password,
      });
      // const token = response.data;

      // login(token);

      setLoading(true);

      MySwal.fire({
        title: `${response.data}`,
        text: "Login",
        icon: "success", // Icono de éxito
        // Texto del botón de confirmación
        timer: 1500, // Opcional: Cierra la alerta después de 2 segundos
        // Opcional: Muestra una barra de progreso
      });

      setTimeout(() => {
        setLoading(false);
        navigate("/signin");
      }, 1000);
    } catch (error) {
      console.error(
        "Error registering user:",
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
                  Register
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
                    spacing={1}
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    {inputs.map((input, index) => (
                      <Input
                        key={index}
                        index={index}
                        id={input.id}
                        type={input.type}
                        label={input.label}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        shrinkLabel={shrinkLabel[index]} // Pasamos shrinkLabel como booleano
                        handleShrinkLabel={handleShrinkLabel} // Pasamos la función para actualizar el estado
                        touched={touched}
                        errors={errors}
                      />
                    ))}
                    {/* BUTTON SUBMIT */}
                    <Grid2
                      sx={{
                        padding: "10px 0px 10px 0px",
                        margin: "10px 0 10px 0 ",
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        loading={loading}
                        margin="normal"
                        sx={{ borderRadius: "20px" }}
                      >
                        Sign Up
                      </LoadingButton>
                    </Grid2>
                  </Grid2>
                  {/* LINK SIGNUP */}
                  <Grid2 padding="5px 0 5px 0">
                    <Box component="span">Do you have an account?</Box>
                    <Link
                      variant="caption"
                      component={LinkRouter}
                      to="/signin"
                      sx={{ textDecoration: "none" }}
                    >
                      Sign In
                    </Link>
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

export default FormRegister;
