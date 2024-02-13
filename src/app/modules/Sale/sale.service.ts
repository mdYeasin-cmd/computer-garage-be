import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";

const addASaleInfoIntoDB = (saleData: TSale) => {
    const result = Sale.create(saleData);

    return result;
};

const getSalesHistoryFromDB = (query: Record<string, unknown>) => {
    const result = Sale.find(query);

    return result;
};

export const SaleServices = {
    addASaleInfoIntoDB,
    getSalesHistoryFromDB,
};
