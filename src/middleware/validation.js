const { body, validationResult } = require('express-validator');

/**
 * Validate user registration input
 */
exports.validateRegister = [
  body('name').notEmpty().withMessage('يرجى تقديم اسم'),
  body('email').isEmail().withMessage('يرجى تقديم بريد إلكتروني صالح'),
  body('password').isLength({ min: 6 }).withMessage('يجب أن تكون كلمة المرور 6 أحرف على الأقل'),
  body('age').isInt({ min: 18 }).withMessage('يجب أن يكون عمرك 18 عامًا على الأقل'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('الجنس يجب أن يكون ذكر، أنثى، أو آخر'),
  body('country').notEmpty().withMessage('يرجى تحديد بلدك'),
  body('ethnicity').notEmpty().withMessage('يرجى تحديد عرقك'),
  body('hobbies').isArray({ min: 1 }).withMessage('يرجى تقديم هواية واحدة على الأقل'),
  body('activities').isArray({ min: 1 }).withMessage('يرجى تقديم نشاط واحد على الأقل')
];

/**
 * Validate login input
 */
exports.validateLogin = [
  body('email').isEmail().withMessage('يرجى تقديم بريد إلكتروني صالح'),
  body('password').notEmpty().withMessage('يرجى تقديم كلمة المرور')
];

/**
 * Validate create match input
 */
exports.validateMatch = [
  body('targetUserId').notEmpty().withMessage('يرجى تحديد المستخدم الهدف')
];

/**
 * Validate create chat input
 */
exports.validateChat = [
  body('targetUserId').notEmpty().withMessage('يرجى تحديد المستخدم الهدف')
];

/**
 * Validate send message input
 */
exports.validateMessage = [
  body('content').notEmpty().withMessage('لا يمكن إرسال رسالة فارغة')
];

/**
 * Validate report input
 */
exports.validateReport = [
  body('offenderId').notEmpty().withMessage('يرجى تحديد المستخدم المسيء'),
  body('reason').notEmpty().withMessage('يرجى تقديم سبب البلاغ')
];

/**
 * Validator middleware
 */
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(error => error.msg)
    });
  }
  next();
};