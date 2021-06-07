const {ProductTC} = require('../models/Product');
require('../mutation/Product.mutation');

const ProductQuery = {
    ProductById: ProductTC.getResolver('findById'),
    ProductByIds: ProductTC.getResolver('findByIds'),
    ProductOne: ProductTC.getResolver('findOne'),
    ProductMany: ProductTC.getResolver('findMany'),
    ProductCount: ProductTC.getResolver('count'),
    ProductConnection: ProductTC.getResolver('connection'),
    ProductConnection: ProductTC.getResolver('pagination'),
}

const ProductMutation = {
    ProductCreateOne: ProductTC.getResolver('createOne'),
    ProductCreateMany: ProductTC.getResolver('createMany'),
    ProductUpdateById: ProductTC.getResolver('updateById'),
    ProductUpdateOne: ProductTC.getResolver('updateOne'),
    ProductUpdateMany: ProductTC.getResolver('updateMany'),
    ProductRemoveById: ProductTC.getResolver('removeById'),
    ProductRemoveOne: ProductTC.getResolver('removeOne'),
    ProductRemoveMany: ProductTC.getResolver('removeOne'),
    fakeData: ProductTC.getResolver('Product')
};

module.exports = {ProductQuery, ProductMutation}