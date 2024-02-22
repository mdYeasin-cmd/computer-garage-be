import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";

const addASaleInfoIntoDB = async (saleData: TSale) => {
    const result = await Sale.create(saleData);

    return result;
};

const getSalesHistoryFromDB = async () => {
    const result = await Sale.find();

    return result;
};

export const SaleServices = {
    addASaleInfoIntoDB,
    getSalesHistoryFromDB,
};
