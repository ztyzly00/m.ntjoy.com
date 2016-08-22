#!/bin/bash

for((i=1;i<10000;i++))
do
    time php test.php &
done
