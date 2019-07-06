module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        price_per: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isUrl() }
        }
    });

    /*Product.associate = function (models) {
        Product.belongsTo(models.Market, {
            foreingKey: {
                allowNull: false
            }
        });
    }*/

    Product.associate = function (models) {
        Product.belongsTo(models.Farmer, {
            foreingKey: {
                allowNull: false
            }
        });
    }
    Product.associate = function (models) {
        Product.hasMany(models.OrderDetail, {
            onDelete: "cascade"
        });
    }
    return Products;
}