const Tag = require('../models/Tag')

const all = async (req, res)=>{
  try {
    const tags = await Tag.find();
    
    if(!tags || tags.length === 0) return res.status(404).json({ message: "No tags found" })

    return res.json(tags)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
const find = async (req, res) => {
  try {
    const { id } = req.params

    const tag = await Tag.findById(id)
    
    if (!tag) return res.status(404).json({ message: "Tag not found" })

    return res.json(tag)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
const create = async (req, res) => {
  try{
    const { name } = req.body
    
    if(!name) return res.status(400).json({ message: "Name is required" })
    
    const tag = await Tag.create({ name });

    return res.status(201).json({ message: "Tag created successfully", tag })
  }catch(err){
    return res.status(500).json({ message: err.message })
  
  }
}
const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    if(!name) return res.status(400).json({ message: "Name is required" })
    
    const tag = await Tag.findByIdAndUpdate(id, { name }, { new: true })
    
    if (!tag) return res.status(404).json({ message: "Tag not found" })
      
    return res.json({message: "Tag updated successfully", tag})
  } catch (err) {
    
    return res.status(500).json({message: err.message})
  }
}
const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByIdAndDelete(id)
    
    if (!tag) return res.status(404).json({ message: "Tag not found" })
    
      return res.json({ message: "Tag deleted successfully"})
  } catch (err) {
    
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { all, find, create, update, destroy }