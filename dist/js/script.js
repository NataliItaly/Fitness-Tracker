$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 700,
    prevArrow: `<button type="button" class="carousel__button slick-prev"><img src="icons/arrow-prev.svg"></button>`,
    nextArrow: `<button type="button" class="carousel__button slick-next"><img src="icons/arrow-next.svg"></button>`,
    responsive: [
      {
        breakpoint: 972,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog__item-front")
          .eq(i)
          .toggleClass("catalog__item-front_active");
        $(".catalog__item-back").eq(i).toggleClass("catalog__item-back_active");
      });
    });
  }

  toggleSlide(".catalog__link-front");
  toggleSlide(".catalog__link-back");

  // open modal window
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation-modal").fadeIn("slow");
  });

  // close modal window
  $(".overlay__close").on("click", function () {
    $(".overlay").fadeOut("slow");
  });

  // open catalog button + take item title

  $(".catalog__button").each(function (i) {
    $(this).on("click", function () {
      $("#order-modal .overlay__subtitle").text(
        $(".catalog__item-title").eq(i).text()
      );
      $(".overlay, #order-modal").fadeIn("slow");
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
    });
  }

  validateForm("#consultation-form");
  validateForm("#application-form");
  validateForm("#order-form");

  $("input[name=phone]").mask("+1 (999) 999-99-99");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".scroll-top").fadeIn();
    } else {
      $(".scroll-top").fadeOut();
    }
  });

  $("a[href^='#first-screen']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation-form, #application-form, #order-form").fadeOut();
      $("overlay, #thanks-form").fadeIn();

      $("form").trigger("reset");
    });
    return false;
  });
});
