import { IBuyer } from "../../types";

export class CustomerModel {
    private payment: IBuyer["payment"];
    private email: string;
    private phone: string;
    private address: string;


    constructor() {
        this.payment = "card";
        this.email = "";
        this.phone = "";
        this.address = "";
    }


    /**
       * Устанавливает данные покупателя. Можно передавать только поля, которые нужно изменить.
       * @param data - объект Partial<IBuyer> с полями для изменения
       */
    setData(data: Partial<IBuyer>): void {
        this.payment = data.payment ?? this.payment;
        this.email = data.email ?? this.email;
        this.phone = data.phone ?? this.phone;
        this.address = data.address ?? this.address;
    }


    /**
      * Возвращает все данные покупателя в виде объекта.
      *
      * @returns Объект с текущими значениями полей (может содержать null)
      */

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }
    /**
       * Очищает данные покупателя, сбрасывая их к значениям по умолчанию
       */
    clear(): void {
        this.payment = "card";
        this.email = "";
        this.phone = "";
        this.address = "";
    }

    /**
     * Проверяет валидность каждого поля покупателя
     * @returns объект с флагами валидности каждого поля
     */
    validate(): {
        payment?: string;
        email?: string;
        phone?: string;
        address?: string;
    } {
        const errors: {
            payment?: string;
            email?: string;
            phone?: string;
            address?: string;
        } = {};

        if (!this.payment || this.payment.trim().length === 0) {
            errors.payment = 'Способ оплаты не указан';
        }

        if (!this.email) {
            errors.email = 'Email не указан';
        } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
            errors.email = 'Некорректный формат email';
        }

        if (!this.phone) {
            errors.phone = 'Номер телефона не указан';
        } else if (this.phone.length < 10) {
            errors.phone = 'Номер телефона должен содержать не менее 10 символов';
        }


        if (!this.address) {
            errors.address = 'Адрес не указан';
        } else if (this.address.length <= 5) {
            errors.address = 'Адрес должен содержать более 5 символов';
        }

        return errors;
    }
        /**
         * Проверяет общую валидность данных покупателя
         * @returns true, если все поля валидны
         */
        isValid(): boolean {
            const errors = this.validate();
            return Object.keys(errors).length === 0;
        }
    }
