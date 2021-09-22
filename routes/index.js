var express = require("express");
var router = express.Router();
const crawlerMethod = require("../util");
const { base_url } = require("../constants/constant");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Web Crawler" });
});

router.post("/crawling", async (req, res) => {
  const { link } = req.body;
  if (link.includes(base_url)) {
    try {
      let data = await crawlerMethod(link);
      data = data && data.length > 0 ? data : {};
      res.json({
        data: data,
        isPageValid: true,
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        data: null,
        isPageValid: true,
      });
    }
  } else {
    res.status(400).send({
      status: "error",
      data: null,
      isPageValid: false,
    });
  }
});

module.exports = router;
