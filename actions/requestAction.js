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

    getAllByUserId: (user_id, skip = 0, limit = 10, sort = 'date') =>
        requestModel.find({user_id: user_id}).skip(skip).limit(limit).sort(sort),

    getAllByCenterId: (center_id, skip = 0, limit = 10, sort = 'date') =>
        requestModel.find({center_id: center_id}).skip(skip).limit(limit).sort(sort),

    getAllByWorkerId: (worker_id, skip = 0, limit = 10, sort = 'date') =>
            requestModel.find({center_id: worker_id}).skip(skip).limit(limit).sort(sort),

    getAll: () =>
        requestModel.find()
})
