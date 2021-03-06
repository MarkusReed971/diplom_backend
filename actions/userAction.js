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

    getAllByCenterId: (centerId) => userModel.find({centerId}),

    getByAuth: (username, password) => userModel.findOne({username, password}),

    isExist: (phone, mail, username) => userModel.findOne({$or: [{mail}, {phone}, {username}]}).then(res => !!res),

    getAll: (skip = 0, limit = 10, sort = 'name', name = '') =>
        userModel.find({fullname: {$regex: new RegExp(name), $options: 'i'}}).skip(skip).limit(limit).sort(sort)
})
