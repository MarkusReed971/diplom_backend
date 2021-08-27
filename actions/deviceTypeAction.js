module.exports = (deviceTypeModel) => ({
    add: (payload) => {
        const deviceType = new deviceTypeModel({
            ...payload
        })
        return deviceType.save()
    },

    delete: (_id) => deviceTypeModel.findOneAndDelete({_id}),

    update: (_id, payload) => deviceTypeModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => deviceTypeModel.findById(_id),

    getByTitle: (title) => deviceTypeModel.findOne({title}),

    getAll: () =>
        deviceTypeModel.find().sort('title')
})
