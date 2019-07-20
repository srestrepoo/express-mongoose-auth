const Session = require('../models/session.model');
const User = require('../models/user.model');
module.exports = {
  sessionsController: {
    async getAllSessions(req, res) {
      try {
        let sessions = await Session.find().populate('professor');
        return res.status(200).send(sessions);
      } catch (err) {
        return res.status(500).send(err);
      }
    },
    async getSession(req, res) {
      try {
        let session = await Session.findOne({ _id: req.params.id }).populate('professor');
        if (!session) {
          return res.sendStatus(404);
        }
        return res.status(200).send(session);
      } catch (err) {
        if (err.name == 'CastError') {
          return res.sendStatus(404);
        } else {
          return res.status(500).send(err);
        }
      }
    },
    async createSession(req, res) {
      if (!req.decoded.role || (req.decoded.role != "administrator")) {
        return res.sendStatus(401);
      }
      try {
        let professor = await User.findOne({ _id: req.body.session.professor, role: `professor`});
        if (professor){
          let newSession = new Session({
            name: req.body.session.name,
            professor: req.body.session.professor
          });
          try {
            await newSession.save();
            return res.status(201).send(newSession);
          } catch (err) {
            return res.status(400).send(err);
          }
        }else{
          return res.sendStatus(400).send(`Professor not found`);
        }
      }catch(error){
        return res.sendStatus(500).send(error)
      }

    },
    async updateSession(req, res) {
      if (!req.decoded.role || (req.decoded.role == "student")) {
        return res.sendStatus(401);
      }
      let update = req.body.session;
      try {
        await Session.findOneAndUpdate({ _id: req.params.id }, update);
        return res.status(200).send('updated');
      } catch (err) {
        if (err.code == 11000) {
          return res.status(500).send(err);
        } else if (err.name == 'CastError') {
          return res.status(404).send(err);
        } else {
          return res.status(500);
        }
      }
    },
    async deleteSession(req, res) {
      if (!req.decoded.role || (req.decoded.role != "administrator")) {
        return res.sendStatus(401);
      }
      try {
        let deleted = await Session.findOneAndDelete({ _id: req.params.id });
        if (deleted) {
          return res.status(200).send(deleted);
        } else {
          return res.sendStatus(404);
        }
      } catch (err) {
        if (err.name == 'CastError') {
          return res.sendStatus(404);
        } else {
          return res.status(500);
        }
      }
    }
  }
};
