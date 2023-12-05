const UsersModel = require("../models/Users");
const bcrypt = require('bcryptjs');


const usersController = {

    create: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(req.body.author_pwd, salt);

            const user = {
                author_name: req.body.author_name,
                author_email: req.body.author_email,
                author_user: req.body.author_email,
                author_pwd: passwordHash,
                author_level: req.body.author_level,
                author_status: req.body.author_status
            };

            const response = await UsersModel.create(user);

            response.author_pwd = undefined;

            res.status(201).json({ response, msg: "Usuário criado com sucesso." });
        } catch (error) {
            res.status(500).json({ msg: error.message });
            console.log({ error: error });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await UsersModel.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UsersModel.findById(id);

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
            console.log({ error: error });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UsersModel.findById(id);

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
            }

            const userDeleted = await UsersModel.findByIdAndDelete(id);

            res.status(201).json({ userDeleted, msg: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ msg: error.message });
            console.log({ error: error });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            const user = {
                author_name: req.body.name,
                author_email: req.body.email,
                author_user: req.body.user,
                author_pwd: req.body.pwd,
                author_level: req.body.level,
                author_status: req.body.status
            };

            const updatedUser = await UsersModel.findByIdAndUpdate(id, user);

            if (!updatedUser) {
                res.status(404).json({ msg: "Usuário não encontrado." })
            }

            res.status(201).json({ updatedUser, msg: "Usuário atualizado com sucesso." });
        } catch (error) {
            res.status(500).json({ msg: error.message });
            console.log({ error: error });
        }
    }


};

module.exports = usersController;
