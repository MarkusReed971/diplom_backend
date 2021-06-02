module.exports = (workerModel) => ({
    add: (payload) => {
        const worker = new workerModel({
            ...payload
        })
        return worker.save()
    },

    delete: (_id) => workerModel.findOneAndDelete({_id}),

    update: (_id, payload) => workerModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => workerModel.findById(_id),

    getAllByUserId: (user_id) => workerModel.findOne({user_id: user_id}),

    getAllByCenterId: (center_id) => workerModel.findOne({center_id: center_id}),

    getAll: () => workerModel.find(),
})
