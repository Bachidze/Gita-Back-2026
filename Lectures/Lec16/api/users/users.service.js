const users = [
    {
        id: 1,
        name: "giorgi",
        age: 22
    },
    {
        id: 2,
        name: "luka",
        age: 33
    },
    {
        id: 3,
        name: "nika",
        age: 18
    }
]

const getUsers = (req, res) => {
    res.json({ message: "success", data: users })
}

const getUserById = (req, res) => {
    const { id } = req.params
    const user = users.find((el) => el.id === Number(id))

    if (!user) {
        return res.status(404).json({ message: "user not found", data: null })
    }

    res.json({ message: "success", data: user })
}

const createUser = (req, res) => {
    const { name, age } = req.body

    if (!name) {
        return res.status(400).json({ message: "name is required", data: null })
    }

    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId + 1,
        name,
        age
    }

    users.push(newUser)

    res.status(201).json({ message: "user created", data: newUser })
}

const deleteUser = (req, res) => {
    const { id } = req.params
    const index = users.findIndex((el) => el.id === Number(id))

    if (index === -1) {
        return res.status(404).json({ message: "user not found", data: null })
    }

    const deletedUser = users.splice(index, 1)[0]
    res.json({ message: "user deleted", data: deletedUser })
}

const updateUser = (req, res) => {
    const { id } = req.params
    const { name, age } = req.body
    const index = users.findIndex((el) => el.id === Number(id))

    if (index === -1) {
        return res.status(404).json({ message: "user not found", data: null })
    }

    users[index] = {
        ...users[index],
        name: name ?? users[index].name,
        age: age ?? users[index].age
    }

    res.json({ message: "user updated", data: users[index] })
}

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser }
