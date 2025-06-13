const router = require('express').Router();
const semesterController = require('../controllers/semesterController');

router.get('/:semester', semesterController.getBySemester);
router.post('/', semesterController.createSubjects);

module.exports = router;