module.exports = function (sequelize, DataTypes) {
    const FarmerPayment = sequelize.define("Farmer_Payment", {
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

    Payment.associate = function (models) {
        FarmerPayment.belongsTo(models.Farmer, {
            foreignKey: { allowNull: false }
        });
    }
    return Payment;
}