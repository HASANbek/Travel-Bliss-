$baseUrl = 'https://demo.egenslab.com'
$startUrl = 'https://demo.egenslab.com/html/gofly/preview/travel-agency-03.html'
$outputDir = 'C:\Users\ANUBIS PC\gofly-website'

# Download main HTML
Write-Host 'Downloading main HTML...' -ForegroundColor Green
$html = Invoke-WebRequest -Uri $startUrl -UseBasicParsing
$html.Content | Out-File -FilePath "$outputDir\travel-agency-03.html" -Encoding UTF8
Write-Host "Saved: travel-agency-03.html" -ForegroundColor Cyan

# Extract and download CSS files
Write-Host "`nExtracting and downloading CSS files..." -ForegroundColor Green
$cssLinks = [regex]::Matches($html.Content, 'href="([^"]*\.css[^"]*)"') | ForEach-Object { $_.Groups[1].Value }
$cssCount = 0
foreach ($css in $cssLinks) {
    if ($css -match '^http') {
        $cssUrl = $css
    } elseif ($css -match '^//') {
        $cssUrl = 'https:' + $css
    } else {
        $cssUrl = $baseUrl + '/' + $css.TrimStart('/')
    }

    $cssPath = $css -replace '^https?://[^/]+/', '' -replace '\.\.\/',''
    $cssFullPath = Join-Path $outputDir $cssPath
    $cssDir = Split-Path $cssFullPath -Parent

    if (![string]::IsNullOrEmpty($cssDir)) {
        New-Item -ItemType Directory -Force -Path $cssDir | Out-Null
    }

    Write-Host "  Downloading: $cssUrl" -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $cssUrl -OutFile $cssFullPath -UseBasicParsing
        $cssCount++
        Write-Host "  Saved: $cssPath" -ForegroundColor Cyan
    } catch {
        Write-Host "  Failed: $cssUrl - $_" -ForegroundColor Red
    }
}

# Extract and download JS files
Write-Host "`nExtracting and downloading JS files..." -ForegroundColor Green
$jsLinks = [regex]::Matches($html.Content, 'src="([^"]*\.js[^"]*)"') | ForEach-Object { $_.Groups[1].Value }
$jsCount = 0
foreach ($js in $jsLinks) {
    if ($js -match '^http') {
        $jsUrl = $js
    } elseif ($js -match '^//') {
        $jsUrl = 'https:' + $js
    } else {
        $jsUrl = $baseUrl + '/' + $js.TrimStart('/')
    }

    $jsPath = $js -replace '^https?://[^/]+/', '' -replace '\.\.\/',''
    $jsFullPath = Join-Path $outputDir $jsPath
    $jsDir = Split-Path $jsFullPath -Parent

    if (![string]::IsNullOrEmpty($jsDir)) {
        New-Item -ItemType Directory -Force -Path $jsDir | Out-Null
    }

    Write-Host "  Downloading: $jsUrl" -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $jsUrl -OutFile $jsFullPath -UseBasicParsing
        $jsCount++
        Write-Host "  Saved: $jsPath" -ForegroundColor Cyan
    } catch {
        Write-Host "  Failed: $jsUrl - $_" -ForegroundColor Red
    }
}

# Extract and download images
Write-Host "`nExtracting and downloading images..." -ForegroundColor Green
$imgLinks = [regex]::Matches($html.Content, 'src="([^"]*\.(jpg|jpeg|png|gif|svg|webp|ico)[^"]*)"') | ForEach-Object { $_.Groups[1].Value }
$imgCount = 0
foreach ($img in $imgLinks) {
    if ($img -match '^http') {
        $imgUrl = $img
    } elseif ($img -match '^//') {
        $imgUrl = 'https:' + $img
    } elseif ($img -match '^data:') {
        continue
    } else {
        $imgUrl = $baseUrl + '/' + $img.TrimStart('/')
    }

    $imgPath = $img -replace '^https?://[^/]+/', '' -replace '\.\.\/',''
    $imgFullPath = Join-Path $outputDir $imgPath
    $imgDir = Split-Path $imgFullPath -Parent

    if (![string]::IsNullOrEmpty($imgDir)) {
        New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
    }

    Write-Host "  Downloading: $imgUrl" -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $imgUrl -OutFile $imgFullPath -UseBasicParsing
        $imgCount++
        Write-Host "  Saved: $imgPath" -ForegroundColor Cyan
    } catch {
        Write-Host "  Failed: $imgUrl - $_" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Download complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "CSS files downloaded: $cssCount" -ForegroundColor Cyan
Write-Host "JS files downloaded: $jsCount" -ForegroundColor Cyan
Write-Host "Images downloaded: $imgCount" -ForegroundColor Cyan
Write-Host "Location: $outputDir" -ForegroundColor Cyan
