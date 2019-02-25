module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Invalid e-mail format!",
                }
            },
            unique: {
                msg: "E-mail already exists!",
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return User;
};
