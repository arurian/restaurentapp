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
  