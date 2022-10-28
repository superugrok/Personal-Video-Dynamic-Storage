module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      owner: String,
      type: String,
      url: String,
    },
    { timestamps: true }
  );

  const Library = mongoose.model("library", schema);
  return Library;
};
