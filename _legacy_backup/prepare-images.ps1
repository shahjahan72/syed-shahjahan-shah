# Create WebP directory if it doesn't exist
$webpDir = Join-Path -Path $PSScriptRoot -ChildPath "images\webp"
New-Item -ItemType Directory -Force -Path $webpDir

# Move image files to images directory if they're not already there
Get-ChildItem -Path $PSScriptRoot -Include @("*.jpg","*.jpeg","*.png") -File | ForEach-Object {
    $destPath = Join-Path -Path $PSScriptRoot -ChildPath "images\$($_.Name)"
    if (-not (Test-Path $destPath)) {
        Move-Item -Path $_.FullName -Destination $destPath
    }
}

Write-Host "Images have been moved to the images directory. Please install a WebP converter tool like cwebp or use an online service to convert the images."
Write-Host "The following files need to be converted to WebP format:"
Get-ChildItem -Path (Join-Path -Path $PSScriptRoot -ChildPath "images") -Include @("*.jpg","*.jpeg","*.png") -File | ForEach-Object {
    Write-Host $_.Name
}