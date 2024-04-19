
const ProductAPI = () => {
    const getAllProducts = async () => {
        try {
            const token = localStorage.getItem('@talphaToken');

            if (!token) {
                throw new Error('Authorization token not found');
            }

            const allProductsUrl = 'https://interview.t-alpha.com.br/api/products/get-all-products';
    
            const response = await fetch(allProductsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
            }
    
            const responseData = await response.json();
    
            return responseData;
        } catch (error: any) {
            console.error('Failed to fetch products:', error.message);
            throw error;
        }
    };
    
    const createProduct = async (data: any) => {
        console.log(data)
        try {
            const token = localStorage.getItem('@talphaToken');

            if (!token) {
                console.log('deu ruim')
                throw new Error('Authorization token not found');
            }
            
            const registerUrl = 'https://interview.t-alpha.com.br/api/products/create-product';
    
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const response = await fetch(registerUrl, requestOptions);
    
            if (!response.ok) {
                throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
            }
    
            const responseData = await response.json();
        
            return responseData;
        } catch (error: any) {
            console.error('Create product error:', error.message);
            throw error;
        }
      };

    return {getAllProducts, createProduct}
}

export default ProductAPI