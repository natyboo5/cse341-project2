const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /* 
  #swagger.summary = 'Get all tablets' 
  */
 try{
    const result = await mongodb.getDatabase().db().collection('tablets').find();
    result.toArray().then((tablets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tablets);
    });
  } catch(err) {
    res.status(404);
  }
};

const getSingle = async (req, res) => {
    /* 
  #swagger.summary = 'Get tablet by id' 
  */try{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json({message: 'Invalid id'});
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tablets').find({ _id: userId });
    result.toArray().then((tablets) => {
      if (tablets.length == 0) {
        res.status(400).json('ID does not exist.')
        return;
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tablets[0]);
    });
  } catch(err){
    res.status(404);
  }
};

const createTablet = async (req, res) => {
    /* 
  #swagger.summary = 'Create a new tablet' 
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

  const response = await mongodb.getDatabase().db().collection('tablets').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product information.');
  }
  } catch(err) {
    res.status(500);
  }
};

const updateTablet = async (req, res) => {
    /* 
  #swagger.summary = 'Update tablets by id' 
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
    const response = await mongodb.getDatabase().db().collection('tablets').replaceOne({ _id: userId }, user);
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


const deleteTablet = async (req, res) => {
      /* 
  #swagger.summary = 'Delete tablets by id' 
  */
  try {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Invalid id'});
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tablets').deleteOne({ _id: userId }, true);
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
    createTablet,
    updateTablet,
    deleteTablet
};