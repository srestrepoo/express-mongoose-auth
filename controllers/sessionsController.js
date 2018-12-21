const Session = require('../models/session');
const mongoose = require('mongoose');
module.exports = {
  sessionsController: {
    async getAllSessions(req, res) {
      try{
        let sessions = await Session.find();
        return res.status(200).send(sessions);
      }catch(err){
        return res.status(500).send(err);
      }
    },
    async getSession(req, res) {
      try{
        let session = await Session.findById(req.params.id);
        return res.status(200).send(session);
      }catch(err) {
        if(err.name == 'CastError'){
          return res.sendStatus(404);
        }else{
          res.status(500).send(err);
        }
      }
    },
    async createSession(req,res) {
      let newSession = new Session({
        name: req.body.session.name,
        professor: req.body.session.professor
      });
      try{
        await newSession.save();
        return res.status(201).send(newSession);
      }catch(err){
        return res.status(400).send(err);
      }
    },
    async updateSession(req,res){
      let update = req.body.session;
      try{
        await Session.findOneAndUpdate({ _id: req.params.id }, update);
        return res.status(200).send('updated');
      }catch(err){
        if(err.code == 11000){
          return res.status(500).send(err);
        }else if (err.name == 'CastError'){
          return res.sendStatus(404);
        }else{
          return res.status(500);
        }
      }
    },
    async deleteSession(req,res){
      try{
        let deleted = await Session.findOneAndDelete({ _id: req.params.id });
        if(deleted){
          return res.status(200).send(deleted);
        }else{
          return res.sendStatus(404);
        }
      }catch(err){
        if (err.name == 'CastError'){
          return res.sendStatus(404);
        }else{
          return res.status(500);
        }
      }
    }
  }
};
