"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_server_auth_session_1 = require("../../server/common/get-server-auth-session");
const restricted = async (req, res) => {
    const session = await (0, get_server_auth_session_1.getServerAuthSession)({ req, res });
    if (session) {
        res.send({
            content: "This is protected content. You can access this content because you are signed in.",
        });
    }
    else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
exports.default = restricted;
