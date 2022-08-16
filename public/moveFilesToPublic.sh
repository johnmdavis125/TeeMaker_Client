#!/bin/zsh
echo "initiating moveFilesToPublic script"
cd /Users/johndavis/Downloads
pwd

FILES_TO_MOVE=$(ls *png)
echo $FILES_TO_MOVE

mv *.png /Users/johndavis/softwareEngineering/myDev/TeeMaker/teemaker_client/public/exportedFiles

cd /Users/johndavis/softwareEngineering/myDev/TeeMaker/teemaker_client/public/exportedFiles
pwd
ls
