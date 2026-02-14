
$ErrorActionPreference = 'Stop'
$DestDir = 'C:\ATLAS_ROOT\DEV\Apps\bryantplymptonmusic\public\images'
$LocalImage = 'C:\ATLAS_ROOT\VAULT\Music\_assets\bryant.jpg'

if (-not (Test-Path $DestDir)) { New-Item -ItemType Directory -Path $DestDir | Out-Null }

if (Test-Path $LocalImage) {
    Copy-Item -Path $LocalImage -Destination ($DestDir + '\hero.jpg') -Force
    Write-Host 'Local image copied as hero.jpg'
} else {
    Write-Warning 'Local image not found.'
}

# Download HTML to find images
$Url = 'https://www.bryantplympton.com'
$Html = Invoke-WebRequest -Uri $Url -UseBasicParsing

# Simple scraping
$Count = 1
foreach ($Img in $Html.Images) {
    $ImgSrc = $Img.src
    if ($ImgSrc -match '^http') {
        $FileName = 'image_' + $Count + '.jpg'
        $SavePath = Join-Path $DestDir $FileName
        try {
            Invoke-WebRequest -Uri $ImgSrc -OutFile $SavePath
            Write-Host ('Downloaded: ' + $ImgSrc)
            $Count = $Count + 1
        } catch {
            Write-Warning ('Failed to download: ' + $ImgSrc)
        }
    }
}

