export default {
  include: ["./src/**/*"],
  compilerOptions: {
    module: "es2015",
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
}
