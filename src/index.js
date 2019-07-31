"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongodb_1 = __importDefault(require("mongodb"));
var MongoClient = mongodb_1["default"].MongoClient;
var MongoDbBuilder = /** @class */ (function () {
    function MongoDbBuilder(_a) {
        var bdName = _a.bdName, user = _a.user, password = _a.password, authMechanism = _a.authMechanism, ip = _a.ip, port = _a.port;
        this.bdName = encodeURIComponent(bdName);
        user = encodeURIComponent(user);
        password = encodeURIComponent(password);
        var url = "mongodb://" + user + ":" + password + "@" + ip + ":" + port + "/?authMechanism=" + authMechanism;
        this.client = new MongoClient(url, { useNewUrlParser: true });
        this.db = this.build();
    }
    MongoDbBuilder.prototype.build = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.connect(function (err) {
                if (err) {
                    reject("error connection db");
                    return;
                }
                resolve(_this.client.db(_this.bdName));
            });
        });
    };
    return MongoDbBuilder;
}());
exports.MongoDbBuilder = MongoDbBuilder;
var MongoDbFacade = /** @class */ (function () {
    function MongoDbFacade(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
        this.collection = this.build();
    }
    MongoDbFacade.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db];
                    case 1:
                        db = _a.sent();
                        return [2 /*return*/, db.collection(this.collectionName)];
                }
            });
        });
    };
    MongoDbFacade.prototype.get = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.find(filter).toArray()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDbFacade.prototype.set = function (objArr) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.insertMany(objArr)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDbFacade.prototype.update = function (filter, update) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.updateMany(filter, update)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDbFacade.prototype.rm = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.deleteMany(filter)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MongoDbFacade;
}());
exports.MongoDbFacade = MongoDbFacade;
