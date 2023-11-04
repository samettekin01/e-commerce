export type Product = {
    id: number
    category: string
    description?: string
    title: string
    image: string
    price: number
    rating?: {
        count?: number
        rate?: number
    } | any
    amount?: number,
    total?: number
}