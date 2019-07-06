module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define("Order", {
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5],
                isIn: {
                    args: [/(^\d{5}$)|(^\d{5}-\d{4}$)/]
                }
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        credit_card: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expiration_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        scv: {
            type: DataTypes.STRING,
            allowNull: true
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        tax: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            default: 0.0625
        },
        fee: {
            type: DataTypes,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isIn: ["order", "ready", "pick"] }
        },
        date_order: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: new Date(),
            validate: { isDate() }
        }

    });

    Order.associate = function (models) {
        Order.hasMany(models.OrderDetail, {
            onDelete: "cascade"
        });
    }

    Order.associate = function (models) {
        Order.belongsTo(models.customer, {
            foreingKey: {
                allowNull: false
            }
        });
    }

    Order.associate = function (models) {
        Order.belongsTo(models.shopper, {
            foreingKey: {
                allowNull: false
            }
        });
    }
    return Order;
}