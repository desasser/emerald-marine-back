const {ProductTestTC} = require('../models/ProductTest');
require('../mutation/ProductTest.mutation');

const ProductTestQuery = {
    ProductTestById: ProductTestTC.getResolver('findById'),
    ProductTestByIds: ProductTestTC.getResolver('findByIds'),
    ProductTestOne: ProductTestTC.getResolver('findOne'),
    ProductTestMany: ProductTestTC.getResolver('findMany'),
    ProductTestCount: ProductTestTC.getResolver('count'),
    ProductTestConnection: ProductTestTC.getResolver('connection'),
    ProductTestConnection: ProductTestTC.getResolver('pagination'),
}

const ProductTestMutation = {
    ProductTestCreateOne: ProductTestTC.getResolver('createOne'),
    ProductTestCreateMany: ProductTestTC.getResolver('createMany'),
    ProductTestUpdateById: ProductTestTC.getResolver('updateById'),
    ProductTestUpdateOne: ProductTestTC.getResolver('updateOne'),
    ProductTestUpdateMany: ProductTestTC.getResolver('updateMany'),
    ProductTestRemoveById: ProductTestTC.getResolver('removeById'),
    ProductTestRemoveOne: ProductTestTC.getResolver('removeOne'),
    ProductTestRemoveMany: ProductTestTC.getResolver('removeOne'),
    fakeData: ProductTestTC.getResolver('ProductTest')
};

module.exports = {ProductTestQuery, ProductTestMutation}