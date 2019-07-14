
module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define("Customer", {
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isEmail: true },
            index: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
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
                len: [10, 14],
                is: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
            }
        },
        telephone_other: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 14]
            }
        }
        ,
        account_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: 1
        },
    });

    Customer.associate = function (models) {
        Customer.hasMany(models.PaymentMethod, {
            onDelete: "cascade"
        });
        Customer.hasMany(models.Order, {
            onDelete: "cascade"
        });
    }

    return Customer;
}