module.exports = (deviceCompanyModel) => ({
    add: (payload) => {
        const deviceCompany = new deviceCompanyModel({
            ...payload
        })
        return deviceCompany.save()
    },

    delete: (_id) => deviceCompanyModel.findOneAndDelete({_id}),

    update: (_id, payload) => deviceCompanyModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => deviceCompanyModel.findById(_id),

    getByTitle: (title) => deviceCompanyModel.findOne({title}),

    getAll: () =>
        deviceCompanyModel.find().sort('title')
})
