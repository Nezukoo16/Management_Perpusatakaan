<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin Sistem',
                'nim' => 2301010001,
                'jurusan' => 'Teknik Informatika',
                'status' => true,
                'role' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Budi Santoso',
                'nim' => 2301010002,
                'jurusan' => 'Sistem Informasi',
                'status' => true,
                'role' => 'member',
                'email' => 'budi@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Siti Aisyah',
                'nim' => 2301010003,
                'jurusan' => 'Teknik Komputer',
                'status' => true,
                'role' => 'member',
                'email' => 'siti@example.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
