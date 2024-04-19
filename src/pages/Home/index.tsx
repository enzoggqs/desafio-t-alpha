import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, ModalBody, ModalCloseButton, ModalHeader, Text, Tooltip } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BiNews, BiSolidEdit, BiUserCircle } from 'react-icons/bi';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import CustomBox from '../../components/CustomBox';
import CustomInput from '../../components/CustomInput';
import CustomModal from '../../components/CustomModal';
import ProductAPI from '../../services/ProductAPI';

interface IProduct {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

const Home = () => {
  const initialRef = useRef();
  const finalRef = useRef();
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [currentEditProduct, setCurrentEditProduct] = React.useState<number>();
  const [products, setProducts] = useState<IProduct[]>([])
  const [initialValuesEdit, setInitialValuesEdit] = React.useState<IProduct>(
    {
      name: '',
      description: '',
      price: 0,
      stock: 0
    }
  )

  const { getAllProducts, createProduct, updateProduct } = ProductAPI();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('@talphaToken') === null){
      navigate("/login")
    } else {
      const fetchProducts = async () => {
        try {
          const productsData = await getAllProducts();
  
          setProducts(productsData.data);
        } catch (error: any) {
          console.error('Failed to fetch products:', error.message);
        }
      };
  
      fetchProducts();
    }

  }, []);

  const handleOpenEditModal = (product: IProduct) => {
    setCurrentEditProduct(product.id);
    setInitialValuesEdit({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    })
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  async function addProduct(data: IProduct) {
    try {
      await createProduct(data);
      navigate(0);
    } catch (error: any) {
      console.error('Failed to create product:', error.message);
    }
  };

  async function editProduct(data: IProduct) {
    console.log(currentEditProduct, data)
    if(typeof(currentEditProduct) == 'number'){
      try {
        await updateProduct(data, currentEditProduct);
        navigate(0);
      } catch (error: any) {
        console.error('Failed to create product:', error.message);
      }
    }
  };

  const initialValuesAdd = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("O campo nome é obrigatório."),
    price: Yup.number()
      .required("O campo preço é obrigatório."),
    stock: Yup.number()
      .required("O campo estoque é obrigatório."),
  });

  return (
    <Flex
      backgroundColor="#F0F1F3"
      width="36%"
      pt={"2rem"}
      borderRadius="30px"
      flexDirection="column"
      alignItems="center"
      boxShadow="dark-lg"
    >
      <Flex
        justifyContent="space-between"
        w="80%"
      >
        <GoArrowLeft
          onClick={() => navigate(-1)}
          cursor={"pointer"}
          size={40}
          color='#088395'
        />
        <Text
          fontSize="2xl"
          color="primary.500"
          fontWeight="semibold"
          pb=".5rem"
        >
          Produtos
        </Text>
        <Box width="40px" height="40px"></Box>
      </Flex>
      <Flex
        height="50%"
        width="80%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        mt="1rem"
        overflowY="auto"
        maxH="300px"
        minH="100px"
        marginBottom="2rem"
        borderRadius="1rem"
        px="1rem"
        py="1rem"
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
        {products.map((product, index) => (
          <CustomBox
            key={index}
            text={product.name}
            rightImage={
              <BiSolidEdit
                size={40}
                color='#088395'
                cursor={"pointer"}
                onClick={() => handleOpenEditModal(product)}
              />
            }
          />
        ))}
      </Flex>
      <Button
        h="3rem"
        w="70%"
        borderRadius="30px"
        borderColor="#E0E0E0"
        borderWidth=".2rem"
        color="#F0F1F3"
        variant="solid"
        backgroundColor="primary.500"
        transition="background-color 0.3s, color 0.3s"
        // _hover={{
        //   backgroundColor: "primary.500",
        //   color: "#F0F1F3",
        // }}
        mb="2rem"
        fontSize="md"
        onClick={handleOpenAddModal}
      >
        Adicionar Produto
      </Button>
      {/* Modal de Edição */}
      <CustomModal
        isOpen={isOpenEditModal}
        onClose={handleCloseEditModal}
        initialRef={initialRef}
        finalRef={finalRef}
      >
        <ModalHeader>
          <Text
            fontSize="2xl"
            color="primary.500"
            fontWeight="semibold"
            pb=".5rem"
          >
            Editar Produto
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValuesEdit}
            validationSchema={validationSchema}
            onSubmit={(values) => editProduct(values)}
          >
            {({ handleSubmit, errors, touched, isValid, dirty }) => (
              <Flex
                as={Form}
                width="100%"
                flexDirection="column"
                alignItems="center"
              >
                <Flex
                  height="50%"
                  width="70%"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  mt="1rem"
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
                    placeholder="Digite o nome do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Descrição"
                    icon={<BiNews color='gray.500' className='custom-icon' />}
                    name="description"
                    type="text"
                    placeholder="Digite a descrição do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Preço"
                    icon={<CalendarIcon className='custom-icon' color='gray.500' />}
                    name="price"
                    type="number"
                    placeholder="Digite o preço do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Estoque"
                    icon={<CalendarIcon className='custom-icon' color='gray.500' />}
                    name="stock"
                    type="number"
                    placeholder="Digite o número em estoque do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
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
                  mb="1rem"
                  fontSize="2xl"
                >
                  <Tooltip
                    label="Você precisa alterar alguma informação"
                    placement="top"
                    hasArrow
                    isOpen={dirty ? false : undefined} // Oculta o tooltip se o botão estiver "dirty"
                  >
                    Salvar
                  </Tooltip>
                </Button>
              </Flex>
            )}
          </Formik>
        </ModalBody>
      </CustomModal>
      {/* Modal de Adição */}
      <CustomModal
        isOpen={isOpenAddModal}
        onClose={handleCloseAddModal}
        initialRef={initialRef}
        finalRef={finalRef}
      >
        <ModalHeader>
          <Text
            fontSize="2xl"
            color="primary.500"
            fontWeight="semibold"
            pb=".5rem"
          >
            Adicionar Produto
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValuesAdd}
            validationSchema={validationSchema}
            onSubmit={(values) => addProduct(values)}
          >
            {({ handleSubmit, errors, touched, isValid, dirty }) => (
              <Flex
                as={Form}
                width="100%"
                flexDirection="column"
                alignItems="center"
              >
                <Flex
                  height="50%"
                  width="70%"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  mt="1rem"
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
                    placeholder="Digite o nome do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Descrição"
                    icon={<BiNews color='gray.500' className='custom-icon' />}
                    name="description"
                    type="text"
                    placeholder="Digite a descrição do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Preço"
                    icon={<CalendarIcon className='custom-icon' color='gray.500' />}
                    name="price"
                    type="number"
                    placeholder="Digite o preço do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
                    touched={touched}
                    errors={errors}
                  />

                  <CustomInput
                    label="Estoque"
                    icon={<CalendarIcon className='custom-icon' color='gray.500' />}
                    name="stock"
                    type="number"
                    placeholder="Digite o número em estoque do produto"
                    height={'54px'}
                    borderWidth=".2rem"
                    borderRadius="30px"
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
                  // _hover={(isValid && dirty) ? {
                  //   backgroundColor: "primary.500",
                  //   color: "#F0F1F3",
                  // } : ''}
                  mb="1rem"
                  fontSize="2xl"
                >
                  <Tooltip
                    label="Você precisa alterar alguma informação"
                    placement="top"
                    hasArrow
                    isOpen={dirty ? false : undefined}
                  >
                    Criar
                  </Tooltip>
                </Button>
              </Flex>
            )}
          </Formik>
        </ModalBody>
      </CustomModal>
    </Flex>
  );
}

export default Home