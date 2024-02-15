const database = require("../common/mysql");

const sliderImage = function (_sliderImage) {};

sliderImage.getAll = function (callback) {
  const sql = "select * from SliderImage order by `Order` asc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    callback(result);
  });
};

sliderImage.update = function (lstSliderImageDto, callback) {
  // Xoá hết ảnh slider và thêm các ảnh mới
  const sqlDelete = "delete from SliderImage";
  database.query(sqlDelete, [], function (err, resultUpdate) {
    if (err) {
      callback([]);
      return;
    }
    const sqlUpdate = "insert into SliderImage(ImagePath, `Order`) values ?";
    database.query(
      sqlUpdate,
      [lstSliderImageDto.map((imagePath, index) => [imagePath, index + 1])],
      function (err, resultUpdate) {
        if (err) {
          callback([]);
          return;
        }
        callback(resultUpdate);
      }
    );
  });
};

module.exports = sliderImage;