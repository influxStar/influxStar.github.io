// $('.sidenav-button-collapse').sideNav({
//     closeOnClick: true,
//     draggable: true
// });

$(document).ready(function() {
    $(".pushpin-navbar").pushpin({
        top: $("#influxstar").offset().top + $("#influxstar").height()
    })
})