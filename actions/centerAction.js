module.exports = (centerModel) => ({
    add: (payload) => {
        const center = new centerModel({
            ...payload
        })
        return center.save()
    },

    delete: (_id) => centerModel.findOneAndDelete({_id}),

    update: (_id, payload) => centerModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => centerModel.findById(_id),

    getByOwnerId: (ownerId) => centerModel.findOne({ownerId}),

    isExist: (inn) => centerModel.findOne({inn}).then(res => !!res),

    getAll: (skip = 0, limit = 8, sort = '-rating', center) => {
        const {name, city, deviceType, deviceCompany, status} = center
        const formatCenter = {
            name: {$regex: new RegExp(name), $options: 'i'},
            "address.city": {$regex: new RegExp(city), $options: 'i'}
        }
        if (deviceType._id) formatCenter.deviceTypes = deviceType._id
        if (deviceCompany._id) formatCenter.deviceCompanies = deviceCompany._id
        if (status) formatCenter.status = status

        return centerModel
            .find(formatCenter)
            .skip(skip)
            .limit(limit)
            .sort(sort)
    }

})

