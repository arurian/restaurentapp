const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

const Food = require("../models/food.model");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token",token);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
    chkval:"100",
  });
});




/*
router.post("/addfood", async (req, res) => {
  try {
    let { foodname,foodprice, foodqty,fooddesc} = req.body;
    
    console.log(foodname,foodprice, foodqty,fooddesc);
    // validate

    // if (!foodName || !foodPrice || !foodQty || !foodDesc) {
    if (!foodname || !foodprice) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const newFood = new Food({
      foodname,
      foodprice,
      foodqty,
      fooddesc,           
    });

    const savedFood = await newFood.save();
    res.json(savedFood);
    //  if (savedFood) return res.json(true);
    // res.json({
    //    msg: {
    //      id: "addfood",
    //      displayMsg: "Message Added successfully",
    //    },
    //  });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

*/
  /*  router.post("/addfood", async (req, res) => {
      try {
        let { foodname,foodprice, foodqty,fooddesc} = req.body;
        
        console.log(foodname,foodprice, foodqty,fooddesc);
        // validate
    
        // if (!foodName || !foodPrice || !foodQty || !foodDesc) {
        if (!foodname || !foodprice) {
          return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        const newFood = new Food({
          foodname,
          foodprice,
          foodqty,
          fooddesc           
        });
    
        console.log("HHHHHHHHHHHHHHHHHHHHHH");
       
        //const savedFood = await newFood.save();

        const savedFood = await newFood.save();

        console.log("GGGGGGGGGGGGGGGGGG");
        console.log("test save"+ savedFood);
        res.json(savedFood);
        // if (savedFood) return res.json(true);
        // res.json({
        //   msg: {
        //     id: "addfood",
        //     displayMsg: "Message Added successfully",
        //   },
        // });
    
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    
    */
    

   router.post("/addfood", async (req, res) => {
    try {
      let { foodname, foodprice, foodqty, fooddesc } = req.body;
  
      // validate
  
      if (!foodname || !foodprice || !foodqty)
        return res.status(400).json({ msg: "Not all fields have been entered." });
           
      
      const newFood = new Food({
        foodname,
        foodprice,
        foodqty,  
        fooddesc      
      });


      console.log("Separate food : " + foodname , foodprice , foodqty );

      console.log("new Food : " + newFood);

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      const savedFood = await newFood.save();
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB");
      res.json(savedFood);
      console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



// router.get("/listfood", async (req, res) => {
//   const food = await Food.find();
//   console.log("food------"+food)
//   res.json({
//     fooname: food.foodname,
//     id: food._id,    
//   });
// });

router.get("/listfood", async (req, res) => {
  console.log("reached backend")
  await Food.find().then(documents => {
    console.log("food items -- -"+documents);
      if(documents){
          res.status(200).json({
              message: "Fooditems fetched successfully!",
              posts: documents
          });
      }
      else{
          res.status(404).json({ message: "Fooditems not found!" });
      }
     
  });
});

// router.get("/profiles",(req, res, next) => {
//         Profile.find().then(prof => {
//             if (prof) {
              
//                 res.status(200).json({
//                     message: "Profile fetched successfully!",
//                     profile: prof
//                 });
//             } else {
//                 res.status(404).json({ message: "Profile not found!" });
//             }
//         })
//         .catch(e=>{
//             console.log(e)
//         });
//     });
  

module.exports = router;