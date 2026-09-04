module.exports = {
  apps: [
    {
      name: "shaydha-backend",
      script: "./dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "450M", // optimized for AWS t2.micro 1GB RAM
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
