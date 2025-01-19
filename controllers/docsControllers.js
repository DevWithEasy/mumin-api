const DbCommand = require("../database/dbCommand");
const db = require("../database/dbConfig");

exports.docsCreate = async (req, res, next) => {
  try {
  } catch (error) {
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

exports.docsDelete = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.docsGet = async (req, res, next) => {
  try {
    // res.json({ success: true, tables: DbCommand.dbtableDelete('darood') });
    res.json({ success: true, tables: DbCommand.dbtableCount() });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
