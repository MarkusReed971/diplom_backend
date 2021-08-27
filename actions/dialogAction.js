module.exports = (dialogModel) => ({
    add: (payload) => {
        const dialog = new dialogModel({
            ...payload
        })
        return dialog.save()
    },

    delete: (_id) => dialogModel.findOneAndDelete({_id}),

    update: (_id, payload) => dialogModel.findOneAndUpdate({_id}, payload),

    getById: (_id) => dialogModel.findById(_id),

    isExist: (user_id, user_to) => dialogModel.findOne({user_id, user_to}).then(res => !!res),

    getAllByUserId: (user_id) => dialogModel.find({user_id: user_id}),

    getAll: (skip = 0, limit = 10) =>
        dialogModel.find().skip(skip).limit(limit).sort('last_message')
})
