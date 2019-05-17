export default function async(req, res, next) {
  let isDownForMaintenance = false;
  if (isDownForMaintenance) {
    res.render('maintenance');
  } else {
    next();
  }
};
