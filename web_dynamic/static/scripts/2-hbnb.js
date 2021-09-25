  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, stat) {
    if (stat === 'success') {
      console.log(data);
      if (data.status === 'OK') {
       console.log("Good");
      }
      else {
      console.log("Bullshit");
     }
    }
});
