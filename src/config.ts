export const NOMBRE_NEGOCIO = 'Burger Anibal'
export const DUENO = 'PARIONA RAMOS SAUL ANIBAL'
export const TELEFONO_WA = '51923791008'
export const TELEFONO_VISIBLE = '+51 923 791 008'

export const formatearPrecio = (n: number) => `S/ ${n.toFixed(2)}`

export const urlFoto = (id: string, ancho = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${ancho}&q=70`
