const arabic = require('../data/arabic.json')
const arabic_only = require('../data/abrabic_only.json')
const english = require('../data/en.json')
const bn_jahirul = require('../data/jahirul_bn.json')
const bn_mohiuddin = require('../data/muhiuddin_bn.json')
const suras = require('../data/quran_suras.json')
const dua_category = require('../data/dua/category.json')
const dua_names = require('../data/dua/duanames.json')
const dua_details = require('../data/dua/duadetails.json')
const salatur_category = require('../data/salah/salatur_category.json')
const salatur_topics = require('../data/salah/salatur_topics.json')
const salah = require('../data/salah/salah.json')
const salah_topics = require('../data/salah/salah_topics.json')
const fs = require("fs")
const path = require("path")
const DbCommand = require('../database/dbCommand')


exports.quranCreate = async (req, res, next) => {
  try {
    const quran = [];
    suras.forEach((s) => {
      const ar = arabic.find(sura => sura.number === s.id)
      const ar_only = arabic_only.find(sura => sura.id === s.id)
      const en = english.find(sura => sura.number === s.id)
      const bnJahirul = bn_jahirul.find(sura => sura.number === s.id)
      const bnMohiuddin = bn_mohiuddin.find(sura => sura.number === s.id)

      const ayahs = ar.ayahs.map((ayah, i) => {
        return {
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          juz: ayah.juz,
          manzil: ayah.manzil,
          page: ayah.page,
          ruku: ayah.ruku,
          hizbQuarter: ayah.hizbQuarter,
          sajda: ayah.sajda,
          arabic: ar_only.verses[i].text,
          english: en.ayahs[i].text,
          jahirul_bn: bnJahirul.ayahs[i].text,
          muhiuddin_bn: bnMohiuddin.ayahs[i].text,
        }
      })

      quran.push({
        ...ar,
        translation: s.translation,
        ayahs,
      })
    })

    res.json(quran)

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.getQuran = async (req, res, next) => {
  try {
    res.json(arabic)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.duaCreate = async (req, res, next) => {
  try {
    //categoty
    // res.json(dua_category)

    //category dua name
    // const names = dua_names.filter(name => name.category == '1')
    // res.json(names)

    const data = []

    dua_category.forEach(category => {

      const names = dua_names.filter(name => name.category == category.id.toString())

      names.forEach(name => {
        const {dua_global_id,duaname} = name
        const detail = dua_details.find(d => d.dua_global_id == name.dua_global_id)
        const {arabic,bottom,reference,top,translations,transliteration} = detail
        data.push({
          id: dua_global_id,
          category : category.id,
          name: duaname,
          arabic,
          bottom,
          reference,
          top,
          translations,
          transliteration
        })
      })
    })
    // const names = dua_names.filter(name => name.category == '1')

    // const dua_names = dua_names.filter(name => name.category == '1')
    // names.forEach(name=>{
    //   const detail = dua_details.find(d => d.dua_global_id == name.dua_global_id)
    //   dua.push(detail)
    // })
    // res.json(dua)

    res.json(data)

  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}


exports.salaturTopics = async (req, res, next) => {
  try {
    const topics = []
    
    salatur_topics.forEach(topic=>{
      const findCategory = salatur_category.find(item=>item.id === topic.category)
      const findTopic = findCategory.topics.find(item=>item.id == topic.title_id)
      const newTopic = {
        ...topic,
        category : {id: findCategory.id , heading : findCategory.heading},
        title_id : findTopic
      }
      topics.push(newTopic)
    })
    res.json(topics)
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
    DbCommand.getBooks()
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}