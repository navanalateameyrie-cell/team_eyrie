import { buildConfig } from 'payload';
const config = buildConfig({
  admin: {
    components: {
      views: {
        Dashboard: {
          Component: '/some/path'
        }
      }
    }
  }
} as any);
console.log(config);
