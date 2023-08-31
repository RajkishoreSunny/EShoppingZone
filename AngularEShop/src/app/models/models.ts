
export interface SuggestedProduct{
    category: Category
}

export interface Product{
    productId: number;
    categoryId: number;
    image?: string;
    productName: string;
    productPrice: number;
    description: string;
    rating: number;
    specification: string;
    reviewId: number
}

export interface Category{
    categoryId: number;
    categoryName: string;
    categoryImg: string;
    subcategory: string;
    products: any[];
}

export interface CartItem{
    cartId: number,
    userId: number;
    totalPrice: number;
    productId: number;
    quantity: number;
}

export interface WishListItem{
    wishListId: number;
    userId: number;
    productId: number;
    totalPrice: number;
}

export interface Review{
    reviewId: number;
    productId: number;
    description: string;
    rating: number;
    image?: string;
}

export interface Order{
    orderId: number;
    userId: number;
    productId: number;
    quantity: number;
    totalPrice: number;
}

export interface Feedback{
    feedbackId: number;
    userId: number;
    description: number;
}

export interface UserDetails{
    userName: string;
    email: string;
    address: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: string;
    profileImg?: string;
    password: string;
}