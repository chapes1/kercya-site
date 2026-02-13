const Category = require("../models/Category");
const redisClient = require("../config/cache");

const all = async (req, res) => {
  try{
    const cache = await redisClient.get("categories")
    if (cache) return res.json(JSON.parse(cache))

    const categories = await Category.find()
    if(!categories || categories.length === 0) return res.status(404).json({ message: "No categories found" })

    await redisClient.set("categories", categories);
    return res.json(categories)
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const find = async (req, res) => {
  try {
    const { id } = req.params
    const cache = await redisClient.get("category", { id })
    if(cache) return res.json(JSON.parse(cache))

    const category = await Category.findById(id)
    if (!category) return res.status(404).json({ message: "Category not found" })
    
    await redisClient.set("category", category)
    return res.json(category)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) return res.status(400).json({ message: "Name is required" })
    
    const category = await Category.create({ name })
    
    await redisClient.set("category", category)
    return res.status(201).json({ message: "Category created successfully", category })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try{
    const { id } = req.params
    const { name } = req.body

    if (!name) return res.status(400).json({ message: "Name is required" })
    
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true })
    
    if (!category) return res.status(404).json({ message: "Category not found" })
    
    await redisClient.set("category", category)
    return res.json({ message: "Category updated successfully", category })
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findByIdAndDelete(id)
    
    if (!category) return res.status(404).json({ message: "Category not found" })
    
    await redisClient.del("category", { id })
    return res.json({ message: "Category deleted successfully" })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  find, all, create, update, destroy
}