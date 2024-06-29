const express = require("express");
const router = express.Router();
const Product = require("../models/data");

router.get("/", async (req,res) => {
   try{
      const products = await Product.find();  
      res.json(products); 
   }
   catch(err) {
     res.status(500).json({message: err.message});
   }
});

router.get("/:id", getProduct, (req,res) => {
    res.json(res.product);
});

router.post("/", async(req, res) => {
    const product = new Product({
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      images : req.body.images,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.patch("/:id", getProduct, async(req,res) => {
    if(req.body.name != null){
        res.body.name = req.body.name;
    }
    if(req.body.description != null){
        res.body.description = req.body.description;
    }
    if(req.body.images != null){
        res.body.images = req.body.images;
    }
    if(req.body.price != null){
        res.body.price = req.body.price;
    }

    try {
        let updatedProduct = res.product.save();
        res.json(res.product);
    } catch(err){
        res.status(500).json({message : err.message});
    }

});

router.delete("/:id", getProduct, async(req,res) =>{
  try{
    await res.product.deleteOne();
    res.json({mesage : `Removed the product with id ${req.params.id}`});
  }
  catch(err){
    res.status(500).json({message: err.message});
  }

});

async function getProduct(req,res,next){
   let product;
   try{
    product = await Product.findById(req.params.id);
    if(product == null){
        return res.status(404).json({message : err.message});
    }
   }
   catch(err){
    req.status(500).json({message : err.message});  
   }

   res.product = product;
   next();
}

module.exports = router;