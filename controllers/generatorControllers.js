const arabic = require('../data/arabic.json')
const arabic_only = require('../data/abrabic_only.json')
const english = require('../data/en.json')
const bn_jahirul = require('../data/jahirul_bn.json')
const bn_mohiuddin = require('../data/muhiuddin_bn.json')
const suras = require('../data/quran_suras.json')
const dua_category = require('../data/dua/category.json')
const dua_names = require('../data/dua/duanames.json')
const dua_details = require('../data/dua/duadetails.json')

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
        const {arabic,bottom,reference,top,translations} = detail
        data.push({
          id: dua_global_id,
          category : category.id,
          name: duaname,
          arabic,
          bottom,
          reference,
          top,
          translations,
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