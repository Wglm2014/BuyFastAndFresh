module.exports = function (sequelize, DataTypes) {
    const Farmer = sequelize.define("Farmer", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail()
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataType.STRING,
            allowNull: true
        },
        city: {
            type: DataType.STRING,
            allowNull: true
        },
        zip: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                len: [5, 10],
                is: /(^\d{5}$)|(^\d{5}-\d{4}$)/
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [10, 13],
                is: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account_status: {
            type: DataTypes.BOOLEAN,
            default: 1
        },
        open_close: {
            type: DataTypes.BOOLEAN,
            default: 1
        }

    });
    Farmer.associate = function (models) {
        Farmer.belongsTo = (models.Market, {
            foreignKey: { allowNull: false }
        })
    }
    Farmer.associate = function (models) {
        Farmer.hasMany = (models.Product, {
            onDelete: "cascade"
        });
    }
    Farmer.associate = function (models) {
        Farmer.hasMany = (models.FarmerPayment, {
            onDelete: "cascade"
        });

    }

    return Farmer;
}