# Specify the folder path
$folderPath = "build\\renderer"

# Specify the content you want to replace
$oldContent = '^(import.+[^.][^j][^s])";'

# Specify the new content you want to use as replacement
$newContent = '$1.js";'

# Get all files in the folder
$files = Get-ChildItem -Path $folderPath -File -Recurse

# Iterate through each file and apply the content replacement script
foreach ($file in $files) {
    # Read the content of the file
    $fileContent = Get-Content -Path $file.FullName

    # Replace the old content with the new content
    $newFileContent = $fileContent | ForEach-Object { $_ -replace $oldContent, $newContent }

    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $newFileContent
}
