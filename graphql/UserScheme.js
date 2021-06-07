const {UserTC} = require('../models/User');
require('../mutation/User.mutation');

const UserQuery = {
    UserById: UserTC.getResolver('findById'),
    UserByIds: UserTC.getResolver('findByIds'),
    UserOne: UserTC.getResolver('findOne'),
    UserMany: UserTC.getResolver('findMany'),
    UserCount: UserTC.getResolver('count'),
    UserConnection: UserTC.getResolver('connection'),
    UserConnection: UserTC.getResolver('pagination'),
}

const UserMutation = {
    UserCreateOne: UserTC.getResolver('createOne'),
    UserCreateMany: UserTC.getResolver('createMany'),
    UserUpdateById: UserTC.getResolver('updateById'),
    UserUpdateOne: UserTC.getResolver('updateOne'),
    UserUpdateMany: UserTC.getResolver('updateMany'),
    UserRemoveById: UserTC.getResolver('removeById'),
    UserRemoveOne: UserTC.getResolver('removeOne'),
    UserRemoveMany: UserTC.getResolver('removeOne'),
    fakeData: UserTC.getResolver('User')
};

module.exports = {UserQuery, UserMutation}