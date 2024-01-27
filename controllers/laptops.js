const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /* 
  #swagger.summary = 'Get all laptops' 
  */
 try{
    const result = await mongodb.getDatabase().db().collection('laptops').find();
    result.toArray().then((laptops) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(laptops);
    });
  } catch(err) {
    res.status(404);
  }
};

const getSingle = async (req, res) => {
    /* 
  #swagger.summary = 'Get laptop by id' 
  */try{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json({message: 'Invalid id'});
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('laptops').find({ _id: userId });
    result.toArray().then((laptops) => {
      if (laptops.length == 0) {
        res.status(400).json('ID does not exist.')
        return;
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(laptops[0]);
    });
  } catch(err){
    res.status(404);
  }
};

const createLaptop = async (req, res) => {
    /* 
  #swagger.summary = 'Create a new laptop' 
  */
  try{
  const laptop = {
    name: req.body.name,
    screenSize: req.body.screenSize,
    cpuType: req.body.cpuType,
    memory: req.body.memory,
    storage: req.body.storage,
    resolution: req.body.resolution,
    price: req.body.price    
  };

  const response = await mongodb.getDatabase().db().collection('laptops').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product information.');
  }
  } catch(err) {
    res.status(500);
  }
};

const updateLaptop = async (req, res) => {
    /* 
  #swagger.summary = 'Update laptops by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        screenSize: req.body.screenSize,
        cpuType: req.body.cpuType,
        memory: req.body.memory,
        storage: req.body.storage,
        resolution: req.body.resolution,
        price: req.body.price 
    };
    const response = await mongodb.getDatabase().db().collection('laptops').replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the product information.');
    }
    } catch(err) {
      res.status(404);
    }
  };


const deleteLaptop = async (req, res) => {
      /* 
  #swagger.summary = 'Delete laptops by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('laptops').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
   } catch(err)  {
    res.status(404);
   }
  };

module.exports = {
    getAll,
    getSingle,
    createLaptop,
    updateLaptop,
    deleteLaptop
};