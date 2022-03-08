const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models/db");

class Property extends Model {}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //buy/rent
    saleType: { 
        type: DataTypes.STRING,
        allowNull: false,
        field: "sale_type",
    },
    //freehold/leasehold
    tenure: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    propertyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "property_name",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "num_of_bedrooms",
    },
    noOfBaths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "num_of_baths",
    },
    floorsize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pricePSF: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "price_PSF",
    },
    propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "property_type",
    },
    TOPYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sellerId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "seller_id"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Property",
    tableName: "property",
  }
);

module.exports = Property;