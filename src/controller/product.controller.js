const express = require('express');

const router = express.Router();

const Product = require('../models/product.model')


const upload = require('../middleware/upload')
router.post("/",upload.single("productimages"), async(req,res)=>{


    try{
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:req.file.path,
        })
        return res.status(201).json({product})

    }catch(e){
return res.status(500).json({status:"failed",message:e.message})
    }
});
router.post("/multiple",upload.any("productimages"), async(req,res)=>{

    const filepath = req.files.map(file=>file.path);
console.log(filepath)
    try{
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:filepath,
        })
        return res.status(201).json({product})

    }catch(e){
return res.status(500).json({status:"failed",message:e.message})
    }
});
module.exports=router;