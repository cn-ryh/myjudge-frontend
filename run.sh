#!/bin/sh

while [ 0 -eq 0 ]
do
    echo ".................. `date -u`  ..................."
    echo ".................. job begin  ..................."
    
    # ...... call your command here 在这里调用你的命令 ......
    echo "servering..."
    http-server /datadisk/myjudge-frontend/dist
    
    # check and retry   

    if [ $? -eq 0 ]; then
        echo ".................. `date -u`  ..................."
        echo "--------------- job complete ---------------"
        break;
    else
        echo ".................. `date -u`  ..................."
        echo "...............error occur, code $?, retry in 2 seconds .........."
        sleep 2
    fi
done