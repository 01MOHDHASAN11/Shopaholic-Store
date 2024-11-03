const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate")


// get product data api
router.get("/getproducts", async(req,res)=>{
    try{
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    } catch(error) {
        console.log("error"+ error.message);
    }
})


// get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        // console.log(id);

        const individuadata = await Products.findOne({id:id});
        // console.log(individuadata + "individual data");

        res.status(201).json(individuadata);

    }catch(error){
        res.status(400).json(individuadata);
        console.log("error" + error.message);

    }
});



// register data

router.post("/register",async(req,res)=>{
    // console.log(req.body);

    const {fname,email,mobile,password,cpassword} = req.body;

    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error:"fill the all data"});
        console.log("not data available")
    };

    try{
        const preuser = await USER.findOne({email:email});

        if(preuser){
            res.status(422).json({error:"this user is already present"})
        }else if(password !==cpassword){
            res.status(422).json({error:"password and cpassword not match"})
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            })

            // password hashing process(encryption and decryption) install bcryptjs

            const storedata =await finalUser.save();
            console.log(storedata)

            res.status(201).json(storedata);
        }
    }catch(error){

    }

    
})



// Login user api


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"fill all the data"})
    };

    try {
        const userlogin = await USER.findOne({email:email});
        // console.log(userlogin)

        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch + "pass match")


            if(!isMatch){
                res.status(400).json({error:"invalid details"})
            }

            else{
                  // token generate


            const token = await userlogin.generateAuthtokenn();
            // console.log(token)

            res.cookie("Hibaweb",token,{
                expires:new Date(Date.now() + 9000000000),
                httpOnly:true
            })
                res.status(201).json(userlogin)
            }
        } else{
            res.status(400).json({error:"invalid details"})

        }
    } catch (error) {
        // console.log(error)
        res.status(400).json({error:"invalid data"})
    }
})




// adding the data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        const cart  = await Products.findOne({id:id});
        console.log(cart + "cart value")


        const UserContact = await USER.findOne({_id:req.userID})
        console.log(UserContact);


        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact)
        }

        else{
            res.status(401).json({error:"invalid user"})
        }



    }
    
    catch(error) {
        res.status(401).json({error:"invalid user"})
    }
})


// get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{
    try {
        const buyuser  = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser)
    } catch (error) {
        console.log("error" + error)
        
    }
})


// get valid user


router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const validuserone  = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone)
    } catch (error) {
        console.log("error" + error)
        
    }
})


// remove item from cart
router.delete("/remove/:id",authenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
            return cruval.id !=id;
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed")
    }catch(error){
        console.log("error" + error)
        res.status(400).json(req.rootUser)

    }
})


// for user logout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("Hibaweb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});


module.exports = router;