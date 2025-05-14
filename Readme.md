# Plot Gallery Web Server

This project serves a web-based gallery for viewing PNG plot images. Any PNG images placed in the `public/plots/` directory will automatically appear in the gallery at [http://localhost:3000](http://localhost:3000).

## Features

- Automatically lists and displays all PNG images in `public/plots/`
- Live updates: new or updated images appear in the gallery without needing to refresh the page
- Simple, responsive web interface

## Setup

You can run this server either inside a container with Node.js installed, or by installing Node.js locally.

## Option 1 (Recommended) Building and Running the Dockerfile Locally

To build and run the Docker image locally (without publishing to Docker Hub):

You can run the convenience script `run_docker.sh` or run the following commands manually. Change out the left hand side of the path (`$(pwd)/public/plots`) to reflect your system. If you have any other services running on port `3000`, you can change the port.

```sh
./run_docker.sh
```

The previous script just runs these commands:

```sh
# Build the Docker image
docker build -t plot-gallery .

# Run the Docker container
docker run -p 3000:3000 -v $(pwd)/public/plots:/app/public/plots plot-gallery --name plot-gallery
```

This will start the server and mount your local `public/plots` directory into the container, so you can add images without rebuilding the image.

### Stopping the Docker Contianer

Run the convenience script `stop_docker.sh` or:

```sh
docker stop plot-gallery
```

### Option 2: Running Locally

1. **Install Node.js** (version 18 or later recommended).

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Start the server:**

From inside the `web` directory:

    ```sh
    npm start
    ```

4. **Open your browser and go to:** [http://localhost:3000](http://localhost:3000)


## Usage

- Place any `.png` images you want to display in the `public/plots/` directory.
- The gallery at [http://localhost:3000](http://localhost:3000) will automatically show all images in that folder.
- Images are refreshed automatically if they are added or updated.

## Project Structure

```text
package.json
server.js
public/
    index.html
    scripts.js
    styles.css
    plots/
        your_images.png
```
