module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Campo nome obrigatório."
                }
            }
        },
    });

    return Favorite;
};
