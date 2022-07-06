export type productType = {
    _id?: string | undefined,
    name: string,
    price: number,
    desc: string,
    image: string,
    status: number,
    category: string,
    public_id: string
}
export type userType = {
    userName: string,
    email: string,
    password: string
}