import { Api } from '../base/Api';
import { IProduct, IOrder, IApiProductsResponse, IApiOrderResponse } from '../../types';

/**
 * Сервис для взаимодействия с API (слой коммуникации)
 * Использует композицию: делегирует HTTP‑запросы экземпляру Api.
 */
export class CommunicationService {
    private api: Api;

    /**
     * @param api - готовый экземпляр HTTP‑клиента
     */
    constructor(api: Api) {
        this.api = api;
    }

    /**
     * Получает список товаров из API
     * @returns Массив товаров IProduct[] (пустой при ошибке)
     */
    async getProductList(): Promise<IProduct[]> {
        try {
            // Выполняем GET‑запрос.
            const response: IApiProductsResponse = await this.api.get('/product/');

            return response.items ?? [];
        } catch (error) {
            console.error('[CommunicationService] Ошибка загрузки товаров:', error);
            return [];
        }
    }

    /**
     * Отправляет заказ на сервер
     * @param order - данные заказа
     */
    async sendOrder(order: IOrder): Promise<IApiOrderResponse> {
        try {
            return await this.api.post<IApiOrderResponse>('/order/', order);
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            return { total: 0 };
        }
    }
}