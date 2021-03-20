"use strict";

var rp = require("request-promise");
var mqtt=require('mqtt');

const lightController = {};

lightController.mqttUrl = "mqtt://localhost:1883"
lightController.urlOri = "http://192.168.0.47/api/hzcaJDl7DDWXbG6fECcQp5nfB83AV3xGLSSP7dN1/lights/";
lightController.personIsInFront = true;
lightController.client = mqtt.connect(lightController.mqttUrl, options)
lightController.client.subscribe("personInFront")

lightController.togglePerson = (req, res) => {
  // Send this body from openMV
  lightController.personIsInFront != lightController.personIsInFront;
};

lightController.initSubsription = () => {
  client.on('message',function(topic, message, packet){
    console.log("message is "+ message);
    console.log("topic is "+ topic);
  });
}
// If lightController.personIsInFront == false, send error message
// Saying that a person needs to be in front of camera
// Have check in beginning

lightController.alllights = (req, res) => {
  var options = {
    uri: lightController.urlOri,
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
  if (lightController.personIsInFront) {
    const id = req.params.id;
    console.log("hej", id);
    var data = req.body.data;
    console.log(data);
    // const state = data["on"];
    // console.log(state);
    // bright = data["bri"];
    // console.log(bright);
    var url = lightController.urlOri + id + "/state/";
    // console.log(url);
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
  } else {
    res.send("A person needs to be in front of camera to operate lights.")
  }
};
//   lightController.getspecificlight = (req, res) => {
//     var id = req.params.id;
//     var url = urlOri + id;
//     //console.log(url);

//     var options = {
//       uri: url,
//       json: true,
//     };
// rp(options)
//   .then(function (body) {
//     var single = body["state"];
//     var reachable = single["reachable"];
//     var onstate = single["on"];
//     if (reachable && onstate) {
//       single["class"] = "success";
//     } else if (reachable) {
//       single["class"] = "warning";
//     } else {
//       single["class"] = "danger";
//     }
//     single["id"] = id;
//     //  console.log(single);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
//   };
// };

module.exports = lightController;
