export interface Cart{
  id_address_delivery: string,
  id_address_invoice: string,
  id_currency: string,
  id_customer: string,
  id_guest: string,
  id_lang: string,
  id_shop_group: string,
  id_shop: string,
  id_carrier: string,
  recyclable: string,
  gift: string,
  gift_message: string,
  mobile_theme: string,
  delivery_option: string,
  secure_key: string,
  allow_seperated_package: string,
  date_add: string,
  date_upd: string,
  associations: CartRows[]
}

export interface CartRows{
      id_product: string,
      id_product_attribute: string,
      id_address_delivery: string,
      id_customization: string,
      quantity: string
}
