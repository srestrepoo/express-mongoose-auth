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
    editSession(req,res){
      return res.status(200).send('Edited');
    },
    deleteSession(req,res){
      return res.status(200).send('Deleted');
    }
  }
};
