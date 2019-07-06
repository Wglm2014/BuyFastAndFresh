module.exports = function (sequelize, DataTypes) {
    const Shopper = sequelize.define("Shopper", {
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
        first_name: {
            type: STRING,
            allowNull: true
        },
        last_name: {
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
                len: [10],
                is: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
            }
        },
        account_status: {
            type: DataTypes.BOOLEAN,
            default: 1
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    Shopper.associate = function (models) {
        Shopper.hasMany = (models.Orders, {
            onDelete: "cascade"
        });
    }
    Shopper.associate = function (models) {
        Shopper.hasMany = (models.ShopperPayment, {
            onDelete: "cascade"
        });
    }

    return Shopper;
}