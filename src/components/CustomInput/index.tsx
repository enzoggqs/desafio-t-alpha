import React from 'react'
import {
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik';
import "./customInput.css";

interface CustomInputProps {
  name?: string;
  icon: React.ReactNode;
  label: string;
  type: string;
  show?: boolean;
  handleClick?: () => void;
  touched: FormikTouched<{ [x: string]: string }>;
  errors: FormikErrors<{ [x: string]: string }>;
  placeholder: string;
  height: string;
  borderWidth: string;
  borderRadius: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ icon, label, type, show, handleClick, touched, errors, ...props }) => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps<any>) => (
        <FormControl
          isInvalid={!!form.errors[field.name] && !!form.touched[field.name]}
          pb="4"
        >
          <FormLabel
            fontSize="xl"
            color="primary.500"
            mt=".5rem"
            fontWeight="medium"
          >
            {label}
          </FormLabel>
          <InputGroup>
            <InputLeftElement ml=".5rem" h="full" pointerEvents="none">
              {icon}
            </InputLeftElement>
            <Input
              borderColor="primary.500"
              autoComplete='on'
              {...field}
              {...props}
              type={type === "password" ? (show ? "text" : "password") : type}
              max={type === 'date' ? today : undefined} // Handle non-date types gracefully
            />
            {type === "password" && (
              <InputRightElement h="full" width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>
            {form.errors[field.name] as string || ''}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default CustomInput