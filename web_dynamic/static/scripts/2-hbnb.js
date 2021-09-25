$(() => {

  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const Amenities = {};
  $('div.amenities li input').change( function () {
      if ($(this).is(':checked')) {
        Amenities[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete Amenities[($(this).attr('data-id'))];
      }
      $('div.amenities h4').html(Object.values(Amenities).join(', ') || '&nbsp;');
    });
});
