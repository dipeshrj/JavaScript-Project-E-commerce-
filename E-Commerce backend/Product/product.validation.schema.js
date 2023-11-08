import Joi from "joi";


export const productSchema = Joi.object({
        name: Joi.string().required().min(2).max(55).trim(),
        company: Joi.string().required().min(2).max(55).trim(),
        price: Joi.number().min(0).required(),
        freeShipping: Joi.boolean().required(),
        inStock: Joi.boolean().required(),
        quantity: Joi.number().integer().required().min(1),
        category: Joi.string().required().trim().valid("groceries",
            "electronics",
            "furniture",
            "kitchen",
            "cosmetics",
            "clothing",
            "accessories",
            "bakery",
            "liquor"),
        color: Joi.array().items(Joi.string().trim().lowercase())
    })


// validate query
   export  const getAllProductsValidation = Joi.object({
        page: Joi.number().integer().min(1).required(),
        limit: Joi.number().integer().min(1).required(),
        searchText: Joi.string().allow(null,"")
    })