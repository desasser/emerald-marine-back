const {MailingListTC} = require('../models/MailingList');
require('../mutation/MailingList.mutation');

const MailingListQuery = {
    MailingListById: MailingListTC.getResolver('findById'),
    MailingListByIds: MailingListTC.getResolver('findByIds'),
    MailingListOne: MailingListTC.getResolver('findOne'),
    MailingListMany: MailingListTC.getResolver('findMany'),
    MailingListCount: MailingListTC.getResolver('count'),
    MailingListConnection: MailingListTC.getResolver('connection'),
    MailingListConnection: MailingListTC.getResolver('pagination'),
}

const MailingListMutation = {
    MailingListCreateOne: MailingListTC.getResolver('createOne'),
    MailingListCreateMany: MailingListTC.getResolver('createMany'),
    MailingListUpdateById: MailingListTC.getResolver('updateById'),
    MailingListUpdateOne: MailingListTC.getResolver('updateOne'),
    MailingListUpdateMany: MailingListTC.getResolver('updateMany'),
    MailingListRemoveById: MailingListTC.getResolver('removeById'),
    MailingListRemoveOne: MailingListTC.getResolver('removeOne'),
    MailingListRemoveMany: MailingListTC.getResolver('removeOne'),
    fakeData: MailingListTC.getResolver('MailingList')
};

module.exports = {MailingListQuery, MailingListMutation}