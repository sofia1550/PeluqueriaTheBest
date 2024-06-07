export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product extends BaseProduct {
  imageUrl?: string; // Opcional
  imageFileName?: string; // Opcional
}

export interface CartProduct extends BaseProduct {
  imageUrl: string; // Obligatorio en el carrito
}
export interface Disponibilidad {
  id: number;
  servicio_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  disponible: boolean;
  servicio_nombre: string;
  servicio_precio: number;
  title: string;
  start?: Date | string;
  end?: Date | string;
}

export type NewDisponibilidad = {
  servicio_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  disponible: boolean;
};


export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}
