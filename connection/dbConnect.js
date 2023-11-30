const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const url = config.get("DB_STRING");

exports.connectToDb = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("db conn"))
    .catch(() => console.log("err"));
};
