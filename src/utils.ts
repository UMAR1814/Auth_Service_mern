export const calculateDiscount = (price: number, discount: number): number => {
    const discounted = price * (discount / 100);
    return discounted;
};
