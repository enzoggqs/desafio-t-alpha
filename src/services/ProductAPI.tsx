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
        try {
            const token = localStorage.getItem('@talphaToken');

            if (!token) {
                throw new Error('Authorization token not found');
            }
            
            const createProductUrl = 'https://interview.t-alpha.com.br/api/products/create-product';
    
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Especificar o tipo de conteúdo como JSON
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            };
    
            const response = await fetch(createProductUrl, requestOptions);
    
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

    const updateProduct = async (data: any, id: number) => {
        console.log(data)
        try {
            const token = localStorage.getItem('@talphaToken');

            if (!token) {
                throw new Error('Authorization token not found');
            }
            
            const createProductUrl = `https://interview.t-alpha.com.br/api/products/update-product/${id}`;
    
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // Especificar o tipo de conteúdo como JSON
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            };
    
            const response = await fetch(createProductUrl, requestOptions);
    
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

    return {getAllProducts, createProduct, updateProduct}
}

export default ProductAPI