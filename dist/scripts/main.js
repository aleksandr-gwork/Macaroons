document.getElementById("burger").onclick = function () {
  document.getElementById("menu").classList.add("open");
};

document.querySelectorAll("#menu *").forEach((item) => {
  item.onclick = () => {
    document.getElementById("menu").classList.remove("open");
  };
});

let loader = $('.loader');

$('.choice__btn').click((e) => {
  $('#choice-input').val($(e.target).parents('.choice__item').find('.choice__item-title') .text().toUpperCase())
  $('.order')[0].scrollIntoView({ behavior: 'smooth' });
});

$('#order-btn').click(function () {
    let choice = $("#choice-input");
    let name = $("#name-input");
    let phone = $("#phone-input");
    let hasError = false;
    let form = $('#order-form');

    $('.error-input').hide();
    $('input').removeClass('error');

    if (!choice.val()) {
      choice.next().show();
      choice.addClass('error');
      hasError = true;
    }
    if (!name.val()) {
      name.next().show();
      name.addClass('error');
      hasError = true;
    }
    if (!phone.val()) {
      phone.next().show();
      phone.addClass('error');
      hasError = true;
    }

    if (!hasError) {
      loader.css('display', 'flex');
      $.ajax({
        method: "POST",
        url: "https://testologia.site/checkout",
        data: { product: choice.val(), name: name.val(), phone: phone.val() }
      })
        .done(function( msg ) {
          loader.hide();
          if (msg.success) {
            $('#order-block').hide();
            $('#order-success').css('display', 'flex');
            form[0].reset();
            setTimeout(() => {
              $('#order-block').show();
              $('#order-success').hide();
            }, 5000)
          } else {
            alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
            form[0].reset();
          }
        });
    }
});
