module.exports = function (sequelize, DataTypes) {
    const OrderDetail = sequelize.define("OrderDetail", {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_packt: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: 0
        }

    });

    OrderDetail.associate = function (models) {
        OrderDetail.belongsTo(models.Order, {
            foreignKey: {
                allowNull: false
            }
        });

        OrderDetail.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
    }



    return OrderDetail;
}