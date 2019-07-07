module.exports = function (sequelize, DataTypes) {
    const Market = sequelize.define("Market", {
        brand: {
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
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5],
                is: /(^\d{5}$)|(^\d{5}-\d{4}$)/

            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: new Date(),
            validate: { isDate: true }
        },
        time_open: {
            type: DataTypes.DATE,
            allowNull: true,
            default: new Date()
        },
        time_close: {
            type: DataTypes.DATE,
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