$(() => {

  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  console.log(url);
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


   places_url = 'http://' + window.location.hostname + ':5001/api/v1/places_search'
   $.ajax({
      type: 'POST',
      url: places_url,
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (places) {
        places.forEach(place => {
          const s = (place.max_guest !== 1) ? 's' : '';
          const s2 = (place.number_rooms !== 1) ? 's' : '';
          const s3 = (place.number_bathrooms !== 1) ? 's' : '';
          const html = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${s}</div>
            <div class="number_rooms">${place.number_rooms}
              Bedroom${s2}</div>
            <div class="number_bathrooms">${place.number_bathrooms}
              Bathroom${s3}</div>
          </div>
          <div class="user">
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
           $('.places').append(html);
        });
      }
    });

$('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: places_url,
      data: JSON.stringify({'amenities': Object.keys(Amenities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
  });

});
