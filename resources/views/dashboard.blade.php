@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    You are logged in!
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" method="post" action="/music-album">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add music albom</legend>

                            <!-- Text input-->
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="m">Album</label>
                                <div class="col-md-4">
                                    <input id="name" name="name" placeholder="album name" class="form-control input-md" required="" type="text">

                                </div>
                            </div>
                                  {{ csrf_field() }}
                            <!-- File Button -->
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="cover">Album Cover</label>
                                <div class="col-md-4">
                                    <input id="cover" name="cover" class="input-file" type="file">
                                </div>
                            </div>
                            <!-- Button -->
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="submit">Create</label>
                                <div class="col-md-4">
                                    <button id="submit" name="submit" class="btn btn-primary">Save</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
