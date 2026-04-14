<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Faq;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    // Public - Banners
    public function banners()
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return ApiResponse::success($banners);
    }

    // Public - FAQs
    public function faqs()
    {
        $faqs = Faq::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return ApiResponse::success($faqs);
    }

    // Admin - Banners CRUD
    public function storeBanner(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image_path' => 'required|string|max:500',
            'link_url' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $banner = Banner::create($validated);

        return ApiResponse::success($banner, 'Banner created.', 201);
    }

    public function updateBanner(Request $request, int $banner)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'image_path' => 'sometimes|string|max:500',
            'link_url' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $bannerModel = Banner::find($banner);

        if (!$bannerModel) {
            return ApiResponse::error('Banner not found.', 404);
        }

        $bannerModel->update($validated);

        return ApiResponse::success($bannerModel->fresh(), 'Banner updated.');
    }

    public function destroyBanner(int $banner)
    {
        $bannerModel = Banner::find($banner);

        if (!$bannerModel) {
            return ApiResponse::error('Banner not found.', 404);
        }

        $bannerModel->delete();

        return ApiResponse::success(null, 'Banner deleted.');
    }

    // Admin - FAQs CRUD
    public function storeFaq(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $faq = Faq::create($validated);

        return ApiResponse::success($faq, 'FAQ created.', 201);
    }

    public function updateFaq(Request $request, int $faq)
    {
        $validated = $request->validate([
            'question' => 'sometimes|string|max:500',
            'answer' => 'sometimes|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $faqModel = Faq::find($faq);

        if (!$faqModel) {
            return ApiResponse::error('FAQ not found.', 404);
        }

        $faqModel->update($validated);

        return ApiResponse::success($faqModel->fresh(), 'FAQ updated.');
    }

    public function destroyFaq(int $faq)
    {
        $faqModel = Faq::find($faq);

        if (!$faqModel) {
            return ApiResponse::error('FAQ not found.', 404);
        }

        $faqModel->delete();

        return ApiResponse::success(null, 'FAQ deleted.');
    }
}
