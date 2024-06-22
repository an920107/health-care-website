/** @type {import('next').NextConfig} */
import { createRequire  } from 'module';
const require = createRequire(import.meta.url);

const withNextIntl = require('next-intl/plugin')();
 
export default withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ]
    }
});