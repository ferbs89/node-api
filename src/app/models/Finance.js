const moment = require('moment').tz.setDefault('America/Sao_Paulo');

module.exports = (sequelize, DataTypes) => {
	const Finance = sequelize.define("Finance", {
		date: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: {
					msg: "Campo data obrigatório."
				}
			},
			get: function() {
				return moment.utc(this.getDataValue('date')).format('DD/MM/YYYY');
			}
		},

		description: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: "Campo descrição obrigatório."
				}
			}
		},

		type: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: "Campo tipo obrigatório."
				}
			}
		},

		value: {
			type: DataTypes.DECIMAL(10, 2),
			validate: {
				notEmpty: {
					msg: "Campo valor obrigatório."
				}
			}
		},
	});

	Finance.associate = function(models) {
		Finance.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	};

	return Finance;
};
