import api from '../../shared/api.service.js';

const getAllProducts = () => {
    return api.get('/products');
};

const getAllSuppliers = () => {
    return api.get('/suppliers');
};

const getAllPurchases = () => {
    return api.get('/purchases');
};

const getAllPurchaseDetails = () => {
    return api.get('/purchases-details');
};

const getAllClients = () => {
    return api.get('/clients');
};

const getAllOrders = () => {
    return api.get('/orders');
};

const getAllCategories = () => {
    return api.get('/categories');
};

const getAllSales = () => {
    return api.get('/sales');
}

const getProductById = (productId) => {
    return api.get(`/products/${productId}`);
};

const getOrdersByProductsId = (productId) => {
    return api.get(`/orders?productId=${productId}`);
};

const getProductsByCategoryId = (supplierId) => {
    return api.get(`/products?supplierId=${supplierId}`);
}

const registerUser = (user) => {
    return api.post('/users', user);
};

const loginUser = async (user) => {
    const users = await api.get('/users');
    return users.data.find(u => u.email === user.email && u.password === user.password);
};
//Products
const deleteProduct = (productId) => {
    return api.delete(`/products/${productId}`);
};

const updateProduct = (productId, product) => {
    return api.put(`/products/${productId}`, product);
};

const addProduct = (productData) => {
    return api.post('/products', productData);
};
//Suppliers
const deleteSupplier = (supplierId) => {
    return api.delete(`/suppliers/${supplierId}`);
};

const updateSupplier = (supplierId, supplier) => {
    return api.put(`/suppliers/${supplierId}`, supplier);
};

const addSupplier = (supplierData) => {
    return api.post('/suppliers', supplierData);
};
//Orders
const deleteOrder = (orderId) => {
    return api.delete(`/orders/${orderId}`);
};

const updateOrder = (orderId, order) => {
    return api.put(`/orders/${orderId}`, order);
};

const addOrder = (orderData) => {
    return api.post('/orders', orderData);
};
//Catergories
const deleteCategory = (categoryId) => {
    return api.delete(`/categories/${categoryId}`);
};

const updateCategory = (categoryId, category) => {
    return api.put(`/categories/${categoryId}`, category);
};

const addCategory = (categoryData) => {
    return api.post('/categories', categoryData);
};
export default {
    getAllProducts,
    getAllSuppliers,
    getAllPurchases,
    getAllPurchaseDetails,
    getAllOrders,
    getAllSales,
    getAllClients,
    getAllCategories,
    getProductById,
    getOrdersByProductsId,
    registerUser,
    loginUser,
    deleteProduct,
    updateProduct,
    addProduct,
    deleteSupplier,
    updateSupplier,
    addSupplier,
    deleteOrder,
    updateOrder,
    addOrder,
    deleteCategory,
    updateCategory,
    addCategory
}