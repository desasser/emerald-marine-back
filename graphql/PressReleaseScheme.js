const {PressReleaseTC} = require('../models/PressRelease');
require('../mutation/PressRelease.mutation');

const PressReleaseQuery = {
    PressReleaseById: PressReleaseTC.getResolver('findById'),
    PressReleaseByIds: PressReleaseTC.getResolver('findByIds'),
    PressReleaseOne: PressReleaseTC.getResolver('findOne'),
    PressReleaseMany: PressReleaseTC.getResolver('findMany'),
    PressReleaseCount: PressReleaseTC.getResolver('count'),
    PressReleaseConnection: PressReleaseTC.getResolver('connection'),
    PressReleaseConnection: PressReleaseTC.getResolver('pagination'),
}

const PressReleaseMutation = {
    PressReleaseCreateOne: PressReleaseTC.getResolver('createOne'),
    PressReleaseCreateMany: PressReleaseTC.getResolver('createMany'),
    PressReleaseUpdateById: PressReleaseTC.getResolver('updateById'),
    PressReleaseUpdateOne: PressReleaseTC.getResolver('updateOne'),
    PressReleaseUpdateMany: PressReleaseTC.getResolver('updateMany'),
    PressReleaseRemoveById: PressReleaseTC.getResolver('removeById'),
    PressReleaseRemoveOne: PressReleaseTC.getResolver('removeOne'),
    PressReleaseRemoveMany: PressReleaseTC.getResolver('removeOne'),
    fakeData: PressReleaseTC.getResolver('PressRelease')
};

module.exports = {PressReleaseQuery, PressReleaseMutation}