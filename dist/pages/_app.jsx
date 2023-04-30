"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const trpc_1 = require("../utils/trpc");
require("../styles/globals.css");
const next_themes_1 = require("next-themes");
const MyApp = ({ Component, pageProps: { session, ...pageProps }, }) => {
    return (<next_themes_1.ThemeProvider defaultTheme="light">
      <react_1.SessionProvider session={session}>
        <Component {...pageProps}/>
      </react_1.SessionProvider>
    </next_themes_1.ThemeProvider>);
};
exports.default = trpc_1.trpc.withTRPC(MyApp);
