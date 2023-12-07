const UsersModel = require("../models/Users");
const authConfig = require("../config/auth.json")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {

    authenticate: async(req, res) => {
        const { email, pwd} = req.body;

        const user = await UsersModel.findOne({author_email: email}).select('+pwd');

        if(!user){
            return res.status(404).json({msg:"Usuário não encontrado."})
        };
        
        if(!await bcrypt.compare(pwd, user.author_pwd)){
            return res.status(404).json({msg:"Senha incorreta!"})
        };

        user.author_pwd = undefined;

        const token = jwt.sign({ id : user._id}, authConfig.secret, {
            expiresIn: 86400
        });

        if(user.author_status == 'Desativo'){
            return res.status(400).json({msg:"Usuário está desativado."})
        }

        return res.send({user, token});
    }
};

module.exports = authController;
