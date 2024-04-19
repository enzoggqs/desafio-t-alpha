import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../services/useAuth';
import { Button, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import { Form, Formik, useFormik } from 'formik';
import { BiUserCircle, BiNews, BiPhone  } from "react-icons/bi";
import * as Yup from "yup";
import CustomInput from '../../components/CustomInput';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const validationSchema = Yup.object({
    mail: Yup.string()
      .email("E-mail inválido.")
      .required("O campo email é obrigatório."),
    password: Yup.string()
      .required("O campo senha é obrigatório."),
    name: Yup.string()
      .required("O campo nome é obrigatório."),
    taxNumber: Yup.string()
      .required("O campo taxNumber é obrigatório."),
    phone: Yup.string()
      .required("O campo data de nascimento é obrigatório."),
  });

  const initialValues =  {
    name: "",
    taxNumber: "",
    mail: "",
    phone: "",
    password: ""
  }

  const registerHandle = (values: any) => {
    register(
      values,
      navigate
    );
  };
  
  return (
    <Flex
      backgroundColor="primary.500"
      alignItems="center"
      justifyContent="center"
      h={"100vh"}
      w={"100vw"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          registerHandle(values);
        }}
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
              height="80%"
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
                mt="3rem"
                overflowY="auto"
                maxH="450px"
                marginBottom="2rem"
                px={2}
                sx={{
                  "&::-webkit-scrollbar": {
                    marginLeft: "1rem",
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#088395",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#0A4D68",
                  },
                }}
              >
                <CustomInput
                  label="Nome"
                  icon={<BiUserCircle className='custom-icon' />}
                  name="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  touched={touched}
                  errors={errors}
                />

                <CustomInput
                  label="taxNumber"
                  icon={<BiNews color='gray.500' className='custom-icon' />}
                  name="taxNumber"
                  type="text"
                  placeholder="Digite o taxNumber para cadastro"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  touched={touched}
                  errors={errors}
                />

                <CustomInput
                  label="E-mail"
                  icon={<EmailIcon color='gray.500' className='custom-icon' />}
                  name="mail"
                  type="email"
                  placeholder="Digite email para cadastro"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  touched={touched}
                  errors={errors}
                />

                <CustomInput
                  label="Telefone"
                  icon={<BiPhone color='gray.500' className='custom-icon' />}
                  name="phone"
                  type="text"
                  placeholder="Digite o telefone para cadastro"
                  height={'54px'}
                  borderWidth=".2rem"
                  borderRadius="30px"
                  touched={touched}
                  errors={errors}
                />

                <CustomInput
                  label="Senha"
                  icon={<LockIcon className='custom-icon' color='gray.500' />}
                  name="password"
                  type="password"
                  placeholder="Digite sua senha para cadastro"
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
                  Cadastrar
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}

export default Register