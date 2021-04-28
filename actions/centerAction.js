module.exports = (centerModel) => ({
    add: (payload) => {
        const center = new centerModel({
            ...payload
        })
        return center.save()
    },

    delete: (_id) => centerModel.findOneAndDelete({_id}),

    update: (_id, payload) => centerModel.findOneAndUpdate({_id}, payload),

    get: (_id) => centerModel.findById(_id),

    getAll: (skip = 0, limit = 10, sort = 'name') => centerModel.find().skip(skip).limit(limit).sort(sort)
})
