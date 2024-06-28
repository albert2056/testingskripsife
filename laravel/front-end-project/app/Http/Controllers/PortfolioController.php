<?php

namespace App\Http\Controllers;

use App\Models\PortfolioRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PortfolioController extends Controller
{
    public function showPortfolioPage() {
        $url = "http://localhost:8080/api/portfolio/findAll";

        $response = Http::get($url);
        $responseData = $response->json();
        return view('portfolio', ['portfolios'=>$responseData]);
    }
    
    public function showPortfolioAdminPage() {
        $url = "http://localhost:8080/api/portfolio/findAll";

        $response = Http::get($url);
        $responseData = $response->json();
        return view('portfolioAdmin', ['portfolios'=>$responseData]);
    }

    public function createPortfolio(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $image = $request->file('image');
        $imagePath = $image->getPathname();
        $imageBase64 = base64_encode(file_get_contents($imagePath));
    
        $portfolioRequest = new PortfolioRequest();
        $portfolioRequest->name = $request['name'];
        $portfolioRequest->eventDate = $request['eventDate'];
        $portfolioRequest->image = $imageBase64;
        $portfolioRequest->gownName = $request['gownName'];
        $portfolioRequest->venue = $request['venue'];
        $portfolioRequest->wo = $request['wo'];
    
        Http::post('http://localhost:8080/api/portfolio/create', $portfolioRequest->toArray());

        return redirect('/portfolioadmin');
    }

    public function deletePortfolio(Request $request) {
        $portfolioId = $request->input('id');
        
        Http::delete("http://localhost:8080/api/portfolio/delete?id={$portfolioId}");
        
        return redirect()->back();
        
    }

    public function showUpdatePortfolioPage(Request $request) {
        $portfolioId = $request->input('id');
        $url = "http://localhost:8080/api/portfolio/findById?id=$portfolioId";
        $response = Http::get($url);

        $outfitUrl = "http://localhost:8080/api/outfit/findAll";
        $outfitResponse = Http::get($outfitUrl);

        $portfolio = $response->json();
        $outfitResponseData = $outfitResponse->json();
        return view('portfolioUpdateForm', [
            'portfolio' => $portfolio,
            'outfits' => $outfitResponseData
        ]);
        
    }

    public function updatePortfolio(Request $request, $portfolioId) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $image = $request->file('image');
        $imagePath = $image->getPathname();
        $imageBase64 = base64_encode(file_get_contents($imagePath));
    
        $portfolioRequest = new PortfolioRequest();
        $portfolioRequest->name = $request['name'];
        $portfolioRequest->eventDate = $request['eventDate'];
        $portfolioRequest->image = $imageBase64;
        $portfolioRequest->gownName = $request['gownName'];
        $portfolioRequest->venue = $request['venue'];
        $portfolioRequest->wo = $request['wo'];
        
        Http::post("http://localhost:8080/api/portfolio/update?id={$portfolioId}", $portfolioRequest->toArray());
        
        return redirect('/portfolioadmin');

    }

    public function createPortfolioPage() {
        $url = "http://localhost:8080/api/outfit/findAll";
        $response = Http::get($url);
        $responseData = $response->json();

        return view('portfolioCreateForm', ['outfits'=>$responseData]);
    }

    public function showPortfolioDetailPage($id) {
        $url = "http://localhost:8080/api/portfolio/findById?id=$id";

        $response = Http::get($url);
        $responseData = $response->json();

        return view('portfolioDetail', ['portfolio'=>$responseData]);
    }

}
