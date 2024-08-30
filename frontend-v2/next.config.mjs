/** @type {import('next').NextConfig} */
import { createRequire  } from 'module';
const require = createRequire(import.meta.url);

const withNextIntl = require('next-intl/plugin')();
 
export default withNextIntl({
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            }
        ]
    }
});