"use strict";

var rp = require("request-promise");
var mqtt = require("mqtt");

const lightController = {};

const mqttUrl = "mqtt://iot-edu-lab.lnu.se:1883";
const urlOri =
  "http://192.168.0.47/api/hzcaJDl7DDWXbG6fECcQp5nfB83AV3xGLSSP7dN1/lights/";
lightController.personIsInFront = true;
const clientTest = mqtt.connect(mqttUrl);
clientTest.subscribe("oncamera/feeds/lights");

lightController.initSubsription = (req, res) => {
  clientTest.on("message", async function (topic, message, packet) {
    console.log("message is " + JSON.stringify(message));
    // console.log("topic is " + topic);
    const mess = await packet.payload.toString("utf-8");
    await res.json({
      msg: mess,
    });
  });
};
// If lightController.personIsInFront == false, send error message
// Saying that a person needs to be in front of camera
// Have check in beginning

lightController.alllights = (req, res) => {
  var options = {
    uri: urlOri,
    json: true,
  };
  rp(options)
    .then(function (body) {
      //console.log(body);
      var info = [];
      for (var key in body) {
        var single = body[key]["state"];
        single["id"] = key;
        info.push(single);
      }
      console.log(info);
      res.send(info);
      // Skcika data till react
    })
    .catch(function (err) {
      console.log(err);
    });
};

lightController.changelight = (req, res) => {
  const id = req.params.id;
  console.log("hej", id);
  var data = req.body.data;
  console.log(data);
  var url = urlOri + id + "/state/";
  var options = {
    method: "PUT",
    uri: url,
    json: data,
  };
  rp(options)
    .then(function (body) {
      console.log("-----------");
      console.log(body);
      res.json(body);
    })
    .catch(function (err) {
      console.log(err);
      res.send("bad operation.");
    });
};

module.exports = lightController;
