const Property = require('../models/propertyModel')
const User = require('../models/userModel')

module.exports = {
    createProperty : async(body)=>{
        await Property.sync();

//todo easier way to check duplicate?
        const property = await Property.create({
            "saleType" : body.saleType,
            "tenure" : body.tenure,
            "propertyName" : body.propertyName,
            "address" : body.address,
            "postcode" : body.postcode,
            "price" : body.price,
            "noOfBedrooms" : body.noOfBedrooms,
            "noOfBaths" : body.noOfBaths,
            "floorsize" : body.floorsize,
            "pricePSF" : (body.price/body.floorsize).toFixed(1),
            "propertyType" : body.propertyType,
            "TOPYear" : body.TOPYear,
            "sellerId": body.sellerId
        })
        return property;
    },

    getAllProperties : async()=>{
        const allProperty = await Property.findAll({include:User});
        return allProperty;
    },

    getProperty : async(propertyId)=>{
        const property = await Property.findOne({where: {id:propertyId},include:User});
        if (!property) throw new Error (`Property ID ${propertyId} Not Found`);
        return property;
    },

    updateProperty : async(propertyId, body)=>{
        let property = await Property.findByPk(propertyId);
        if (!property) throw new Error (`Property ID ${propertyId} Not Found`);
        await Property.update({
            saleType : body.saleType,
            tenure : body.tenure,
            propertyName : body.propertyName,
            address : body.address,
            postcode : body.postcode,
            price : body.price,
            noOfBedrooms : body.noOfBedrooms,
            noOfBaths : body.noOfBaths,
            floorsize : body.floorsize,
            pricePSF : (body.price/body.floorsize).toFixed(1),
            propertyType : body.propertyType,
            TOPYear : body.TOPYear,
            sellerId: body.sellerId
        },{where: {id: propertyId}});

    //redo find to return latest updated
        property = await Property.findByPk(propertyId);
        return property;
    },

    deleteProperty : async (propertyId)=>{
        const remove = await Property.destroy({where: {id: propertyId}})
        if(!remove) throw new Error (`Property ID ${propertyId} Not Found`)
    }
}

Property.belongsTo(User,{
    foreignKey: "sellerId"
});