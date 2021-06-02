module.exports = (userModel) => ({
    add: (payload) => {
        const user = new userModel({
            ...payload
        })
        return user.save()
    },

    delete: (_id) => userModel.findOneAndDelete({_id}),

    update: (_id, payload) => userModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => userModel.findById(_id),

    getAllByCenterId: (center_id) => userModel.find({center_id: center_id}),

    getAll: (skip = 0, limit = 10, sort = 'name', name = '') =>
        userModel.find({fullname: {$regex: new RegExp(name), $options: 'i'}}).skip(skip).limit(limit).sort(sort)
})
