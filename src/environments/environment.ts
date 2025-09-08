export const environment = {
    production: true,
    apiUrl: '/api',              // utilisera le proxy Vercel (HTTPS → HTTP VPS) (vercel force le https mais n'ayant pas de nom de domaine en back, il est en http)
    enableLogging: false,
    version: '1.0.0'
};