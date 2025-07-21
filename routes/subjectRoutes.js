const router = require('express').Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.getAllSubjects);
router.post('/', subjectController.createSubjects);
router.put('/:subjectCode', subjectController.updateSubject);
router.delete('/:subjectCode', subjectController.deleteSubject);

module.exports = router;