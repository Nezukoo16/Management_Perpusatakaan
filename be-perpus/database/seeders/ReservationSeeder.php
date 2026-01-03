<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reservations')->insert([
            [
                'user_id' => 1,
                'book_id' => 1,
                'reservation_date' => Carbon::now()->subDays(5)->toDateString(),
                'status' => 'waiting',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'book_id' => 2,
                'reservation_date' => Carbon::now()->subDays(10)->toDateString(),
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'book_id' => 3,
                'reservation_date' => Carbon::now()->subDays(2)->toDateString(),
                'status' => 'canceled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
