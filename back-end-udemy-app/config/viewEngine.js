const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");
const numeral = require("numeral");
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

module.exports = function (app) {
  app.engine(
    "hbs",
    exphbs({
      defaultLayout: "main.hbs",
      extname: ".hbs",
      helpers: {
        section: hbs_sections(),
        format(val) {
          return numeral(val).format("0,0");
        },
        formatDate(date, format) {
          return moment(date).format(format);
        },
        formatTime(time) {
          return moment
            .duration(time, "second")
            .format("hh:mm", { trim: false });
        },
        switch(value, options) {
          this.switch_value = value;
          return options.fn(this);
        },
        case(value, options) {
          if (value === this.switch_value) {
            return options.fn(this);
          }
        },
      },
    })
  );
  app.set("view engine", ".hbs");
};
