$(() => {
  const Amenities = {};
  $('div.amenities li input').change(function () {
    if ($(this).is(':checked')) {
      Amenities[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      delete Amenities[($(this).attr('data-id'))];
    }
    $('div.amenities h4').html(Object.values(Amenities).join(', ') || '&nbsp;');
  });
});
