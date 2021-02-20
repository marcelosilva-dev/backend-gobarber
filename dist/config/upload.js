"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpFolder = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  tmpFolder,
  uploadsFolder: _path.default.resolve(tmpFolder, 'uploads'),
  driver: process.env.STORAGE_DRIVER,
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,

      filename(request, file, callback) {
        const filehash = _crypto.default.randomBytes(10).toString('hex');

        const fileName = `${filehash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarberpanambi'
    }
  }
};
exports.default = _default;