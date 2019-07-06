module.exports = function (sequelize, DataTypes) {
    const ShopperPayment = sequelize.define("Shopper_Payment", {
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            default: new Date(),
            validate: { isDate() }
        },
        total_amount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            validate: { isDecimal() }
        }
    });

    ShopperPayment.associate = function (models) {
        ShopperPayment.belongsTo(models.Shopper, {
            foreignKey: { allowNull: false }
        });
    }
    return ShopperPayment;
}