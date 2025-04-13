<h1 align="center" style="font-weight: bold;">Cad Block Viewer Backend 🧱 </h1>

<p align="center">
 <a href="#technologies">Technologies</a> •
 <a href="#dependencies">Dependencies</a> •
 <a href="#started">Getting Started</a> • 
<a href="#routes">API Endpoints</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>This project is a Node.js backend service that allows users to upload `.dxf` CAD files, extract block and entity data (like INSERT, SPLINE), and store the data in a PostgreSQL database. It's perfect for powering a full-stack CAD file viewer.
</b>
</p>


<h2 id="technologies">💻 Backend Technologies</h2>

<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>PostgreSQL</li>
</ul>

<h2 id="dependencies">📦 Dependencies</h2>

<ul>
    <li>pg</li>
    <li>cors</li>
    <li>dotenv</li>
    <li>express</li>
    <li>multer</li>
</ul>


<h2 id="started">🚀 Getting Started</h2>

<p>Follow the steps below to run the project locally:</p>

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/Sharifa26/CAD-Block-Viewer-Backend.git
```

## Create Database

```sql
CREATE IF NOT EXISTS DATABASE cad_db;
USE cad_db;

CREATE IF NOT EXISTS TABLE files (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE IF NOT EXISTS TABLE blocks (
  id SERIAL PRIMARY KEY,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
  block_name TEXT,
  block_type TEXT,
  x_coordinate DOUBLE PRECISION,
  y_coordinate DOUBLE PRECISION,
  z_coordinate DOUBLE PRECISION,
  properties JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


```

<h3>Config .env Variables</h3>

<p>Use the <code>.env.example</code> as a reference to create your <code>.env</code> file with your project configuration.</p>

```bash
DB_HOST = YOUR_DB_HOST
DB_PORT = YOUR_DB_PORT
DB_USER = YOUR_DB_USER
DB_PASSWORD = YOUR_DB_PASSWORD  
DB_NAME = YOUR_DB_NAME
DB_PORT=5432
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

<h3>Starting</h3>

install dependencies

```bash
npm install
```

run the project

```bash
npm start
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /upload</kbd>     | upload cad file see [request details](#post-upload-detail)
| <kbd>GET /blocks</kbd>     | get blocks by user see [request details](#get-blocks-detail)
| <kbd>GET /blocks/:id</kbd>     | get block by id see [request details](#get-blocks-id-detail)
|<kbd>GET /search/:name</kbd>     | search block by name see [request details](#get-search-name-detail)

<h3 id="post-upload-detail">POST /upload</h3>

**CURL**
```bash
curl --location 'localhost:4000/upload' \
--form 'file=@"/C:/Users/shari/Downloads/GzLa8-hummingbird-floral-art.dxf"'

```

<h3 id="get-blocks-detail">GET /blocks</h3>

**CURL**
```bash
curl --location 'localhost:4000/blocks'
```
<h3 id="get-blocks-id-detail">GET /blocks/:id</h3>

```bash
curl --location 'localhost:4000/blocks/57'
```

<h3 id="get-search-name-detail">GET /search/:name</h3>

**CURL**

```bash
curl --location 'localhost:4000/blocks/search/A8'
```

<h2 id="contribute">📫 Contribute</h2>

<p>Contributions are always welcome!</p>

<p>If you'd like to contribute to this project, follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or bug fix: <code>git checkout -b feature/YourFeatureName</code>.</li>
    <li>Make your changes and commit them: <code>git commit -m "Add your message here"</code>.</li>
    <li>Push your branch to your forked repository: <code>git push origin feature/YourFeatureName</code>.</li>
    <li>Open a pull request with a clear description of your changes.</li>
</ol>

<p>For major changes, please open an issue first to discuss what you'd like to change.</p>

<p>Thank you for your contributions! 🙌</p>

<p align="center">Made with ❤️ by Sharifa26</p>


