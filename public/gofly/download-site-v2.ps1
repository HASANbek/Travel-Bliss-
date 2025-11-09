$startUrl = 'https://demo.egenslab.com/html/gofly/preview/travel-agency-03.html'
$baseUrl = 'https://demo.egenslab.com/html/gofly/preview/'
$outputDir = 'C:\Users\ANUBIS PC\gofly-website'

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "GoFly Website Downloader v2" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

# Download main HTML
Write-Host '[1/4] Downloading main HTML...' -ForegroundColor Green
try {
    $html = Invoke-WebRequest -Uri $startUrl -UseBasicParsing
    $htmlContent = $html.Content
    $htmlContent | Out-File -FilePath "$outputDir\index.html" -Encoding UTF8
    Write-Host "  OK: index.html" -ForegroundColor Cyan
} catch {
    Write-Host "  ERROR: Failed to download HTML - $_" -ForegroundColor Red
    exit
}

# Extract and download CSS files
Write-Host "`n[2/4] Downloading CSS files..." -ForegroundColor Green
$cssLinks = [regex]::Matches($htmlContent, 'href="(assets/css/[^"]+\.css[^"]*)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$cssCount = 0
foreach ($css in $cssLinks) {
    $cssUrl = $baseUrl + $css
    $cssFullPath = Join-Path $outputDir $css
    $cssDir = Split-Path $cssFullPath -Parent

    if (![string]::IsNullOrEmpty($cssDir)) {
        New-Item -ItemType Directory -Force -Path $cssDir | Out-Null
    }

    try {
        Invoke-WebRequest -Uri $cssUrl -OutFile $cssFullPath -UseBasicParsing
        $cssCount++
        Write-Host "  OK: $css" -ForegroundColor Cyan
    } catch {
        Write-Host "  FAIL: $css" -ForegroundColor Yellow
    }
}

# Extract and download JS files
Write-Host "`n[3/4] Downloading JavaScript files..." -ForegroundColor Green
$jsLinks = [regex]::Matches($htmlContent, 'src="(assets/js/[^"]+\.js[^"]*)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$jsCount = 0
foreach ($js in $jsLinks) {
    $jsUrl = $baseUrl + $js
    $jsFullPath = Join-Path $outputDir $js
    $jsDir = Split-Path $jsFullPath -Parent

    if (![string]::IsNullOrEmpty($jsDir)) {
        New-Item -ItemType Directory -Force -Path $jsDir | Out-Null
    }

    try {
        Invoke-WebRequest -Uri $jsUrl -OutFile $jsFullPath -UseBasicParsing
        $jsCount++
        Write-Host "  OK: $js" -ForegroundColor Cyan
    } catch {
        Write-Host "  FAIL: $js" -ForegroundColor Yellow
    }
}

# Extract and download images
Write-Host "`n[4/4] Downloading images and fonts..." -ForegroundColor Green
$imgLinks = [regex]::Matches($htmlContent, 'src="(assets/img/[^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$imgLinks += [regex]::Matches($htmlContent, 'href="(assets/img/[^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$imgCount = 0

foreach ($img in $imgLinks) {
    if ($img -match '^data:') { continue }

    $imgUrl = $baseUrl + $img
    $imgFullPath = Join-Path $outputDir $img
    $imgDir = Split-Path $imgFullPath -Parent

    if (![string]::IsNullOrEmpty($imgDir)) {
        New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
    }

    try {
        Invoke-WebRequest -Uri $imgUrl -OutFile $imgFullPath -UseBasicParsing
        $imgCount++
        Write-Host "  OK: $img" -ForegroundColor Cyan
    } catch {
        Write-Host "  SKIP: $img" -ForegroundColor DarkGray
    }
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Download Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "HTML: 1 file" -ForegroundColor Cyan
Write-Host "CSS: $cssCount files" -ForegroundColor Cyan
Write-Host "JavaScript: $jsCount files" -ForegroundColor Cyan
Write-Host "Images/Assets: $imgCount files" -ForegroundColor Cyan
Write-Host "`nLocation: $outputDir" -ForegroundColor White
Write-Host "Open: $outputDir\index.html" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Green
