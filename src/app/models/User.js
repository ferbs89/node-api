module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo nome obrigatório."
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo e-mail obrigatório."
                },

                isEmail: {
                    msg: "Campo e-mail inválido.",
                }
            },
            unique: {
                msg: "O e-mail informado já existe.",
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo senha obrigatório."
                }
            }
        }
    });

    return User;
};
