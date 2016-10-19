<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(UsersTableSeeder::class);
         $this->call(Music_albumSeeder::class);
         $this->call(MusicSeeder::class);
         $this->call(NewSeeder::class);
         $this->call(Photo_albumSeeder::class);
         $this->call(PhotoSeeder::class);
         $this->call(VideoSeeder::class);
         $this->call(ConcertSeeder::class);



    }
}
