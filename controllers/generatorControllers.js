const arabic = require('../data/arabic.json')
const english = require('../data/en.json')
const bn_jahirul = require('../data/jahirul_bn.json')
const bn_mohiuddin = require('../data/muhiuddin_bn.json')
const suras = require('../data/quran_suras.json')

exports.quranCreate = async (req, res, next) => {
  try {
    const quran  = [] ;
    suras.forEach((s) => {
      const ar = arabic.find(sura => sura.number === s.id)
      const en = english.find(sura => sura.number === s.id)
      const bnJahirul = bn_jahirul.find(sura => sura.number === s.id)
      const bnMohiuddin = bn_mohiuddin.find(sura => sura.number === s.id)

      const ayahs = ar.ayahs.map((ayah, i)=>{
        return {
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          juz: ayah.juz,
          manzil: ayah.manzil,
          page: ayah.page,
          ruku: ayah.ruku,
          hizbQuarter: ayah.hizbQuarter,
          sajda: ayah.sajda,
          arabic: ayah.text,
          english: en.ayahs[i].text,
          jahirul_bn: bnJahirul.ayahs[i].text,
          muhiuddin_bn: bnMohiuddin.ayahs[i].text,
        }
      })

      quran.push ({
        ...ar,
        translation : s.translation,
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

exports.docsUpdate = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
