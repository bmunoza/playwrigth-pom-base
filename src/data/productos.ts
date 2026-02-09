export const Productos = {
    BACKPACK: 'sauce-labs-backpack',
    bikeLight: 'sauce-labs-bike-light',
    BOLT_TSHIRT: 'sauce-labs-bolt-t-shirt',
    fleeceJacket: 'sauce-labs-fleece-jacket',
    onesie: 'sauce-labs-onesie',
    redTShirt: 'sauce-labs-red-tee'
} as const;

export type Producto = typeof Productos[keyof typeof Productos];