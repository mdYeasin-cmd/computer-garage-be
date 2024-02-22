import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";

const addASaleInfoIntoDB = (saleData: TSale) => {
    const result = Sale.create(saleData);

    return result;
};

const getSalesHistoryFromDB = () => {
    const result = Sale.find().populate("productId");

    return result;
};

export const SaleServices = {
    addASaleInfoIntoDB,
    getSalesHistoryFromDB,
};
