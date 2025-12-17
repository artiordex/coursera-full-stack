function loadJSON(url, callback) {
  $.ajax({
    url,
    method: "GET",
    dataType: "json",
    success: callback,
    error: function (err) {
      console.error("AJAX 로드 실패:", url, err);
    }
  });
}