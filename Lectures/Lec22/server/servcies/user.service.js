



const findAll = async (req,res) => {
    const findAllUser = await usersModel.find()
    res.json({message:"გილოცავ შენ წარამტებით წამოიღე ყველა მონაცემი ბაზიდან !",data:findAllUser})
}


module.exports = findAll
