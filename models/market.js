module.exports = function (sequelize, DataType) {
    const Market = sequelize.define("Market", {
        brand: {
            type: DataType.STRING,
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
        state: {
            type: DataType.STRING,
            allowNull: true
        },
        zip: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                len: [5],
                is: /(^\d{5}$)|(^\d{5}-\d{4}$)/

            }
        },
        date: {
            type: DATEONLY,
            allowNull: true,
            default: new Date(),
            validate: { isDate() }
        },
        time_open: {
            type: DataType.DATE,
            allowNull: true,
            default: new Date()
        },
        time_close: {
            type: DataType.DATE,
            allowNull: true,
            default: new Date()
        }

    });

    Market.associate = function (models) {
        Market.hasMany(models.Farmer, {
            onDelete: "cascade"
        })
    }

    /*Market.associate = function (models) {
        Market.hasMany(models.Order, {
            onDelete: "cascade"
        })
    }*/

    return Market;
}