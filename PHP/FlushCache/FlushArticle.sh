#!/bin/bash

redis-cli keys "newsinfo*" | xargs redis-cli del
