const database = require("../common/mysql");

const schedule = function (_schedule) {};

schedule.getPage = function (request, callback) {
  if (request.DoctorId == undefined) {
    request.DoctorId = -1;
  }
  const sqlBody = `where Schedule.IsDeleted = 0 and (? = '' or Schedule.FullName like concat('%', ? ,'%')) and (? = -1 or Schedule.DoctorId = ?) `;
  const sqlPage =
    `select Schedule.Id, Schedule.FullName, Schedule.PhoneNumber, Schedule.Email, Schedule.Note, DATE_FORMAT(Schedule.MeetDate, "%d-%m-%Y") as MeetDate, Schedule.MeetTime, Doctor.Id as DoctorId, Doctor.Name as DoctorName ` +
    `from Schedule join Doctor on Schedule.DoctorId = Doctor.Id ` +
    sqlBody +
    `order by Schedule.Id desc ` +
    `limit ? offset ?`;
  const sqlCount =
    `select count(1) as total from Schedule join Doctor on Schedule.DoctorId = Doctor.Id ` +
    sqlBody;
  database.query(
    sqlPage,
    [
      request.KeySearch,
      request.KeySearch,
      request.DoctorId,
      request.DoctorId,
      request.Size,
      (request.Page - 1) * request.Size,
    ],
    function (err, resultPage) {
      if (err) {
        callback(err);
        return;
      }
      // Gọi truy vấn count
      database.query(
        sqlCount,
        [
          request.KeySearch,
          request.KeySearch,
          request.DoctorId,
          request.DoctorId,
        ],
        function (err, resultCount) {
          if (err) {
            callback(err);
            return;
          }
          callback({ TotalRecord: resultCount[0].total, Data: resultPage });
        }
      );
    }
  );
};

schedule.create = function (scheduleDto, callback) {
  const sql =
    "insert into Schedule(DoctorId, FullName, PhoneNumber, Email, MeetDate, MeetTime, Note) values (?, ?, ?, ?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?)";
  database.query(
    sql,
    [
      scheduleDto.DoctorId,
      scheduleDto.FullName,
      scheduleDto.PhoneNumber,
      scheduleDto.Email,
      scheduleDto.MeetDate,
      scheduleDto.MeetTime,
      scheduleDto.Note,
    ],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback({ Id: result.insertId });
    }
  );
};

schedule.delete = function (scheduleId, callback) {
  const sqlDelete = "Update Schedule set IsDeleted = 1 where Id = ?";
  database.query(sqlDelete, [scheduleId], function (err, resultUpdate) {
    if (err) {
      callback(err);
      return;
    }
    callback(resultUpdate);
  });
};

module.exports = schedule;
