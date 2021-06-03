const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#FF5C33" },
      },
    })
  ),
};
