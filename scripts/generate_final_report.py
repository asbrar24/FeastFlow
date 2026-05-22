from pathlib import Path
import re

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "AERON (2).pdf"
OUT_PATH = ROOT / "AERON_final_report.md"


def read_snippet(path, start, end):
    src = (ROOT / path).read_text(encoding="utf-8", errors="replace").splitlines()
    return "\n".join(src[start - 1:end])


reader = PdfReader(str(PDF_PATH))
pages = []
for page in reader.pages:
    text = page.extract_text() or ""
    text = text.replace("\u2029", "\n").replace("\xa0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text.strip())
    pages.append(text)

full = "\n\n".join(pages)

replacements = {
    '"FEASTFLOW"': '"FEAST FLOW"',
    "“FeastFlow”": "“Feast Flow”",
    "FeastFlow": "Feast Flow",
    "Built using React.js": "Built using HTML5, CSS3, and JavaScript",
    "React.js": "HTML, CSS, and JavaScript",
    "React": "JavaScript",
    "MongoDB (NoSQL database)": "JSON file-based storage",
    "MongoDB used for storing data": "JSON files are used for storing data",
    "MongoDB is used": "JSON files are used",
    "MongoDB": "JSON file storage",
    "MERN stack technologies": "HTML/CSS/JavaScript and Node.js/Express technologies",
    "MERN stack": "Node.js/Express with vanilla frontend stack",
    "MERN Stack": "Node.js/Express and Vanilla Frontend Stack",
    "use of the MERN stack": "use of a Node.js/Express backend with a vanilla JavaScript frontend",
    "Running HTML, CSS, and JavaScript development server": "Running the Node.js development server",
    "Running JSON file storage database": "Maintaining JSON data files",
    "JSON file storage Compass": "File Explorer / VS Code JSON Viewer",
    "MongoDB Documentation": "Node.js File System and JSON Documentation",
    "JSON file storage Documentation": "Node.js File System and JSON Documentation",
    "collections": "JSON data files",
    "Collections": "JSON Data Files",
    "Products Collection": "Menu Data File",
    "Users Collection": "Users Data File",
    "Orders Collection": "Orders Data File",
    "Cart Collection": "Client Cart Storage",
    "Products": "Menu Items",
    "Product": "Menu Item",
    "products": "menu items",
    "product": "menu item",
    "GET /products": "GET /api/menu",
    "Fetch menu": "Fetch menu items",
    "POST /cart": "localStorage cart action",
    "Add item": "Add item to cart",
    "POST /order": "POST /api/orders",
    "POST /register": "POST /api/auth/register",
    "POST /login": "POST /api/auth/login",
    "Integrate APIs using Axios": "Integrate APIs using the Fetch API",
    "Connect JSON file storage": "Configure JSON file read/write helpers",
    "Connect frontend and backend": "Connect frontend pages with backend API routes",
    "Deploy application to a live environment": "Run and test the application on a local Node.js server",
    "Deploy frontend and backend": "Run the frontend and backend through the Express server",
    "Final deployment": "Final local server testing",
    "real-time order tracking and live updates": "admin order status updates and order history views",
    "real-time order tracking": "admin-managed order status updates",
    "Real-time order tracking": "Admin-managed order status updates",
    "Online + Cash options": "Cash on Delivery and card-on-delivery options",
    "Online (website-based)": "Website-based",
    "Automated database system": "Automated JSON file records",
    "Database Handling": "Data File Handling",
    "Store user and order data": "Store user and order data in JSON files",
    "Reliable data storage": "Reliable local JSON data storage",
    "database connectivity": "backend data-file integration",
    "database management concepts": "data management concepts",
    "Database management": "JSON data management",
    "Database Design": "Data File Design",
    "database design": "data file design",
    "Database": "Data Storage",
    "database": "data storage",
    "Virtual DOM": "direct DOM updates",
    "useState": "DOM state variables",
    "useEffect": "event listeners and lifecycle handlers",
    "component-based architecture": "section-based modular page structure",
    "Component-Based Architecture": "Section-Based Modular Architecture",
    "reusable components": "reusable sections and JavaScript helpers",
}

for old, new in replacements.items():
    full = full.replace(old, new)

cleanup_replacements = {
    " Does not include real-time delivery tracking": " Does not include live GPS-style delivery tracking",
    " Payment gateway integration is not implemented (can be added later)": " Online payment gateway integration is not implemented; current checkout supports cash/card on delivery",
    "Payment gateway integration is not implemented (can be added later)": "Online payment gateway integration is not implemented; it can be added later",
    "Dynamic UI updates": "Dynamic UI updates through DOM manipulation",
    "Efficient rendering": "Efficient rendering through optimized DOM updates",
    "Indexing for performance": "Simple structured files for easy retrieval",
    "Schema flexibility": "Flexible JSON structure",
    "Flexible data storage": "Flexible JSON records",
    "NoSQL data storage": "JSON data storage",
    "NoSQL": "file-based",
    "Scalable Node.js/Express and Vanilla Frontend Stack Applications for E-Commerce Platforms": "Scalable Web Applications for E-Commerce Platforms",
    "The concepts discussed in this paper helped justify the use of the Node.js/Express with vanilla frontend stack": "The concepts discussed in this paper helped justify the use of modular APIs and a JavaScript-based web stack",
    "This resource was used extensively while designing dynamic user interfaces and reusable components for the Restaurant E-Commerce Website.": "This resource was reviewed for frontend design concepts, while the implemented user interface was built with HTML, CSS, and vanilla JavaScript.",
    "The Node.js File System and JSON Documentation provides guidance on data storage schema design, CRUD operations, indexing, aggregation pipelines, and cloud data storage management. This resource was used while implementing the data storage layer of the Restaurant E-Commerce Website.": "Node.js file system and JSON documentation provide guidance on reading, writing, and maintaining structured local data files. These concepts were used while implementing the project data layer with JSON files for users, menu items, reservations, newsletters, contacts, and orders.",
    "File Explorer / VS Code JSON Viewer\n GUI tool for JSON file storage\n Helps visualize data storage": "File Explorer / VS Code JSON Viewer\n Used to inspect and edit JSON data files\n Helps visualize stored users, menu items, reservations, contacts, newsletters, and orders",
    "Why Node.js/Express and Vanilla Frontend Stack?": "Why the Selected Stack?",
    "Fast data storage retrieval": "Simple local data retrieval",
}

for old, new in cleanup_replacements.items():
    full = full.replace(old, new)

encoding_cleanup = {
    "â€“": "–",
    "â€”": "—",
    "â€™": "’",
    "â€˜": "‘",
    "â€œ": "“",
    "â€": "”",
    "â€": "”",
    "ï‚§": "-",
    "â†’": "→",
    "Ã—": "×",
}

for old, new in encoding_cleanup.items():
    full = full.replace(old, new)

reference_cleanup = {
    "[9] HTML, CSS, and JavaScript Official Documentation. [Online]. Available: https://react.dev": "[9] MDN Web Docs: HTML, CSS, JavaScript and Web APIs. [Online]. Available: https://developer.mozilla.org",
    "[11] Node.js File System and JSON Documentation. [Online]. Available: https://www.mongodb.com/docs": "[11] Node.js File System Documentation and JSON Data Handling. [Online]. Available: https://nodejs.org/api/fs.html",
    "[7] A. Banks and E. Porcello, Learning HTML, CSS, and JavaScript. O’Reilly Media.": "[7] U.K. Roy, Web Technologies. Oxford University Press.",
    "[8] K. Chodorow, JSON file storage: The Definitive Guide. O’Reilly Media.": "[8] D. Herron, Node.js Web Development. Packt Publishing.",
}

for old, new in reference_cleanup.items():
    full = full.replace(old, new)

md_lines = []
for line in full.splitlines():
    s = line.strip()
    if not s:
        md_lines.append("")
    elif s.startswith("CHAPTER "):
        md_lines.append("\n# " + s)
    elif re.match(r"^\d+\.\d+(\.\d+)?\s+", s):
        level = "###" if re.match(r"^\d+\.\d+\.\d+", s) else "##"
        md_lines.append(f"{level} {s}")
    elif s in {"DECLARATION", "CERTIFICATE", "ACKNOWLEDGEMENT", "CERTIFICATE FROM THE ORGANIZATION", "INDEX", "REFERENCES"}:
        md_lines.append("\n# " + s.title())
    elif s.startswith("TABLE "):
        md_lines.append("\n**" + s + "**")
    elif s.startswith(""):
        md_lines.append("- " + s[1:].strip())
    elif s.startswith("o "):
        md_lines.append("  - " + s[2:].strip())
    elif s.startswith("● "):
        md_lines.append("- " + s[2:].strip())
    elif re.match(r"^\[\d+\]", s):
        md_lines.append("- " + s)
    else:
        md_lines.append(s)

md = "\n".join(md_lines)
md = re.sub(r"\n{4,}", "\n\n\n", md)

appendix = f"""

# Additional Implemented Project Evidence

The following additions document code and assets that are present in the submitted Feast Flow project implementation. These are included to support the implementation chapter and to replace earlier claims that referred to unavailable MERN/MongoDB-only features.

## Project Visual Assets Used

![Feast Flow Logo](assets/images/logo.svg)

![Homepage Hero Image](assets/images/hero-slider-1.jpg)

![Paneer Tikka Menu Image](assets/images/menu-1.jpg)

![Butter Chicken Menu Image](assets/images/menu-2.jpg)

![Hyderabadi Biryani Menu Image](assets/images/menu-4.jpg)

## Additional Code Snippet: Express Server and API Routing

```javascript
{read_snippet("server.js", 1, 46)}
```

## Additional Code Snippet: JSON Data Helpers for Menu Management

```javascript
{read_snippet("routes/menu.js", 1, 42)}
```

## Additional Code Snippet: Dynamic Menu Rendering and Cart Button

```javascript
{read_snippet("assets/js/script.js", 552, 592)}
```

## Additional Code Snippet: Cart Drawer Scrollable Layout

```css
{read_snippet("assets/css/style.css", 3019, 3090)}
```

## Additional Code Snippet: Admin Menu Price Rendering in INR

```javascript
{read_snippet("assets/js/admin.js", 1, 16)}
```

```javascript
{read_snippet("assets/js/admin.js", 195, 210)}
```

## Implementation Coverage Note

The final implemented project includes a responsive single-page restaurant website, dynamic menu loading, reservations, contact messages, newsletter subscription, customer authentication, cart management, checkout/order placement, order history, and an admin dashboard for reservations, messages, subscribers, menu items, and order status management. Features such as live delivery tracking, online payment gateway integration, AI recommendations, and multi-restaurant vendor support are documented as future scope rather than implemented functionality.
"""

OUT_PATH.write_text(md + appendix, encoding="utf-8")
print(OUT_PATH)
print("chars", len(md + appendix))
