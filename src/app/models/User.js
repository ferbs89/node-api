module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Campo nome obrigatório."
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Campo e-mail obrigatório."
                },

                isEmail: {
                    msg: "Campo e-mail inválido.",
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Campo senha obrigatório."
                }
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Wishlist, { foreignKey: 'user_id', as: 'wishlists' });
        User.hasMany(models.Finance, { foreignKey: 'user_id', as: 'finances' });
    };

    return User;
};
