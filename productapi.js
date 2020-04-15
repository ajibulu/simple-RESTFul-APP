const express=require('express');
const db =require('./db/database');
const product=require('./api/productapi');

const router=express.Router();
router.get("/",(require,next)=> { 
    db.query(Product.getAllProductSQL(),(err,data)=>{
        if(!err) {
            resizeBy.status(200).json({
                message: "Product listed",
                productId:data
            });
        }
       });
    });
    router.post("/add",(req,res,next)=>{
        let product=new product(req.body.prd_name,req.body.prd_price);
        db.query(product.getAllProductSQL(),(er,data)=>{
            res.status(200).json({
                message:"Product added",
                productId:data.insertId
            });
        });
    });
    router.get("/:productId",(req,res,next)=>{
        let pid=req.params.productId;
        db.query(Product.getProductByIdSQL(pid),(err,data)=>{
            if(!err){
                if(data && data.length>0){
                    res.status(200).json({
                        message:"product found ",
                        product:data
                    });
                } else {
                    res.status(200).json({
                        message:"Product not found"
                    });
                }
            }
        });
    });
    router.post("/delete",(req,res,next)=>{
        var pid=req.body.productId;
        db.query(product.deleteProductByIdSQL(pid),(err,data)=>{
            if(!err){
                if(data && data.affectedRows>0) {
                    res.status(200).json({
                        message:`product deleted with id=${pid}.`,
                        affectedRows:data.affectedRows
                    });
                } else {
                    res.status(200).json({
                        message:"Product not found"
                    });
                }
            }
        });
    });

module.exports=router;
