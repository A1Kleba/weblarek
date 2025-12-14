import "./scss/styles.scss";
import { Cart } from "./components/Models.ts/Cart";
import { ProductCatalogModel } from "./components/Models.ts/ProductCatalog";
import { CustomerModel } from "./components/Models.ts/Customer";
import { apiProducts } from "./utils/data";

/*Тестирование методов модели данных корзины*/
const cartItem = new Cart();

cartItem.setItems(apiProducts.items);
console.log('Корзина:', cartItem.getItems());

const extraProduct = {
    id: 'new-item',
    title: 'Дополнительный товар',
    price: 5000,
    description: 'Новый товар',
    category: 'Другое',
    image: '/new.svg'
}
cartItem.addItem(extraProduct);
console.log('После добавления нового товара:', cartItem.getItems());

console.log(
    'Есть товар с ID 854cef69...?',
    cartItem.hasItem('854cef69-976d-4c2a-a18c-2aa45046c390')
);
console.log(
    'Есть товар с ID несуществующего?',
    cartItem.hasItem('non-existent-id')
);

console.log('Количество товаров в корзине:', cartItem.getCount());
console.log('Общая стоимость корзины:', cartItem.getTotalPrice());

const productToRemove = apiProducts.items[0];
cartItem.removeItem(productToRemove);
console.log('После удаления первого товара из API:', cartItem.getItems());
console.log('Новая общая стоимость:', cartItem.getTotalPrice());

cartItem.clear();
console.log('После очистки корзины:', cartItem.getItems());
console.log('Осталось товаров:', cartItem.getCount());
console.log('Итоговая стоимость:', cartItem.getTotalPrice());

/*Тестирование методов модели данных каталога товаров */
const productsModel = new ProductCatalogModel();

productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts());

const product = productsModel.getProductById('123');
console.log('Найден товар:', product);

productsModel.setSelectedProduct(product!);
console.log('Выбранный товар:', productsModel.getSelectedProduct());

console.log('Товар с несуществующим ID:', productsModel.getProductById('not-found'));

/*Тестирование методов модели данных покупателя*/
const customerItem = new CustomerModel();
customerItem.setData({
    email: 'ivan@example.com',
    phone: '+79991234567',
    address: 'г. Москва, ул. Ленина 51'
});
console.log('Данные клиента:', customerItem.getData());

const isValid = customerItem.isValid();
console.log('Данные валидны:', isValid);

if (!isValid) {
    console.log('Ошибки валидации:', customerItem.validate());
}

customerItem.clear();
console.log('После очистки:', customerItem.getData());