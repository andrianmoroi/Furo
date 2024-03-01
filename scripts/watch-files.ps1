$folderToWatch = 'build\renderer'

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folderToWatch
$watcher.Filter = "*"
$watcher.IncludeSubdirectories = $false
$watcher.EnableRaisingEvents = $true

$action = {
    # Specify the content you want to replace
    $oldContent = '^(import.+[^.][^j][^s])";'

    # Specify the new content you want to use as replacement
    $newContent = '$1.js";'

    # Get all files in the folder
    $files = Get-ChildItem -Path $folderToWatch -File -Recurse

    # Iterate through each file and apply the content replacement script
    foreach ($file in $files) {

        # Read the content of the file
        $fileContent = Get-Content -Path $file.FullName

        if ($fileContent -match $oldContent) {
            $newFileContent = $fileContent | ForEach-Object { $_ -replace $oldContent, $newContent }

            Set-Content -Path $file.FullName -Value $newFileContent
        }
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action

Write-Host "Watching for changes in $folderToWatch. Press Ctrl+C to stop."
while ($true) {
    Wait-Event -Timeout 1
}

