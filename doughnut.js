

function renderChart(Ydata, Xlabels) {

var barColors = [
  "#b91d47",
  "#00aba9",
];

var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: Xlabels,
    datasets: [{
      backgroundColor: barColors,
      data: Ydata
    }]
  },
  options: {
    title: {
      display: true,
      text: "Hesap özeti"
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'rgb(255, 99, 132)'
    }
  }
  }
});
}




function getChartData() {
  
  $("#loadingMessage").html('<img src="./giphy.gif" alt="" srcset="" width="50" height="50">');
  
  $.ajax({
      url: "http://localhost:3000/chartdata",
      
      success: function (result) {
          $("#loadingMessage").html("");
          

          console.log(result.status);
          console.log(result.description);


          if (result.status == true) {

          
          console.log(Object.values(result.data));

          // Get all obj in data array
          var datas = [];
          datas = Object.values(result.data);

          // datax for saving values && labelx for labels name
          var datax = [];
          var labelx = [];
          datax[0] = 0;
          datax[1] = 0;
          

          for (key in datas) {
            console.log(key);

            if(result.data[key].label == "TL Toplam Bor\u00E7"){
              labelx[0] = "TL Toplam Bor\u00E7";
              datax[0] += result.data[key].value ;

            }
            else if(result.data[key].label == "TL Toplam Alacak"){
              labelx[1] = "TL Toplam Alacak";
              datax[1] += result.data[key].value;

            }
          }


          // drowing chart 
          renderChart(datax, labelx);


          // showing results
          $("#sonuc").show().html(labelx[0]+"  "+datax[0].toFixed(2)+"  "+  result.paraBirim+" <br><br> "+ labelx[1]+"  "+datax[1].toFixed(2) +" "+  result.paraBirim).css({"color": "#b91d47","font-family": "sans-serif", "font-size": "16px","padding":"2em 1em 0 1em","text-align":"left"});



          var bakiye=0;
          var borc=0;
          var alacak=0;
          
          //$("#sonuc").empty();
          
          for (key in datas) {

            //$("#sonuc").show().append(result.data[key].label+"  "+result.data[key].value+"  "+result.data[key].parabirim);
            
            if(result.data[key].label == "TL Toplam Bor\u00E7"){
              borc += result.data[key].value
            }
            else if(result.data[key].label == "TL Toplam Alacak"){
              alacak += result.data[key].value
            }

          }

          bakiye = alacak - borc ;

          //showing the rest
          $("#bakiye").html("Bu hesapın bakiyesi   "+ bakiye.toFixed(2) +" "+ result.paraBirim).css({"color": "#b91d47","font-family": "sans-serif", "font-size": "16px","padding":"1em 1em 1em 1em","text-align":"left"});


          // showing tahsilat ekle button
          if (bakiye > 0) {
            $(".button6").show();
          }

          console.log(result.data[0].value);
   

          // taking list array objects
          lists = Object.values(result.list);
          $(".collapse").empty();
          for (key in lists) {
            $(".collapse").append(result.list[key].label+" = "+result.list[key].value+"  "+result.list[key].paraBirim +"<br>");
          }

          /* Detay button */
          $(".button2").show();
          $(".button2").click(function() {
 
            $(".collapse").toggle("slow");
            
          });



          // if status false
        } else if (result.status == false) {
          $("#loadingMessage").html(result.description);
        }
          
      },

      // if file not exist or server not working
      error: function (err) {
          $("#loadingMessage").html("Error");
      }
  });
}



//////////////////////////// START //////////////////////////////

/*chart*/
$("#rd1").click(
  function () {
      getChartData();
  }
);


/*Tahsilat button */
$(".button6").click(function() {
  $('#rd3').prop('checked', true);
  //$(this).css("color","#F00");
});


/*İptal button */
$(".button3").click(function() {
  $('#rd1').prop('checked', true);
  $('#rd2').prop('checked', false);
  $('#rd3').prop('checked', false);
  $('#rd4').prop('checked', false);
  //$(this).css("color","#F00");
});



/*Tahsilat yap */
$('.nakit').hide();

$("select#odeme2").click(function(){
  
  var text = $(this).children("option:selected").val();

  if( text == "Nakit"){
    console.log("love");
    $('.nakit').hide();
    $('.kasa').show();
    $('.belge_no').show();
    $(':input#vade2').prop('required',false);
    $(':input#cek_no2').prop('required',false);
    $('.inputs#banka2').prop('required',false);

  }
  else if( text == "EFT"){
    $('.banka').show();
    $('.kasa').show();
    $('.belge_no').show();

    $('.vade').hide();
    $('.cekno').hide();
    $( '.banka' ).insertBefore( ".aciklama" );

    $(':input#vade2').prop('required',false);
    $(':input#cek_no2').prop('required',false);

  }
  else if( text == "ÇEK"){
    $('.kasa').hide();
    $('.belge_no').hide();
    $('.vade').show();
    $('.cekno').show();
    $('.banka').show();
    $( '.vade' ).insertBefore( '.tutar' );
    $( '.banka' ).insertBefore( '.aciklama' );
    $( '.cekno' ).insertBefore( '.banka' );
    
  };
});



/*odeme yap */
$('.nakit1').hide();

$("select#odeme3").click(function(){
  
  var text = $(this).children("option:selected").val();

  if( text == "Nakit"){
    console.log("love");
    $('.nakit1').hide();
    $('.kasa1').show();
    $('.belge_no1').show();
    $(':input#vade3').prop('required',false);
    $(':input#cek_no3').prop('required',false);
    $(':input#banka3').prop('required',false);

  }
  else if( text == "EFT"){
    $('.banka1').show();
    $('.kasa1').show();
    $('.belge_no1').show();

    $('.vade1').hide();
    $('.cekno1').hide();
    $( '.banka1' ).insertBefore( ".aciklama1" );

    $(':input#vade3').prop('required',false);
    $(':input#cek_no3').prop('required',false);

  }
  else if( text == "ÇEK"){
    $('.kasa1').hide();
    $('.belge_no1').hide();
    $('.vade1').show();
    $('.cekno1').show();
    $('.banka1').show();
    $( '.vade1' ).insertBefore( '.tutar1' );
    $( '.banka1' ).insertBefore( '.aciklama1' );
    $( '.cekno1' ).insertBefore( '.banka1' );
    
  };
});


/*islem gecmisi*/

$("#rd5").click(
  function () {
      
      $(".islemler").empty();
      $("#devamiGor").hide();
      
      console.log("gecmisi");
      $("#loadingMessage").html('<img src="./giphy.gif" alt="" srcset="" width="50" height="50">');
      
      $.ajax({
        url: "http://localhost:3000/islemGecmisi",
        success: function (result) {
            
            $("#loadingMessage").html("");
  
            console.log(result.status);
            console.log(result.description);
  
  
            if (result.status == true) {
  
            
            console.log(Object.values(result.model.data));
            var islem_data = [];
            
            // Get all objects from data array
            islem_data = Object.values(result.model.data);

            for (key in islem_data) {
              console.log(result.model.data[key].title);
              console.log(result.model.data[key].date);

            }
            
            // showing two piece
            var i = 0;
            while (i < 2) {

              $(".islemler").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+result.model.data[i].title+'</h3></div><div class="panel-body">'+result.model.data[i].date+'</div></div>');
              i++;
            }

            //$(".panel-title").html(result.model.data[key].title);
            //$(".panel-body").html(result.model.data[key].date);

            
            // $(".panel-title").html(labelx[0]+"  "+datax[0].toFixed(2)+"  "+  result.paraBirim+" <br><br> "+ labelx[1]+"  "+datax[1].toFixed(2) +" "+  result.paraBirim).css({"color": "#b91d47","font-family": "sans-serif", "font-size": "16px","padding":"2em 1em 0 1em","text-align":"left"});
  


            // showing additional two pieces or whatever
           $("#devamiGor").show();

           $("#devamiGor").click(
            function () {
              
              console.log(islem_data.length);
              

                for (var j = 0; j < 2; j++) {

                  if (i < islem_data.length) {

                  $(".islemler").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+result.model.data[i].title+'  '+i+'</h3></div><div class="panel-body">'+result.model.data[i].date+'</div></div>');
                  i++;
  
                }
     
              }
      
            });


            // status false 
          } else if (result.status == false) {
            $("#loadingMessage").html(result.description);
          }
            
        },
        // if file not exist or server not working
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
  }
);



/*notlar*/

$("#rd6").click(
  function () {
      
      $(".notlar").empty();
      //$("#devamiGor").hide();
      
      console.log("not");
      $("#loadingMessage").html('<img src="./giphy.gif" alt="" srcset="" width="50" height="50">');
      
      $.ajax({
        url: "http://localhost:3000/notlar",
        success: function (result) {
            
            $("#loadingMessage").html("");
  
            console.log(result.status);
            //console.log(result.description);
  
  
            if (result.status == true) {
  
            
            console.log(Object.values(result.data.data));


            var not_data = [];
            
            // Get all objects from data array
            not_data = Object.values(result.data.data);

            for (key in not_data) {
              console.log(result.data.data[key].text);
              console.log(result.data.data[key].date);

            }
            
            var i = 0;
            while (i < 2) {

              $(".notlar").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+result.data.data[i].text+'</h3></div><div class="panel-body">'+result.data.data[i].date+'</div></div>');
              i++;
            }


           //$("#devamiGor").show();
            /** 
           $("#devamiGor").click(
            function () {
              
              console.log(islem_data.length);
              

                for (var j = 0; j < 2; j++) {

                  if (i < islem_data.length) {

                  $(".islemler").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+result.model.data[i].title+'  '+i+'</h3></div><div class="panel-body">'+result.model.data[i].date+'</div></div>');
                  i++;
  
                }
     
              }
      
            });
            */

            // status false 
          } else if (result.status == false) {
            $("#loadingMessage").html(result.description);
          }
            
        },
        
        // if file not exist or server not working
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
  }
);



//tahsilat yap form

$(document).ready(function () {
  $("#receipt2").submit(function (event) {
    var formData = {
      odeme: $("#odeme2").val(),
      kasa: $("#kasa2").val(),
      tutar: $("#tutar2").val(),
      tutar_tur: $("#tutar_tur2").val(),
      tarih: $("#tarih2").val(),
      belge_no: $("#belge_no2").val(),
      aciklama: $("#aciklama2").val(),
      banka: $("#banka2").val(),
      cek_no: $("#cek_no2").val(),
      vade: $("#vade2").val(),
    };
    console.log(formData);
    console.log("formData");

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/tahsilatlar",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });
});



//odeme yap form

$(document).ready(function () {
  $("#receipt3").submit(function (event) {

    var formData = {
      odeme: $("#odeme3").val(),
      kasa: $("#kasa3").val(),
      tutar: $("#tutar3").val(),
      tutar_tur: $("#tutar_tur3").val(),
      tarih: $("#tarih3").val(),
      belge_no: $("#belge_no3").val(),
      aciklama: $("#aciklama3").val(),
      banka: $("#banka3").val(),
      cek_no: $("#cek_no3").val(),
      vade: $("#vade3").val(),
    };

    console.log(formData);
    console.log("formData");


    $.ajax({
      type: "POST",
      url: "http://localhost:3000/odemeler",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });
});



/** 
$(document).ready(function(){
  var contextroot = "/services/"
  $("#receipt6").submit(function(e){
      e.preventDefault();
      var form = $(this);
      var action = form.attr("action");
      var data = form.serializeArray();

      $.ajax({
                  url: "http://localhost:3000/odemeler",
                  dataType: 'json',
                  type: 'POST',
                  contentType: 'application/json',
                  data: JSON.stringify(getFormData(data)),
                  success: function(data){
                      console.log("DATA POSTED SUCCESSFULLY"+data);
                  },
                  error: function( jqXhr, textStatus, errorThrown ){
                      console.log( errorThrown );
                  }
      });
});
});

*/

