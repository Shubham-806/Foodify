const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://Foodify:KFYMQZVq2bZRkyQ@cluster0.n3ug9o7.mongodb.net/FoodifyMERN?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_items");
      let data=await fetched_data.find({}).toArray() 
      const foodcategory=mongoose.connection.db.collection("foodcategory");
      let catData=await foodcategory.find({}).toArray()
      global.food_items= data;
      global.foodcategory= catData;
      console.log();
    } catch (error) {
      console.log('err: ', error);
    }
  };



  
  module.exports = mongoDB;

  

