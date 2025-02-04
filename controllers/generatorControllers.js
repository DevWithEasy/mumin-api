const salatur_category = require('../data/salah/salatur_category.json')
const salatur_topics = require('../data/salah/salatur_topics.json')
const salatur_topics_details = require('../data/salah/salatur_topics_details.json')
const salah = require('../data/salah/salah.json')
const salah_topics = require('../data/salah/salah_topics.json')
const fs = require("fs")
const path = require("path")
const DbCommand = require('../database/dbCommand')

exports.salaturTopics = async (req, res, next) => {
  try {

    const data = salatur_category.map(category => {
      return {
        ...category,
        topics : salatur_topics.filter(t=>t.cat_id == category.id)
      }
    })
    res.json(data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.salaturSingleTopics = async (req, res, next) => {
  try {
    const data = salatur_topics.find(s => s.id == req.params.id)
    res.json(data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.salaturTopicsUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const filePath = path.join(__dirname, "../data/salah/salatur_topics.json");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = jsonData.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Topic not found",
      });
    }

    // Update the object with new data
    jsonData[index] = { ...jsonData[index], ...updateData };

    // Write the updated JSON data back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return res.json(jsonData[index]);
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
exports.salahTopics = async (req, res, next) => {
  try {
    const topics = []
    
    salah_topics.forEach(topic=>{
      const findCategory = salah.find(item=>item.id === topic.category)
      console.log()
      const findTopic = findCategory.topics.find(item=>item.id == topic.title_id)
      const newTopic = {
        ...topic,
        category : {id: findCategory.id , title : findCategory.title},
        title_id : findTopic
      }
      topics.push(newTopic)
    })
    res.json(topics)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.salahSingleTopics = async (req, res, next) => {
  try {
    const data = salah_topics.find(s => s.id == req.params.id)
    res.json(data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.salahTopicsUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const filePath = path.join(__dirname, "../data/salah/salah_topics.json");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = jsonData.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Topic not found",
      });
    }

    // Update the object with new data
    jsonData[index] = { ...jsonData[index], ...updateData };

    // Write the updated JSON data back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return res.json(jsonData[index]);
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.dbTest = async (req, res, next) => {
  try {
    // DbCommand.getBooks()
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}