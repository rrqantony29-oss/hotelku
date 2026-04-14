<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\CommissionSetting;
use Illuminate\Http\Request;

class CommissionController extends Controller
{
    public function index()
    {
        $settings = CommissionSetting::where('is_active', true)->first();

        if (!$settings) {
            $settings = CommissionSetting::create([
                'name' => 'Default Commission',
                'commission_percentage' => 10.00,
                'is_active' => true,
            ]);
        }

        return ApiResponse::success($settings);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'commission_percentage' => 'required|numeric|min:0|max:100',
        ]);

        $settings = CommissionSetting::where('is_active', true)->first();

        if ($settings) {
            $settings->update($validated);
        } else {
            $settings = CommissionSetting::create([
                'name' => 'Default Commission',
                'commission_percentage' => $validated['commission_percentage'],
                'is_active' => true,
            ]);
        }

        return ApiResponse::success($settings->fresh(), 'Commission settings updated.');
    }
}
