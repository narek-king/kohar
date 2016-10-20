<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="kohar" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="kohar" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="kohar" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="kohar" class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>My AngularJS App</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="bower_components/html5-boilerplate/dist/css/normalize.css">
  <link rel="stylesheet" href="bower_components/reset-css/reset.css">
  <link rel="stylesheet" href="bower_components/html5-boilerplate/dist/css/main.css">
  <link rel="stylesheet" href="bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />

  <link rel="stylesheet" href="app.css">
  <script src="bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body>
<div class="container">
  <header>
      <div class="row">
          <div class="col-md-12">
            <div class="logo">
              <a href="#"><img src="resources/img/logo.png" alt="Logo"></a>
            </div>
          </div>
      </div>
  </header>
  <div class="k_wrapper">

    <div class="row">
        <div id="k_sidebar" class="col-md-2">
          <aside>
            <nav>
              <ul class="list_entries">
                <li><a href="#!/music" class="active" title="Music">Music</a></li>
                <li><a href="#!/videos" title="Videos">Videos</a></li>
                <li><a href="#!/concerts" title="Concerts">concerts</a></li>
                <li><a href="#!/news" title="News">News</a></li>
                <li><a href="#!/photo" title="Photo">Photo</a></li>
              </ul>
            </nav>
          </aside>
        </div>
        <div id="k_content" class="col-md-10">

            <div ng-view></div>

          </div>
      <div>Angular seed app: v<span app-version></span></div>
    </div>

  </div><!--.k_wrapper-->
  <footer>

    <div class="row">
      <div class="col-md-12">
        <div class="logo">
          <h2><a href="#" title="Kohar">Kohar</a></h2>
        </div>
      </div>

    </div>
  </footer>
  </div>



  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

  <script type="text/javascript" src="bower_components/moment/min/moment.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>


  <!-- In production use:
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>
  -->
  <script src="bower_components/angular/angular.js"></script>
  <script src="bower_components/angular-route/angular-route.js"></script>
  <script src="app.js"></script>
  <script src="view1/view1.js"></script>
  <script src="view2/view2.js"></script>

  <script src="views/videos/videos.js"></script>
<script src="views/concerts/concerts.js"></script>
<script src="views/news/news.js"></script>
<script src="views/photo/photo.js"></script>
<script src="views/music/music.js"></script>
  <script src="components/version/version.js"></script>
  <script src="components/version/version-directive.js"></script>
  <script src="components/version/interpolate-filter.js"></script>

  <script src="resources/js/scripts.js"></script>
<script>
  $( document ).ready(function() {
    console.log( "ready!" );

    $('.zzz').css({
      'background': 'red'
    });

    $('.datetimepicker1').datetimepicker();

  });
</script>
</body>
</html>
