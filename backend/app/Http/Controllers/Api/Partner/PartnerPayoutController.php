<?php

namespace App\Http\Controllers\Api\Partner;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Payout;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PartnerPayoutController extends Controller
{
    private function getPartnerId(): int
    {
        return auth()->user()->partner->id;
    }

    public function index(Request $request)
    {
        $payouts = Payout::where('partner_id', $this->getPartnerId())
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return ApiResponse::paginated($payouts);
    }

    public function requestPayout(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:50000',
            'notes' => 'nullable|string|max:500',
        ]);

        $partner = auth()->user()->partner;

        if (!$partner->bank_name || !$partner->bank_account_number) {
            return ApiResponse::error('Please complete your bank account information first.');
        }

        // Check for pending payouts
        $pendingPayout = Payout::where('partner_id', $partner->id)
            ->where('status', 'pending')
            ->exists();

        if ($pendingPayout) {
            return ApiResponse::error('You have a pending payout request. Please wait for it to be processed.');
        }

        // Calculate commission (stub - get from settings)
        $commissionPercentage = 10; // Default 10%
        $commissionAmount = $validated['amount'] * ($commissionPercentage / 100);
        $netAmount = $validated['amount'] - $commissionAmount;

        $payout = Payout::create([
            'payout_code' => 'PO-' . strtoupper(Str::random(8)),
            'partner_id' => $partner->id,
            'amount' => $validated['amount'],
            'commission_amount' => $commissionAmount,
            'net_amount' => $netAmount,
            'status' => 'pending',
            'bank_name' => $partner->bank_name,
            'bank_account_number' => $partner->bank_account_number,
            'bank_account_name' => $partner->bank_account_name,
            'notes' => $validated['notes'] ?? null,
        ]);

        return ApiResponse::success($payout, 'Payout request submitted.', 201);
    }
}
