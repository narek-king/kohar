@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">

                    <table class="table table-bordered table-striped table-hover table-condensed table-responsive">
                        <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                ALBUM NAME
                            </th>
                            <th>
                                COVER IMAGE
                            </th>
                            <th>
                                LINKS
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                      {{--@foreach ($list as $listItem )--}}
                        <tr>
                            <td>
                                {{$list->id}}
                            </td>
                            <td>
                                 {{$list->name}}
                            </td>
                            <td>
                                <img width="20" src=http://{{ request()->getHttpHost() }}/{{$list->cover}}>
                            </td>
                            <td>
                                 {{$list->id}}
                            </td>
                        </tr>
                     {{--@endforeach--}}
                        </tbody>
                    </table>

                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" method="post" action="/music" enctype="multipart/form-data">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add music albom</legend>

                            <!-- Text input-->
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="m">track</label>
                                <div class="col-md-4">
                                    <input id="name" name="track" value="" class="form-control input-md" required="" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="m">link</label>
                                <div class="col-md-4">
                                    <input id="name" name="link" value="" class="form-control input-md" required="" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="m">Album id</label>
                                <div class="col-md-4">
                                    <input id="name" name="album_id" value="" class="form-control input-md" required="" type="text">
                                </div>
                            </div>


                                  {{ csrf_field() }}
                                 {{--{{ method_field('POST') }}--}}

                            <!-- File Button -->
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="cover">Lyrics am</label>
                                <div class="col-md-4">
                                    <input id="cover" name="lyrics_am" class="input-file" type="file">

                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="cover">en</label>
                                <div class="col-md-4">
                                    <input id="cover" name="lyrics_en" class="input-file" type="file">

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
{{--<img width="100" src=http://{{ request()->getHttpHost() }}/{{$list->cover}}>--}}