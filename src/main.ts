import "./scss/styles.scss";
import { Cart } from "../src/components/base/Models.ts/Cart";
import { ProductCatalogModel } from "../src/components/base/Models.ts/ProductCatalog";
import { CustomerModel } from "../src/components/base/Models.ts/Customer";
import { apiProducts } from "./utils/data";



const cartItem = new Cart();
cartItem.setItems(apiProducts.items);

console.log('Корзина: ', cartItem.getItems());


const productsModel = new ProductCatalogModel();
productsModel.setProducts(apiProducts.items);

console.log('Массив товаров из каталога: ', productsModel.getProducts());

const customerItem = new CustomerModel();
customerItem.setData({
    email: 'ivan@example.com',
    phone: '+79991234567',
    address: 'г. Москва, ул. Ленина 51'
});
console.log('Данные клиента:', customerItem.getData());