// Option 2 - jQuery Smooth Scrolling
$('.pic').on('click', (event) => {
  event.preventDefault();
  const hash = '#' + event.target.className.split(" ")[1]
  $('html, body')
    .animate({
      scrollTop: $(hash).offset().top - 250
    }, 700);

});

$('.test').hide()

$('.pic').on('mouseover', e => {
  $('').slideDown()
})


$('.pic').on('mouseleave', e => {
  $('.minibio').slideUp()
})



window.addEventListener('scroll', (e) => {

  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementsByTagName("header")[0].setAttribute('style', 'padding: 30px 10px')

    console.log(document.getElementsByTagName("header")[0].style);

    // document.getElementById("logo").style.fontSize = "25px";

  }
  // } else {
  //   document.getElementsByTagName("header").style.padding = "80px 10px";
  //   document.getElementById("logo").style.fontSize = "35px";
  // }
});
