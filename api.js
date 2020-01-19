var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var express = require("express")
var router = express.Router();
var _=require("lodash");
var uuid = require("node-uuid");
var db = require('./database/models');

module.exports = router;
/*
router.get("/rooms", function(req, res){
    res.json(rooms);
});

router.route("/rooms/:roomId/messages")
.get(function(req, res){
    var roomId = req.params.roomId;
    var roomMessages = messages
    .filter(m => m.roomId === roomId);
    var room = _.find( rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }
    res.json({
        room: room,
        messages: roomMessages
    })
})
.post(function(req, res){
    var roomId = req.params.roomId;
   var message = {
       roomId : roomId,
       text :req.body.text,
       userId : "44f885e8-87e9-4911-973c-4074188f408a",
       id : uuid.v4()
   };
   messages.push(message);
   res.sendStatus(200);
})
.delete(function(req,res){
    var roomId = req.params.roomId;
    messages = messages.filter(m => m.roomId !== roomId)
    res.sendStatus(200);
});
*/
router.get("/all", function(req, res){
    console.log("Comes here")    
	db.User.findAll({}).then(function (result) {
			res.json(result);
	});
})

router.post("/all/new", function(req,res) {
    console.log("Comes here for /all/new")    
    db.Item.create({
			name: req.body.name,
			category: req.body.category,
			price: req.body.price
		}).then(function (result) {
			res.json(result);
		})
    });

router.put("/update/:id", function(req, res) {
		db.Item.update({
			name: req.body.name
		}, {
			where: {
				id: req.params.id
			}

		}).then(function(result){
			res.json(result);
		});
    });

router.delete("/delete/:id", function(req,res) {
		db.Item.destroy({
			where: {
				id: req.params.id 
			}
		}).then(function(result){
			res.json(result);
		})
    });
    

 