"use strict";

var rp = require("request-promise");
const lightController = {};
const urlOri =
  "http://192.168.0.47/api/hzcaJDl7DDWXbG6fECcQp5nfB83AV3xGLSSP7dN1/lights/";

/**
 * Renders our 'homepage'.
 *
 * @param  {object} req Is the request object.
 * @param  {object} res Is the response object.
 */

lightController.alllights = (req, res) => {
  var url = urlOri;
  console.log(url);
  var options = {
    uri: url,
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
  // const state = data["on"];
  // console.log(state);
  // bright = data["bri"];
  // console.log(bright);
  var url = urlOri + id + "/state/";
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
