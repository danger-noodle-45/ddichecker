import Rx from '../models/rxModel.js';


const rxController = {};

rxController.getRx = async (req, res, next) => {
  try {
    let { rx } = res.locals;
    if (rx === undefined) rx = req.body.rx;
    const foundRxs = [];
    for (let i = 0; i < rx.length; i++) {
      const result = await Rx.findOne({ name: rx[i] }).exec()
      if (!result) {
        throw "Rx does not exist.";
      }
      foundRxs.push(result);
    }
    res.locals.rxs = foundRxs;
    return next();
  } catch (err) {
    return next({ err })
  }
}

rxController.findInteractions = (req, res, next) => {
  const foundRxs = res.locals.rxs;
  const { otc } = req.body;
  const interactions = foundRxs.filter( rx => {
    const otcs = rx.otcInteractions.map( i => i.name);
    return otcs.includes(otc);
  })
  res.locals.interactions = interactions;
  return next();
}


export default rxController;