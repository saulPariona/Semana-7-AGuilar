export type Categoria = 'Clásicas' | 'Pollo' | 'Especiales' | 'Veggie'

export interface Burger {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: Categoria
  foto: string
}

export interface CartItem extends Burger {
  cantidad: number
}

export type ToastTipo = 'exito' | 'info' | 'error' | 'aviso'

export interface Toast {
  id: number
  mensaje: string
  tipo: ToastTipo
}
