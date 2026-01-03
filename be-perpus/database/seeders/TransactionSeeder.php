<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('transactions')->insert([
            [
                'reservation_id' => 1,
                'borrow_date' => Carbon::now()->subDays(3)->toDateString(),
                'due_date' => Carbon::now()->addDays(4)->toDateString(),
                'return_date' => null,
                'status' => 'borrowed',

            ],
            [
                'reservation_id' => 2,
                'borrow_date' => Carbon::now()->subDays(10)->toDateString(),
                'due_date' => Carbon::now()->subDays(3)->toDateString(),
                'return_date' => Carbon::now()->subDays(2)->toDateString(),
                'status' => 'returned',

            ],
        ]);
    }
}
