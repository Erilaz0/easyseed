"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreference = createPreference;
const mercadopago_1 = require("mercadopago");
function createPreference(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'APP_USR-6765663660045588-051715-ebbf3a82a23cab6ef06414561ef0652a-1816034763' });
            const getBody = req.body;
            const body = {
                items: getBody.map((item) => ({
                    title: item.title,
                    unit_price: item.price,
                    quantity: item.quantity,
                    currency_id: item.currency_id
                })),
                back_urls: {
                    success: "https://www.youtube.com/",
                    failure: "https://www.tiktok.com/",
                    pending: "https://www.facebook.com/"
                },
                auto_return: "approved",
            };
            const preference = new mercadopago_1.Preference(client);
            const result = yield preference.create({ body });
            const preferenceID = result.id;
            if (!getBody[0].title) {
                res.status(400).json({ error: "Enought data" });
            }
            else if (preferenceID) {
                res.status(200).json({ preferenceID: preferenceID });
            }
            else {
                res.status(400).json({ error: "Cannot create preference" });
            }
        }
        catch (error) {
            const e = error;
        }
    });
}
