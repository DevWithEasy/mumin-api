const salatur_category = require('../data/salah/salatur_category.json')
const salatur_topics = require('../data/salah/salatur_topics.json')
const salatur_topics_details = require('../data/salah/salatur_topics_details.json')
const salah_category = require('../data/salah/salah_category.json')
const salah_topics = require('../data/salah/salah_topics.json')
const salah_topics_details = require('../data/salah/salah_topics_details.json')
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
    const data = salatur_topics_details.find(s => s.topic_id == req.params.id && s.cat_id == req.params.cat_id)

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
    const { id,cat_id } = req.params;
    const updateData = req.body;

    const filePath = path.join(__dirname, "../data/salah/salatur_topics_details.json");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = jsonData.findIndex(item => item.topic_id == parseInt(id) && item.cat_id == cat_id);

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
    console.log(error)
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
exports.salahTopics = async (req, res, next) => {
  try {

    const data = salah_category.map(category => {
      return {
        ...category,
        topics : salah_topics.filter(t=>t.cat_id == category.id)
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

exports.salahSingleTopics = async (req, res, next) => {
  try {
    const data = salah_topics_details.find(s => s.topic_id == req.params.id && s.cat_id == req.params.cat_id)
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
    const { id,cat_id } = req.params;
    const updateData = req.body;

    const filePath = path.join(__dirname, "../data/salah/salah_topics_details.json");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = jsonData.findIndex(item => item.topic_id == parseInt(id) && item.cat_id == cat_id);

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

exports.sawmTopics = async (req, res, next) => {
  try {
    const topics_path = path.join(__dirname, "../data/sawm/sawm_topics.json");
    const topics_data = JSON.parse(fs.readFileSync(topics_path, "utf-8"));
    res.json(topics_data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.sawmSingleTopics = async (req, res, next) => {
  try {
    const details_path = path.join(__dirname, "../data/sawm/swam_topics_details.json");
    const details_data = JSON.parse(fs.readFileSync(details_path, "utf-8"));
    const data = details_data.find(s => s.topic_id == req.params.id)
    res.json(data)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

exports.sawmTopicsUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const filePath = path.join(__dirname, "../data/sawm/swam_topics_details.json");

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = jsonData.findIndex(item => item.topic_id == parseInt(id));

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
    // const topics_path = path.join(__dirname, "../data/sawm/sawm_topics.json");
    // const topics_deatils_path = path.join(__dirname, "../data/sawm/swam_topics_details.json");
    const array = Array.from({ length: 60 }, (_, i) => {
      return {
        id : i + 1,
        topic_id : i + 1,
        description : ''
      }
    });
    // fs.writeFileSync(topics_deatils_path, JSON.stringify(array, null, 2));
    res.json(array)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}