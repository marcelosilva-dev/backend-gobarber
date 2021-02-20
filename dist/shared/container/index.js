"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _NotificatiionsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificatiionsRepository"));

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokenRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokenRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokenRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificatiionsRepository.default);