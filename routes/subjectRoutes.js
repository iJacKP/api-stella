const router = require('express').Router();
const semesterController = require('../controllers/subjectController');

router.get('/', semesterController.getAllSubjects);
router.post('/', semesterController.createSubjects);
// router.patch('/semester/:id/schedule', semesterController.updateSubjectSchedule);

module.exports = router;