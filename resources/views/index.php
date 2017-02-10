<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="kohar" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="kohar" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="kohar" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="kohar" class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Kohar App</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/app/bower_components/reset-css/reset.css">
  <link rel="stylesheet" href="/app/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="/app/bower_components/angular-bootstrap/ui-bootstrap-csp.css">
  <link rel="stylesheet" type="text/css" href="/app/bower_components/angular-ui-grid/ui-grid.min.css">
  <!--<link rel="stylesheet" href="app/bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css">-->
  <link rel="stylesheet" href="/app/app.css">

</head>
<body>
    <div class="full_h">
        <div class="k_wrapper">
            <div class="k_layout">
                <div id="k_sidebar">
                  <aside>
                    <nav>
                      <ul class="list_entries">
                        <li ng-class="{active : activeMenu === 'music-albums'}"><a href="#!/music-albums" title="Music Albums" ng-click="activeMenu = 'music-albums'">Music Albums</a></li>
                        <li ng-class="{active : activeMenu === 'music'}"><a href="#!/music" title="Music" ng-click="activeMenu = 'music'">Music</a></li>
                        <li ng-class="{active : activeMenu === 'video'}"><a href="#!/video" title="Video" ng-click="activeMenu = 'video'">Video</a></li>
                        <li ng-class="{active : activeMenu === 'concerts'}"><a href="#!/concerts" title="Concerts" ng-click="activeMenu = 'concerts'">Concerts</a></li>
                        <li ng-class="{active : activeMenu === 'photo-album'}"><a href="#!/photo-album" title="Photo" ng-click="activeMenu = 'photo-album'">Photo Album</a></li>
                        <li ng-class="{active : activeMenu === 'photo'}"><a href="#!/photo" title="Photo" ng-click="activeMenu = 'photo'">Photo</a></li>
                        <li ng-class="{active : activeMenu === 'about'}"><a href="#!/about" title="About" ng-click="activeMenu = 'about'">About</a></li>
                      </ul>
                    </nav>
                  </aside>
                </div>
                <div id="k_content">
                        <div class="header">
                            <div class="header_inside">
                               <div class="logo">
                                 <a href="#"><img src="/app/resources/img/logo.png" alt="Logo"></a>
                               </div>
                             </div>
                        </div>
                    <div class="container-fluid">
                        <div ng-view></div>
                    </div>
                </div>
            </div>
            <div class="push"></div>
        </div><!--.k_wrapper-->
          <footer>
                <div class="footer_inside">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="logo">
                          <h2><a href="#" title="Kohar">Kohar</a></h2>
                        </div>
                      </div>
                    </div>
                </div>
          </footer>
    </div>
  <!-- In production use:
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>
  -->
  <script src="/app/bower_components/angular/angular.js"></script>
  <script src="/app/bower_components/angular-route/angular-route.js"></script>
  <script src="/app/bower_components/angular-animate/angular-animate.js"></script>
  <script src="/app/bower_components/angular-touch/angular-touch.js"></script>
  <script src="/app/bower_components/angular-ui-grid/ui-grid.min.js"></script>

    <script src="/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>

    <!--image upload plugin-->
  <script src="/app/bower_components/ng-file-upload-shim/ng-file-upload-shim.js"></script>
  <script src="/app/bower_components/ng-file-upload/ng-file-upload.js"></script>

  <script src="/app/app.js"></script>

  <script src="/app/views/music/music.js"></script>
  <script src="/app/views/music-albums/music-albums.js"></script>
    <script src="/app/views/video/video.js"></script>
    <script src="/app/views/concerts/concerts.js"></script>
    <script src="/app/views/photo/photo.js"></script>
    <script src="/app/views/photo-album/photo-album.js"></script>
    <script src="/app/views/about/about.js"></script>


  <script src="/app/components/version/version.js"></script>
  <script src="/app/components/version/version-directive.js"></script>
  <script src="/app/components/version/interpolate-filter.js"></script>

<!--include services-->
  <script src="/app/views/music/musicServices.js"></script>
  <script src="/app/views/music-albums/musicAlbumsServices.js"></script>
  <script src="/app/views/video/videoServices.js"></script>
  <script src="/app/views/photo-album/photoAlbumServices.js"></script>
  <script src="/app/views/photo/photoServices.js"></script>
  <script src="/app/views/concerts/concertsServices.js"></script>
  <script src="/app/views/about/aboutServices.js"></script>

<!--include config files -->
<script src="/app/components/config/constants.js"></script>

<!--include custom directive for modal window-->
  <script src="/app/components/filters/timeConverter.js"></script>

  <script src="/app/components/photo.js"></script>
    <script src="/app/components/previewImage.js"></script>


</body>
</html>
