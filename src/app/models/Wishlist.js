module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define("Wishlist", {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Campo nome obrigatório."
                }
            }
        },

        description: {
            type: DataTypes.STRING,
        },

        value: {
            type: DataTypes.DECIMAL(10, 2),
        },
    });

    Wishlist.associate = function(models) {
        Wishlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return Wishlist;
};
