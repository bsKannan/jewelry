var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user');
var Product = require('../models/product');

//Register
router.post('/register',(req,res,next)=>{
    var newUser = new User({
        name: req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        role:'users'
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false,
                msg:'Failed to register user'
            });
        }else{
            res.json({
                success: true,
                msg: 'User Registered'
            });
        }
    });
});

//Authenticate
router.post('/authenticate',(req,res,next)=>{
    var username  = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username,(err, user)=> {
        if(err) throw err;
        if(!user) {
            return res.json({
                success:false,
                msg:'User not found'
            });
        }

        User.comparePassword(passport, user.password,(err,isMatch) => {
            if(err) throw err;
            if(isMatch) {
                var token = jwt.sign({
                    data:user
                },config.secret,{
                    expiresIn:604800//1week
                });

                res.json({
                    success: true,
                    token:'JWT' + token,
                    user: {
                        id: user_id,
                        name:user.name,
                        email:user.email,
                        role:user.role
                    }
                })
            } else {
                return res.json({
                    success:false,
                    msg: 'Wrong Password' 
                })
            }
        })
    })
})


router.get('/profile',passport.authenticate('jwt',{
    session: false
}),(req,res,next) => {
    res.json({
        user:rew.user
    })
})

router.get('/product',(req,res,next) => {
    Product.find((err,product)=> {
        if(err) res.send(err);
        res.json(product)
    })
})

router.post('/addproduct', passport.authenticate('jwt',{
    session:false
}),(req,res,next) => {
    var newProduct = new Product({
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        Catag: req.body.Catag
    });
    Product.addProduct(newProduct,(err, product)=> {
        if(err){
            res.json({
                success:false,
                msg:'Failed to add new product'
            });
        }else {
            res.json({
                success:true,
                msg: 'Product is added'
            })
        }
    })
})

router.put('/editProduct',passport.authenticate('jwt', {
    session:false
}),(req,res,next)=> {
    var newProduct = {
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        Catag: req.body.Catag
    }

    var oldProductID = req.body.oldId;

    Product.editProduct(oldProductID, newProduct, (err, product) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to update product'
            });
        }else {
            res.json({
                success:true,
                msg: 'Product is updated'
            })
        }
    })
})


router.delete('/deleteproduct/:productId',passport.authenticate('jwt',{
    session: false
}),(req,res,next)=> {

    var productID = req.params.productId;

    Product.removeProduct(productID,(err,product) => {
        if(err){
        res.json({
            success: false,
            msg: 'Failed to delete product'
        });
    }else {
        res.json({
            success: true,
            msg: 'Product is deleted'
        })
    }
    })
})


router.get('/manageproduct', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    Product.find(function (err, product) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(product); // return all todos in JSON format
    });
  });
  
  module.exports = router;