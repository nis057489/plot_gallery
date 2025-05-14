#!/bin/bash
docker build -t plot-gallery .
docker run --name plot-gallery -p 3000:3000 -v $(pwd)/public/plots:/app/public/plots plot-gallery