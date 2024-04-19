import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../services/useAuth';
import { Button, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import { Form, Formik, useFormik } from 'formik';
import { BiUserCircle, BiNews, BiPhone  } from "react-icons/bi";
import * as Yup from "yup";
import CustomInput from '../../components/CustomInput';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const Login = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("O campo senha é obrigatório."),
    taxNumber: Yup.string()
      .required("O campo taxNumber é obrigatório."),
  });

  const initialValues =  {
    taxNumber: "",
    password: ""
  }

  const loginHandle = (values: any) => {
    signIn(
      values,
      navigate
    );
  };
  
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => loginHandle(values)}
      >
        {({ handleSubmit, errors, touched, isValid, dirty }) => (
          <Flex
            backgroundColor="primary.500"
            alignItems="center"
            justifyContent="center"
            h={"100vh"}
            w={"100vw"}
          >
            <Flex
              as={Form}
              backgroundColor="#F0F1F3"
              width="36%"
              pt={"2rem"}
              borderRadius="30px"
              flexDirection="column"
              alignItems="center"
              boxShadow="dark-lg"
            >
              <Text
                fontSize="5xl"
                color="primary.700"
                fontWeight="semibold"
                pb=".5rem"
              >
                T-Alpha
              </Text>
              <Divider
                borderColor="primary.700"
                backgroundColor="primary.700"
                borderWidth=".2rem"
                w={"15%"}
              />
              <Flex
                height="50%"
                width="70%"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                pt="3rem"
              >
                <CustomInput
                  label="Tax Number"
                  icon={<BiNews color='gray.500' className='custom-icon' />}
                  name="taxNumber"
                  type="text"
                  placeholder="Digite o tax number para login"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  touched={touched}
                  errors={errors}
                />

                <CustomInput
                  label="Senha"
                  icon={<LockIcon color='gray.500' />}
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  show={show}
                  handleClick={handleClick}
                  touched={touched}
                  errors={errors}
                />
              </Flex>
              <Button
                type="submit"
                h="3rem"
                w="10rem"
                borderRadius="30px"
                borderColor="primary.500"
                borderWidth=".2rem"
                isDisabled={!isValid || !dirty}
                color="primary.500"
                variant="solid"
                marginTop="1rem"
                backgroundColor="transparent" 
                transition="background-color 0.3s, color 0.3s" 
                mb="2rem"
                fontSize="2xl"
              >
                Login
              </Button>
              <Text
                color="primary.500"
                mb="2rem"
              >
                Não tem uma conta? &nbsp;
                <Text
                  as='u'
                  fontWeight="bold"
                  color="primary.600"
                  onClick={() => navigate("/register")}
                  cursor="pointer"
                >
                  Cadastre-se
                </Text>
              </Text>
            </Flex>
          </Flex>
        )}
      </Formik>
    </>
  )
}

export default Login