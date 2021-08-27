module.exports = (requestModel) => ({
    add: (payload) => {
        const request = new requestModel({
            ...payload
        })
        return request.save()
    },

    delete: (_id) => requestModel.findOneAndDelete({_id}),

    update: (_id, payload) => requestModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => requestModel.findById(_id),

    getAllByUserId: (userId, skip = 0, limit = 10, sort = 'date') =>
        requestModel.find({userId}).skip(skip).limit(limit).sort(sort),

    getAllByCenterId: (centerId, skip = 0, limit = 10, sort = 'date') =>
        requestModel.find({centerId}).skip(skip).limit(limit).sort(sort),

    getAllByMasterId: (masterId, skip = 0, limit = 10, sort = 'date') =>
            requestModel.find({masterId}).skip(skip).limit(limit).sort(sort),

    getAll: () =>
        requestModel.find()
})
