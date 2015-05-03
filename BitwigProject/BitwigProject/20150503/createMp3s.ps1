
# ./ ../../Resources/ffmpeg/bin/ffmpeg.exe
function Get-ScriptDirectory
{
  $Invocation = (Get-Variable MyInvocation -Scope 1).Value
  Split-Path $Invocation.MyCommand.Path
}
$directory = Get-ScriptDirectory
$fileDirectory = Get-ChildItem $directory\* -filter "*.wav"

write-host "Listing..." $directory

foreach($file in Get-ChildItem $fileDirectory)
{
	# Get-ScriptDirectory + $file.Name
	#write-host $file
	#$argInput = " -i " + $file 
	#$argOutput = "" + ($file | % {$_.BaseName})+ ".mp3"
	#write-host $file | % {$_.BaseName}
	#$allArgs = @($argInput, $arg2, $argOutput)
	#Write-host $allArgs
	#& "../../Resources/ffmpeg/bin/ffmpeg.exe", "-i", $file, "-codec:a", "libmp3lame", "-qscale:a", "2", 
	$outputFile = $file -replace ".wav$", ".mp3"
	#write-host $outputFile
	$program = "D:/Prog/Git/Harmonizer/Resources/ffmpeg/bin/ffmpeg.exe"
	$cmd = @("-i", $file, "-y", "-codec:a", "libmp3lame", "-qscale:a", "4", $outputFile)
	& $program $cmd
	#write-host $cmd
    #$file
}
#Read-Host 'Press Enter to continue...' | Out-Null