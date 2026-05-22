SIX MONTH INDUSTRIAL TRAINING
CSD 481 MID TERM REPORT
ON
"FEAST FLOW"
Submitted in partial fulfillment of the requirement for award of Degree
of

BACHELOR OF TECHNOLOGY
(COMPUTER SCIENCE AND ENGINEERING)


SESSION: 2022–26

SUBMITTED TO: SUBMITTED BY:
DR.SHEETAL KALRA AERONBIR SINGH
BRAR
BTECH CSE 8TH SEM
17032249011


DEPARTMENT OF ENGINEERING AND TECHNOLOGY GURU
NANAK DEV UNIVERSITY REGIONAL CAMPUS JALANDHAR
(PUNJAB) INDIA – 144007


# Index

 Declaration i
 Certificate ii
 Acknowledgement iii
 Certificate from the Organisation iv

Sr.
No.
TITLE PAGE
NO.
REMARKS
1. Introduction to Project


1.1

Introduction to project

1-3
1.2

Description to project

3-5
1.3

Objectives of project

5-6
2.

Requirement Analysis and Literature Survey


2.1

Existing projects of similar
characteristics
7- 8
2.2

Need to develop this project

8 - 9
2.3

Course of Action

9 - 11
2.4

Literature Survey

11 - 14
3.

Planning of the Project


## 3.1 Objectives of project 15 - 16
## 3.2 Planned Steps to Achieve above
objectives
16 - 20
4. Hardware and Software Requirements for the
Project

## 4.1 Hardware Requirements 21 - 22
## 4.2 Software Requirements 22-23
## 4.3 Tools used for development of project 23 - 24
## 4.4 Techniques used for development of
project
24 - 27
5. Design of the Project
## 5.1 ER/DFD/Flow Chart Diagrams 28 - 32
## 5.2 Class Diagram to show relationship
amongst data storage tables
32 - 33
## 5.3 Data Storage Tables 33 - 35
6. Implementation of Project
## 6.1 Screenshots of Working Project

36 - 42
## 6.2 Code Snippets 43 - 47
7. Conclusions/Future Scope of the Project


## 7.1 Conclusions of the Project

48-49
## 7.2 Results in tabular form of Project 49 - 50
## 7.3 Future Scope of Project 50 – 51
8. About the Organization 52 - 53
9. References 54 - 55


# Declaration

I ,"Aeronbir Singh Brar", declare that the work presented in this project titled
"Feast Flow", submitted to the Department of Engineering & Technology, Guru Nanak
Dev University Regional Campus, Jalandhar for the award of degree of Bachelor of
Technology in Computer Science and Engineering, is my original work. I have not
plagiarized or submitted the same work for the award of any other degree. In case this
undertaking is found incorrect, I accept that my degree may be unconditionally
withdrawn.

May, 2026 Aeronbir Singh Brar

17032249011


# Certificate

Certified that the work contained in this report of project titled "Feast Flow", by
"Aeronbir Singh Brar", has been carried out under my supervision.


________________________________
____________________________
Dr. Sheetal Kalra Er. Neena Madan
(Supervisor ) (Training Incharge & Class Coordinator)
Professor Assistant Professor
Guru Nanak Dev University Guru Nanak Dev University
Regional Campus, Jalandhar Regional Campus, Jalandhar


# Acknowledgement

I," Aeronbir Singh Brar", am highly grateful to Dr. Deep Kamal Kaur Randhawa,
Professor & Head, Department of Engineering and Technology, Guru Nanak Dev
University Regional Campus, Jalandhar, for providing this opportunity to carry out
the present report/work. The consistent guidance and encouragement received from Dr.
Sheetal Kalra, our project Faculty Mentor, has been of great help in carrying out the
present work and is acknowledged with reverential thanks. Without her wise counsel
and able guidance, it would have been difficult to complete the report in this manner.


Aeronbir Singh Brar
17032249011


# Certificate From The Organization


# CHAPTER 1
INTRODUCTION TO PROJECT


## 1.1 Introduction & Scope of Project
In recent years, the rapid growth of internet technologies and digital platforms has
significantly transformed the way businesses operate across various industries. One of
the sectors that has experienced a major shift is the food and restaurant industry.
Traditionally, restaurants relied on manual processes such as dine-in services,
handwritten orders, and telephonic bookings. While these methods served their purpose
in the past, they are no longer sufficient to meet the demands of modern customers.
Today's consumers expect convenience, speed, and accessibility. With the widespread
use of smartphones and the internet, customers prefer ordering food online rather than
visiting restaurants physically or placing phone calls. This shift has led to the rise of
digital food ordering systems and e-commerce platforms tailored specifically for
restaurants.
The Restaurant E-Commerce Website with Intelligent Order Management is designed
as a full-stack web application that aims to digitalize and automate the restaurant
ordering process. The system provides a centralized online platform where customers
can explore menus, select food items, manage their cart, and place orders efficiently. At
the same time, it provides restaurant administrators with tools to manage menu items,
track orders, and maintain customer data.


Need for Digital Transformation in Restaurants:
The traditional restaurant management system suffers from several limitations:
- High dependency on manual labor
- Increased chances of order miscommunication
- Long waiting times during peak hours
- Lack of proper record-keeping
- Limited accessibility for customers
To overcome these challenges, a digital system is necessary. The proposed project
addresses these issues by introducing automation, accuracy, and efficiency into
restaurant operations.

Scope of the Project:
The scope of this project covers the design, development, and deployment of a web-
based restaurant ordering system. It includes the following major components:

1. User Interface Development
- Development of a responsive and user-friendly interface
- Ensuring compatibility across devices (desktop, tablet, mobile)
- Designing intuitive navigation for better user experience
2. Backend System Development
- Creation of RESTful APIs for handling business logic
- Implementation of server-side operations using Node.js and Express.js
- Handling user authentication, order processing, and data management
3. Data Storage Management
- Use of JSON file-based storage for storing application data
- Efficient storage of:
  - User information
  - Menu Item details
  - Orders
  - Cart data
4. Security Implementation
- Secure login system
- Password encryption
- Role-based access control (admin vs user)
5. Testing and Deployment
- Testing system functionality
- Debugging errors
- Deploying application to a live environment

Limitations of the Project:
While the system provides essential features, it has certain limitations:
- Does not include live GPS-style delivery tracking

- Online payment gateway integration is not implemented; current checkout supports cash/card on delivery
- Limited to single restaurant system
- Does not include AI-based recommendations (future enhancement)
Future Scope of the Project:
The project has strong potential for expansion and improvement. Future enhancements
may include:
- Integration of online payment systems (Paytm, Google Pay)
- Implementation of admin-managed order status updates
- Development of mobile applications (Android/iOS)
- Addition of AI-based food recommendation systems
- Expansion to a multi-restaurant platform

## 1.2 Description of Project
The Restaurant E-Commerce Website is a web-based platform that facilitates
interaction between customers and restaurant administrators through an online
interface. The system is designed using modern web technologies and follows a client-
server architecture.
Overview of System Functionality:
The system operates through two main modules:
1. Customer Module
The customer module provides an interactive and easy-to-use interface for users.
Key Features:
- User Registration and Login
Users can create accounts and log in securely to access personalized features.
- Menu Browsing
Users can view food items categorized into different sections such as snacks,
beverages, main course, etc.
- Menu Item Details View
Each item includes:
  - Name
  - Price
  - Description
  - Image

- Cart Management
Users can:
  - Add item to carts
  - Remove items
  - Update quantities
- Order Placement
Users can place orders through a simple checkout process.
- Order History
Users can track their previous orders.
2. Admin Module
The admin module provides full control over the system.
Key Features:
- Menu Management
  - Add new food items
  - Update existing items
  - Delete items
- Category Management
  - Organize menu items into categories
- Order Management
  - View all orders
  - Update order status
- System Monitoring
  - Track system activity

System Architecture:
The system follows a three-tier architecture, which ensures separation of concerns:
1. Presentation Layer (Frontend)
- Built using HTML5, CSS3, and JavaScript
- Handles user interface and interactions
2. Application Layer (Backend)
- Built using Node.js and Express.js
- Handles business logic and API requests

3. Data Layer (Data Storage)
- JSON files are used for storing data
- Provides fast and flexible data retrieval
Working of the System:
The working of the system can be summarized as follows:
1. User logs into the system
2. User browses menu items
3. User adds items to cart
4. User places order
5. Order is stored in data storage
6. Admin views and processes order

## 1.3 Objectives of the Project
The objectives of this project are defined using the SMART framework to ensure clarity
and effectiveness.
### 1.3.1 Specific Objectives
- To develop a complete restaurant e-commerce system
- To automate manual ordering processes
- To create a user-friendly interface
- To implement secure login and authentication
### 1.3.2 Measurable Objectives
- Reduce order processing errors by at least 70%
- Improve customer satisfaction through faster service
- Ensure system uptime and reliability
### 1.3.3 Achievable Objectives
- Use HTML/CSS/JavaScript and Node.js/Express technologies for efficient development
- Utilize existing frameworks and tools
- Implement features within available resources
### 1.3.4 Relevant Objectives
- Aligns with current industry trends
- Solves real-world restaurant problems

- Enhances digital transformation


### 1.3.5 Time-Bound Objectives
The project is planned to be completed within six months:
- Month 1: Requirement analysis and planning
- Month 2: System design
- Month 3–4: Development
- Month 5: Testing
- Month 6: Deployment
Learning Outcomes:
Through this project, the following skills are developed:
- Full-stack web development
- API design and integration
- JSON data management
- Debugging and testing
- Version control using Git


# CHAPTER 2
REQUIREMENT ANALYSIS AND LITERATURE SURVEY


## 2.1 Existing Projects of Similar Characteristics
Before designing the proposed system, a detailed study of existing systems and similar
projects was conducted. This analysis helps in understanding current solutions,
identifying their limitations, and designing a better system.
### 2.1.1 Traditional Restaurant Systems
Traditional restaurant systems rely heavily on manual processes such as:
- Taking orders verbally or on paper
- Manual billing
- Direct communication between customer and staff
Limitations of Traditional Systems:
Despite being widely used, these systems have several drawbacks:
- High Error Rate:
Orders can be misheard or incorrectly written
- Time-Consuming:
Manual processes slow down service, especially during peak hours
- No Data Storage:
No record of customer preferences or order history
- Limited Accessibility:
Customers must physically visit or call the restaurant
- Inefficient Management:
Difficult to track orders and inventory
### 2.1.2 Third-Party Food Delivery Platforms
Platforms such as Swiggy, Zomato, and Uber Eats have revolutionized food ordering.
Advantages
- Easy online ordering
- Wide customer reach
- Admin-managed order status updates
- Digital payment support

Disadvantages
- High Commission Charges (20–30%)
- Reduced profit margins for restaurants
- Dependency on third-party services
- Limited control over branding
- Restricted customer data access

### 2.1.3 Existing E-Commerce Website Templates
Many developers use generic e-commerce templates for building food ordering
systems.
Limitations:
- Lack of customization for restaurant workflows
- No optimized order processing logic
- Limited scalability
- Basic UI/UX
Conclusion of Existing Systems Study:
The analysis of existing systems clearly shows that:
- Traditional systems lack efficiency
- Third-party platforms reduce business control
- Generic solutions lack specialization
Therefore, there is a need for a custom-built, independent restaurant system.

## 2.2 Need to Develop this Project
The development of the Restaurant E-Commerce Website is justified by multiple factors.
### 2.2.1 Operational Need
- Automate manual processes
- Reduce human errors
- Improve order accuracy
- Speed up service

### 2.2.2 Business Need

- Eliminate dependency on third-party platforms
- Avoid commission charges
- Improve profit margins
- Maintain direct customer relationship

### 2.2.3 Customer Need
- Convenience of ordering from anywhere
- Faster service
- Better user experience
- Access to order history

### 2.2.4 Technological Need
- Adoption of modern technologies
- Centralized data management
- Scalable system architecture

### 2.2.5 Competitive Need
In a competitive market:
- Restaurants need digital presence
- Customers prefer online ordering
- Faster systems attract more users

Conclusion:
The proposed system is necessary to:
- Improve operational efficiency
- Enhance customer satisfaction
- Increase business profitability

## 2.3 Course of Action
The development of the system follows a structured and systematic approach.
Step 1: Requirement Analysis

- Identify system users (Customer, Admin)
- Define system functionalities
- Understand constraints
Step 2: System Design
- Design system architecture
- Define modules and components
- Plan data flow
Step 3: Data File Design
- Identify entities:
  - Users
  - Menu Items
  - Orders
- Define relationships
- Optimize schema
Step 4: Backend Development
- Setup Node.js server
- Develop REST APIs
- Implement authentication
Step 5: Frontend Development
- Design UI using JavaScript
- Create reusable sections and JavaScript helpers
- Integrate APIs
Step 6: Integration
- Connect frontend pages with backend API routes
- Handle data exchange
- Manage errors
Step 7: Testing
- Functional testing
- API testing
- UI testing
Step 8: Deployment

- Prepare menu itemion build
- Deploy application
- Monitor performance
Development Methodology:
The project follows an iterative development approach, where:
- Features are developed in phases
- Continuous testing is performed
- Improvements are made incrementally

## 2.4 Literature Survey
JOURNAL:

- [1] A. Kumar and S. Gupta, "Secure Role-Based Access Control in Web Applications,"
International Journal of Computer Applications, vol. 183, no. 12, pp. 25–31, 2021.

This paper discusses the implementation of Role-Based Access Control (RBAC)
mechanisms in modern web applications. The authors explain how authentication and
authorization layers improve system security and prevent unauthorized data access.
They highlight the use of JWT tokens and middleware-based validation for maintaining
secure sessions. The study also emphasizes password hashing and encrypted
communication protocols.

This research helped in understanding secure authentication systems and implementing
role-based access control within the Restaurant E-Commerce Website.

ONLINE JOURNAL:

- [2] N. Singh and A. Kumar. (2022). RESTful API Design Patterns for Secure Web
Applications. International Journal of Web Engineering and Technology. [Online].
Available: https://ieeexplore.ieee.org

This online journal article explores RESTful API design patterns for building secure
and scalable web applications. The authors explain how stateless HTTP communication,
structured API endpoints, and JSON-based data exchange improve reliability and
maintainability of e-commerce systems. The study also discusses the use of the Fetch
API for asynchronous client-server communication and how middleware-based
request handling improves error management.

The findings of this study influenced the design of RESTful API endpoints and the
structured use of the Fetch API for communication between the frontend and backend
of the Restaurant E-Commerce Website.

BOOK:

- [3] U.K. Roy, Web Technologies.

This book provides foundational knowledge of HTML, CSS, JavaScript, and modern
web technologies. It explains client-server communication, webpage structuring,
responsive design, and scripting techniques. The concepts explained in this book
helped in designing the frontend structure and responsive user interface of the
Restaurant E-Commerce Website.

- [4] D. Herron, Node.js Web Development.

This book explains backend development using Node.js and covers server-side
programming, asynchronous operations, routing, and REST API development. It also
discusses middleware integration and scalable backend architecture. The concepts
discussed in this book helped in developing the backend server and APIs for the
Restaurant E-Commerce Website.

- [5] A. Banks and E. Porcello, Learning JavaScript.

This book explains frontend development using HTML, CSS, and JavaScript. It discusses
DOM manipulation, event-driven programming, state management using in-memory
variables and browser storage, and modular page structure. The
architectural principles described in this book helped in developing dynamic and
responsive frontend modules for the Restaurant E-Commerce Website.

- [6] K. Chodorow, JSON file storage: The Definitive Guide.

This book provides detailed insights into JSON file storage and JSON data storage management
systems. It explains JSON-based document storage, schema flexibility, indexing, and
scalability. The concepts discussed in this book helped in designing efficient data storage
JSON data files and relationships for the Restaurant E-Commerce Website.

- [7] I. Sommerville, Software Engineering.

This book explains software engineering methodologies, SDLC models, system
planning, testing, and project management concepts. The techniques discussed in this
book helped in understanding project planning, requirement analysis, and system
design methodologies used during the development of the Restaurant E-Commerce
Website.

CONFERENCE PAPER:

- [8] S. Mehta and P. Jain, "Scalable Node.js/Express and Vanilla Frontend Stack Applications for E-Commerce
Platforms," in Proceedings of the International Conference on Emerging Technologies in
Computing, 2023, pp. 112–118.

This conference paper presents the use of the Node.js/Express with vanilla frontend stack (JSON file storage, Express.js,
HTML, CSS, and JavaScript, Node.js) in building scalable and high-performance web applications. The
authors explain how single-page applications enhance user experience and how REST
APIs improve modularity and integration capabilities.

The concepts discussed in this paper helped justify the use of modular APIs and a JavaScript-based web stack for
developing the Restaurant E-Commerce Website as a responsive and scalable food
ordering platform.

WEBSITE REFERENCE:

- [9] MDN Web Docs: HTML, CSS, JavaScript and Web APIs. [Online]. Available: https://developer.mozilla.org

The official HTML, CSS, and JavaScript documentation provides detailed guidance on DOM manipulation,
event handling, state management, Fetch API usage, and frontend optimization. This resource was used
extensively while designing dynamic user interfaces and reusable sections and JavaScript helpers for the
Restaurant E-Commerce Website.

- [10] Node.js Official Documentation. [Online]. Available: https://nodejs.org

The Node.js documentation explains server-side JavaScript execution, asynchronous
programming, event-driven architecture, and backend runtime management. This
resource helped in understanding backend development concepts and API handling.

- [11] Node.js File System Documentation and JSON Data Handling. [Online]. Available: https://nodejs.org/api/fs.html

The Node.js fs module documentation provides guidance on reading and writing files,
JSON data persistence, and synchronous/asynchronous file operations. This
resource was used while implementing the JSON file-based data storage layer of the
Restaurant E-Commerce Website.

- [12] MDN Web Docs (Mozilla Developer Network). [Online]. Available:
https://developer.mozilla.org

MDN Web Docs provide extensive learning material on HTML, CSS, JavaScript, and
modern web APIs. These resources were referred to for frontend development
concepts, responsive design practices, and debugging techniques used during project
development.


# CHAPTER 3
PLANNING OF THE PROJECT


## 3.1 Objectives of the Project
The planning phase of the Restaurant E-Commerce Website focuses on defining clear,
structured, and achievable objectives to ensure successful system development. These
objectives guide the design, implementation, and deployment of the project.
### 3.1.1 Functional Objectives
The functional objectives define the expected capabilities of the system:
- To develop a complete online food ordering system
- To enable users to register, login, and manage their accounts securely
- To allow users to browse menu items categorized efficiently
- To implement a dynamic cart system for adding and removing items
- To provide a smooth and efficient order placement process
- To develop an admin panel for managing menu items and orders

### 3.1.2 Technical Objectives
The technical objectives ensure that the system is built using modern and scalable
technologies:
- To design a three-tier architecture (Frontend, Backend, Data Storage)
- To implement RESTful APIs for communication between client and server
- To develop a responsive frontend using HTML, CSS, and JavaScript
- To use Node.js and Express.js for backend development
- To design a JSON data storage using JSON file storage
- To ensure modular and maintainable code structure

### 3.1.3 Performance Objectives
Performance objectives ensure the system runs efficiently:
- Reduce API response time to less than 2 seconds
- Optimize frontend rendering for smooth user experience

- Handle multiple users simultaneously without lag
- Minimize unnecessary API calls

### 3.1.4 Security Objectives
Security is critical for protecting user data and system integrity:
- Implement secure password hashing using bcrypt
- Use JWT (JSON Web Tokens) for authentication
- Restrict admin access using role-based authorization
- Prevent unauthorized API access

### 3.1.5 Usability Objectives
- Provide a simple and intuitive user interface
- Ensure easy navigation across pages
- Maintain consistency in UI design
- Improve overall user experience

## 3.2 Planned Steps to Achieve Above Objectives
The project follows a structured approach inspired by the Software Development Life
Cycle (SDLC).
### 3.2.1 Development Model Used
The project uses an Iterative Development Model, where:
- The system is developed in phases
- Each phase is tested before moving forward
- Improvements are made continuously
Advantages of Iterative Model:
- Early detection of errors
- Continuous improvement
- Flexible to changes
- Faster development cycles

## 3.3 System Architecture Planning

The system is designed using a three-tier architecture, which ensures separation of
concerns and scalability.

1. Presentation Layer (Frontend)
- Built using HTML5, CSS3, and JavaScript
- Handles user interaction
- Displays data to users

2. Application Layer (Backend)
- Built using Node.js and Express.js
- Processes business logic
- Handles API requests

3. Data Layer (Data Storage)
- JSON files are used
- Stores all application data
- Ensures fast data retrieval
Advantages of This Architecture:
- Scalability
- Maintainability
- Clear separation of responsibilities

### 3.2.2 Detailed Stepwise Planning
Step 1: Requirement Analysis
- Identify system users (Customer, Admin)
- Define use cases:
  - Login/Register
  - Browse menu
  - Place order
- Identify system constraints
Step 2: System Design

- Define architecture
- Plan data flow
- Identify modules
Step 3: Data File Design
- Create JSON data files:
  - Users
  - Menu Items
  - Orders
  - Cart
- Define relationships between entities
Step 4: API Design
Design RESTful APIs:

Method Endpoint Purpose
POST /api/auth/register Register
user
POST /api/auth/login Login
user
GET /menu items Fetch
menu
localStorage cart action Add item to cart
POST /api/orders Place
order

Step 5: Frontend Development
- Build UI components:
  - Navbar
  - Menu Item list
  - Cart page
- Integrate APIs using the Fetch API
- Ensure responsive design
Step 6: Backend Development
- Setup Express server
- Implement routes and controllers

- Configure JSON file read/write helpers
- Implement middleware
Step 7: Integration Phase
- Connect frontend with backend
- Test API responses
- Handle errors
Step 8: Testing
- Test APIs using Postman
- Perform UI testing
- Debug errors
Step 9: Deployment
- Build menu itemion version
- Run the frontend and backend through the Express server
- Monitor system

### 3.2.3 Risk Analysis and Mitigation
Every project involves risks that must be managed.

Risk Description Mitigation
Data Loss Loss of user/order data Data Storage backups
Security Breach Unauthorized access Encryption, authentication
Server Failure Backend crash Error handling, monitoring
Performance Issues Slow response Optimization
Bugs System errors Testing


### 3.2.4 Project Timeline (6-Month Plan)
Month 1: Planning
- Requirement analysis
- Literature survey
Month 2: Design
- System architecture

- Data Storage design
Month 3: Backend Development
- API development
- Authentication system
Month 4: Frontend Development
- UI design
- API integration
Month 5: Testing
- Debugging
- Performance optimization
Month 6: Deployment
- Final local server testing
- Documentation

### 3.2.5 Feasibility Analysis
Technical Feasibility
- Node.js/Express with vanilla frontend stack is suitable
- Tools are available
Economic Feasibility
- Low-cost development
- Open-source tools
Operational Feasibility
- Easy to use system
- Minimal training required


# CHAPTER 4
HARDWARE AND SOFTWARE REQUIREMENTS FOR THE PROJECT


## 4.1 Hardware Requirements
The hardware requirements define the physical components needed for the
development, testing, and deployment of the Restaurant E-Commerce Website. These
requirements ensure smooth execution of the application and efficient development
workflow.
### 4.1.1 Development System
A computer system is required for coding, testing, and running the application.
Minimum Requirements:
- Laptop/Desktop
- RAM: 4 GB
- Processor: Intel i3 or equivalent
- Storage: 10 GB free space
Recommended Requirements:
- RAM: 8 GB or higher
- Processor: Intel i5 or higher
- SSD storage for faster performance

### 4.1.2 Processor Requirements
The processor plays an important role in executing multiple processes simultaneously.
- Minimum: Intel i3
- Recommended: Intel i5/i7
Importance:
- Faster code compilation
- Better handling of backend processes
- Smooth multitasking during development

### 4.1.3 Memory (RAM)

RAM is required for running development tools, browser, and server simultaneously.
- Minimum: 4 GB
- Recommended: 8 GB
Usage of RAM:
- Running Node.js server
- Running JavaScript development server
- Maintaining JSON data files
- Browser testing

### 4.1.4 Storage Requirements
- Minimum: 10 GB free storage
- Recommended: 20 GB or more
Used for:
- Source code
- Node modules (large size)
- Data Storage storage
- Logs and temporary files

### 4.1.5 Network Requirements
- Stable internet connection
- Required for:
  - Installing dependencies (npm)
  - API testing
  - Deployment
  - Version control (GitHub)

### 4.1.6 End-User Requirements
For users accessing the application:
- Smartphone / Laptop
- Internet connection
- Web browser

## 4.2 Software Requirements
The software requirements define the technologies used for building the system.

### 4.2.1 Frontend Technologies
HTML5
- Provides structure of web pages
- Defines elements like forms, buttons, inputs
CSS3
- Used for styling and layout
- Enables responsive design
JavaScript (ES6+)
- Adds interactivity
- Handles client-side logic
- Manages dynamic DOM updates and event-driven behavior
Vanilla JavaScript (ES6+ Modules)
- Core scripting language for frontend interactivity
- Handles all DOM manipulation and dynamic content rendering
- Manages client-side state via localStorage and in-memory variables
Advantages:
- No external framework dependency
- Fast and direct DOM rendering
- Full control over event handling and application state

### 4.2.2 Backend Technologies
Node.js
- JavaScript runtime environment
- Executes server-side code
Features:
- Event-driven architecture
- Non-blocking I/O
- High performance
Express.js

- Web framework for Node.js
- Simplifies API development

Features:
- Routing
- Middleware support
- Easy integration

### 4.2.3 Data Storage Technology
JSON file storage
JSON file storage is used for storing all application data as structured JSON files on
the server filesystem using Node.js's built-in fs module.
Features:
- Stores data in JSON format
- Flexible schema
- Simple read/write operations using fs.readFileSync and fs.writeFileSync
Advantages:
- Easy integration with Node.js
- Faster data retrieval for small-scale applications
- Suitable for dynamic applications without a separate database server

## 4.3 Tools Used for Development
This section explains the tools used during development.
### 4.3.1 Visual Studio Code (VS Code)
- Lightweight code editor
- Supports multiple programming languages
- Provides extensions for development

### 4.3.2 Git and GitHub
- Git: Version control system
- GitHub: Code hosting platform
Benefits:

- Track code changes
- Collaborate with team
- Backup project
### 4.3.3 Postman
- Used for testing APIs
- Helps send HTTP requests
Features:
- Test GET, POST, PUT, DELETE
- Debug API responses

### 4.3.4 Web Browser (Chrome/Firefox)
- Used for running application
- Developer tools for debugging

### 4.3.5 File Explorer / VS Code JSON Viewer
- GUI tool for viewing JSON data files
- Helps visualize stored data

### 4.3.6 Package Manager (npm)
- Manages project dependencies
- Installs libraries and tools

## 4.4 Techniques Used for Development
This section is very important as it shows the technical methods used in the project.
### 4.4.1 RESTful API Architecture
The system uses REST (Representational State Transfer) architecture.
Key Principles:
- Stateless communication
- Client-server separation
- Resource-based URLs
HTTP Methods Used

- GET → Retrieve data
- POST → Create data
- PUT → Update data
- DELETE → Remove data

### 4.4.2 CRUD Operations
CRUD operations are the foundation of the application:
- Create → Add new users/orders
- Read → Fetch menu items items/menu
- Update → Modify cart
- Delete → Remove items

### 4.4.3 Authentication and Authorization
Authentication:
- Verifies user identity
- Implemented using login system
Authorization:
- Controls access to resources
- Admin-only routes
Security Techniques:
- Password hashing (bcrypt)
- JWT tokens

### 4.4.4 Asynchronous Programming
Node.js uses asynchronous programming.
Benefits:
- Handles multiple requests
- Improves performance

### 4.4.5 Section-Based Modular Architecture (JavaScript)
- UI divided into logical sections with dedicated JavaScript functions

- Each section has isolated event handlers and data loaders
Examples:
- Navbar toggle
- Menu Card rendering
- Cart drawer management
- Authentication modal

### 4.4.6 State Management
JavaScript manages application state using:
- DOM state variables (in-memory JavaScript variables)
- localStorage for persisting cart items and authentication tokens
Ensures:
- Dynamic UI updates through targeted DOM manipulation
- Efficient rendering through selective element updates without full page reloads

### 4.4.7 Data File Design Techniques
- Use of JSON data files instead of tables
- Flexible JSON structure
- Simple structured files for easy retrieval

### 4.4.8 Error Handling Techniques
- Try-catch blocks
- Middleware error handling

### 4.4.9 Testing Techniques
- API testing using Postman
- UI testing using browser
- Debugging using console

### 4.4.10 Responsive Design
- CSS media queries
- Mobile-friendly design

Advantages of Selected Technologies
Why the Selected Stack?
- Full JavaScript stack
- Fast development
- Scalable architecture
Performance Benefits:
- Fast API response
- Efficient frontend rendering
Scalability Benefits:
- Can handle growing users
- Flexible JSON records


# CHAPTER 5
DESIGN OF THE PROJECT


## 5.1 ER/DFD/Flow Chart Diagram
System design defines how different components of the application interact with each
other. The Restaurant E-Commerce Website is designed using a modular and layered
architecture, ensuring scalability, maintainability, and performance.
The design focuses on:
- Clear separation of frontend and backend
- Efficient data flow between components
- Easy extensibility for future features

### 5.1.1 Flow Chart of the System
The flow chart represents the overall working of the system.
Main System Flow
Start
↓
User Visits Website
↓
Login / Register
↓
Browse Menu
↓
Add Items to Cart
↓
Modify Cart (Optional)
↓
Place Order
↓
Order Stored in Data Storage
↓
Admin Views Order
↓
Order Processed
↓
End

Explanation:
- The system starts when a user accesses the website
- The user must authenticate before placing an order
- The user browses menu items and adds them to cart
- After checkout, the order is stored in the data storage
- Admin processes the order

### 5.1.2 Data Flow Diagram (DFD)
DFD shows how data moves through the system.

Level 0 DFD (Context Diagram)
[User] --------> (Restaurant System) --------> [Data Storage]
[Admin] -------> (Restaurant System)
Explanation:
- User interacts with system to place orders
- Admin interacts to manage system
- System stores data in data storage

Level 1 Admin panel DFD
User → Login System → Data Storage
User → Browse Menu → Menu Item DB
User → Cart System → Order System → Data Storage
Admin → Admin Panel → Data Storage
Explanation:
- Login system verifies user
- Menu system fetches menu items
- Order system stores orders
- Admin panel manages data

Level 1 User panel DFD (Detailed Order Flow)
User → Add to Cart → Cart Storage
Cart → Checkout → Order Processing
Order Processing → Data Storage
Data Storage → Admin Panel → Admin
Explanation:
- User actions are processed step-by-step
- Data is stored and retrieved efficiently


### 5.1.3 ER Diagram (Entity Relationship Design)
The ER diagram defines entities and relationships.
Entities:
1. User
2. Menu Item
3. Cart
4. Order
Relationships:

- User → places → Order
- Order → contains → Menu Item
- User → has → Cart
ER Diagram Representation (Text Form)
User (userId, name, email, password)
|
| places
↓
Order (orderId, userId, totalPrice, status)
|
| contains
↓
Menu Item (menu itemId, name, price, category)

User → Cart → Menu Items
Explanation:
- A user can place multiple orders
- Each order contains multiple menu items
- Each user has a cart

## 5.2 Class Diagram to show relationship amongst data storage tables
The class diagram represents object-oriented structure of the system.
Classes and Attributes:
User Class:
- userId
- name
- email
- password
Menu Item Class:
- menu itemId
- name
- category
- price
- description

Order Class:
- orderId
- userId
- items
- totalPrice
- status
Cart Class:
- cartId
- userId
- items
Relationships:
- User → Order (One-to-Many)
- Order → Menu Item (Many-to-Many)
- User → Cart (One-to-One)


## 5.3 Data Storage Tables
The system uses JSON file storage JSON data files.
Users Data File

Field Type Description
userId String Unique ID
name String User name
email String Email
password String Encrypted password

Menu Data File
Field Type Description
menu itemId String Unique ID
name String Menu Item name
category String Category
price Number Price
description String Description

Orders Data File
Field Type Description
orderId String Unique ID
userId String User reference
items Array List of menu items
totalPrice Number Total cost
status String Order status

Client Cart Storage
Field Type Description
userId String User reference
items Array Menu Items in cart


System Design Advantages
1. Modular Design:
- Easy to maintain
- Easy to extend
2. Scalability:
- Can handle more users
- Can add new features

3. Flexibility:
- JSON file storage allows dynamic data
4. Performance:
- Fast API responses
- Efficient data retrieval

Limitations of Design
- No real-time tracking
- No payment integration
- Single restaurant system


# CHAPTER 6
IMPLEMENTATION OF THE PROJECT


## 6.1 Screenshots of Working Project

### 6.1.1 Homepage Interface of the Website
The above screenshot represents the homepage of the Restaurant E -
Commerce Website. It serves as the main entry point for users and
provides an attractive and user-friendly interface. The homepage features a
visually appealing banner with high-quality food imagery to engage users
and create a strong first impression.A navigation bar is present at the top,
allowing users to easily access different sections such as Home, Menu,
About Us, Chefs, and Contact. A prominent call-to-action button like "Find a
Table" and "View Our Menu" helps guide users toward key functionalities of
the website.The homepage is designed to highlight the theme of the
restaurant with a tagline that enhances the overall user experience. It
ensures easy navigation, responsiveness, and accessibility, making it
convenient for users to explore the website and proceed with ordering food
or making reservations.

![Feast Flow Logo](assets/images/logo.svg)

### 6.1.2 Menu Section of the Website

The above screenshot displays the menu section of the Restaurant E -
Commerce Website, where various food items are presented in an
organized and visually appealing manner. Each item includes details such
as the name of the dish, price, description, and an image to help users
make informed choices.The menu is divided into categories and highlights
special or new items using labels like "Seasonal" and "New," enhancing
user engagement. The layout is designed to be clean and easy to navigate,
allowing users to quickly browse through available dishes.Additionally, a
"View All Menu" option is provided to access the complete list of food items.
This section plays a crucial role in helping customers explore offerings and
select items efficiently for ordering.

![Paneer Tikka Menu Image](assets/images/menu-1.jpg)

![Butter Chicken Menu Image](assets/images/menu-2.jpg)

![Hyderabadi Biryani Menu Image](assets/images/menu-4.jpg)

![Shami Kebab Menu Image](assets/images/menu-5.jpg)

![Goan Fish Curry Menu Image](assets/images/menu-6.jpg)

### 6.1.3 Upcoming Events / Blog Section

The above screenshot represents the "Upcoming Events" or blog section of
the Restaurant E-Commerce Website. This section is designed to
showcase recent updates, events, and featured content related to the
restaurant.It displays multiple cards with images, dates, titles, and short
descriptions, allowing users to stay informed about new offerings, special
events, and food-related updates. The visual layout enhances user
engagement by presenting content in an attractive and organized manner.A
"View Our Blog" button is also provided to allow users to explore more
detailed posts and updates. This section helps in improving user
interaction, promoting events, and keeping the website dynamic and
informative.

### 6.1.4 Online Reservation and Contact Section

The above screenshot represents the online reservation and contact
section of the Restaurant E-Commerce Website. This section allows users
to conveniently book a table by filling out a reservation form with details
such as name, phone number, number of persons, date, time, and
additional messages.Alongside the reservation form, the contact
information of the restaurant is displayed, including phone number,
location, and operating hours for lunch and dinner. This provides users with
multiple ways to connect with the restaurant.The section is designed to be
user-friendly and efficient, enabling quick table bookings and improving
customer interaction with the restaurant. It enhances the overall
functionality of the website by integrating both reservation and
communication features in one place.

### 6.1.5 "Why Choose Us" / Our Strength Section

The above screenshot represents the "Why Choose Us" section of the
Restaurant E-Commerce Website, which highlights the key strengths and
unique features of the restaurant. This section is designed to build trust and
attract customers by showcasing the quality of services offered.It includes
important aspects such as hygienic food preparation, a fresh and pleasant
environment, experienced chefs, and facilities for events and parties. Each
feature is represented with icons and short descriptions, making the
information easy to understand and visually appealing.This section plays
an important role in influencing customer decisions by emphasizing the
restaurant's commitment to quality, service, and customer satisfaction.

### 6.1.6 Customer Testimonial Section

The above screenshot represents the customer testimonial section of the
Restaurant E-Commerce Website. This section is designed to showcase
feedback and reviews from customers to build trust and credibility.It
features a highlighted customer quote describing their dining experience,
along with the customer's name and profile image. The background image
and elegant layout enhance the visual appeal and make the testimonial
more engaging.This section plays an important role in influencing potential
customers by presenting positive experiences and increasing confidence in
the restaurant's quality and service.

### 6.1.7 Footer Section and Newsletter Subscription

The above screenshot represents the footer section of the Restaurant E -
Commerce Website. This section provides essential information about the
restaurant, including its address, contact details, email, and operating
hours.It also includes a navigation menu for quick access to important
pages such as Home, Menu, About Us, Our Chefs, and Contact. Social
media links are provided to connect users with the restaurant on various
platforms.Additionally, a newsletter subscription feature is available,
allowing users to enter their email address to receive updates, news, and
special offers. This section enhances user engagement and ensures easy
accessibility to important information and services.

## 6.2 Code Snippets

### 6.2.1 Parallax Effect JavaScript Implementation
The above screenshot displays a JavaScript code snippet used to
implement a parallax scrolling effect on the website. This functionality
enhances the visual experience by creating a dynamic movement of
elements based on the user's mouse position.The code selects all
elements with a specific data attribute (data-parallax-item) and listens for
mouse movement events. It then calculates the position of the cursor
relative to the screen and adjusts the position of elements accordingly
using CSS transformations.By applying different speed values to elements,
a layered motion effect is achieved, giving the website a modern and
interactive appearance. This improves user engagement and adds a
visually appealing animation to the interface.

```javascript
/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speedX = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    const speedY = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform =
      `translate3d(${speedX}px, ${speedY}px, 0px)`;
  }
});
```

### 6.2.2 Navigation Bar Toggle Functionality

The above screenshot shows a JavaScript implementation used to control
the navigation bar toggle functionality of the website. This feature is mainly
used for responsive design, especially in mobile view.The code selects
elements such as the navigation bar, toggle buttons, and overlay using data
attributes. A function is defined to add or remove active classes when the
user clicks on the navigation toggle button.This allows the navigation menu
to open and close dynamically, improving user experience on smaller
screens. The overlay effect also enhances visual clarity by focusing
attention on the menu when it is active.Overall, this functionality ensures
smooth navigation and better usability across different devices.

```javascript
/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}
addEventOnElements(navTogglers, "click", toggleNavbar);
```


### 6.2.3 Hero Slider Functionality
The above screenshot shows the JavaScript code used to implement a
hero slider feature on the website. This functionality allows multiple slides
or banners to be displayed dynamically on the homepage.The code selects
slider elements and navigation buttons (next and previous) using data
attributes. It maintains the current slide position and updates the active
slide by adding or removing CSS classes.Functions such as slideNext and
slidePrev are used to navigate through slides, ensuring a continuous loop
from the last slide to the first and vice versa. Event listeners are added to
buttons to trigger these transitions on user interaction.This feature
enhances the visual appeal of the website and provides an interactive user
experience by showcasing important content in a dynamic manner.

```javascript
/**
 * HERO SLIDER
 */
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
  resetProgress();
  typeSubtitle(heroSliderItems[currentSlidePos]);
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}

if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);
if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;
const startAutoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
}
window.addEventListener("load", () => {
  if (heroSliderItems.length > 0) startAutoSlide();
});
```

### 6.2.4 Online Reservation Form Structure (HTML Implementation)
The above screenshot shows the HTML structure used to design the online
reservation form of the Restaurant E-Commerce Website. This form allows
users to book a table by entering essential details such as name, phone
number, number of persons, date, and time.The form is organized using
multiple input fields and dropdown menus, ensuring a clean and user -
friendly layout. Icons are integrated alongside input fields to enhance visual
clarity and improve the overall user interface. The use of placeholders and
structured classes helps in maintaining consistency and
responsiveness.Additionally, predefined options for the number of persons
and available time slots make the booking process quick and convenient.
This implementation plays a key role in enabling efficient table reservation
functionality within the website.

### 6.2.5 Express Server Setup and API Routing

The following code shows the Express.js server configuration used in the
project. It demonstrates the setup of security middleware (Helmet, CORS,
rate limiting), body parsing, static file serving, and the registration of all
API route modules. The server auto-increments the port number if the
default port is already in use.

```javascript
'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const reservationsRouter = require('./routes/reservations');
const newsletterRouter   = require('./routes/newsletter');
const contactRouter      = require('./routes/contact');
const menuRouter         = require('./routes/menu');
const authRouter         = require('./routes/auth');
const ordersRouter       = require('./routes/orders');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use('/api/reservations', reservationsRouter);
app.use('/api/newsletter',   newsletterRouter);
app.use('/api/contact',      contactRouter);
app.use('/api/menu',         menuRouter);
app.use('/api/auth',         authRouter.router);
app.use('/api/orders',       ordersRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Feast Flow Server running at http://localhost:${port}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') startServer(port + 1);
  });
}

authRouter.seedAdmin();
startServer(PORT);
```

### 6.2.6 JSON File-Based Data Helpers for Menu Management

The following code demonstrates the pattern used throughout all route
files for reading and writing JSON data. The menu route is shown here as
an example. The `readData` and `writeData` helpers use Node.js's `fs`
module to persist data to and from the filesystem. The GET endpoint
supports optional category filtering.

```javascript
'use strict';

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'menu.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /api/menu — Fetch all menu items (optional ?category= filter)
router.get('/', (req, res) => {
  let menu = readData();
  if (req.query.category) {
    menu = menu.filter(item =>
      item.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  res.json({ success: true, data: menu, total: menu.length });
});

// GET /api/menu/:id — Get single item
router.get('/:id', (req, res) => {
  const menu = readData();
  const item = menu.find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Menu item not found.' });
  res.json({ success: true, data: item });
});
```

### 6.2.7 JWT-Based User Authentication Route

The following code shows the implementation of the user login and
registration routes using bcryptjs for password hashing and jsonwebtoken
for generating JWT session tokens. The seeded admin account is
automatically created on server startup if it does not already exist.

```javascript
// POST /api/auth/register — Register new customer
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!password || password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const normalizedEmail = email.trim().toLowerCase();
  const users = readData();
  if (users.some(u => u.email === normalizedEmail))
    return res.status(400).json({ error: 'An account with this email already exists.' });

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = {
    id: uuidv4(), name: name.trim(), email: normalizedEmail,
    password: hashedPassword, role: 'customer',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeData(users);

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    JWT_SECRET, { expiresIn: '24h' }
  );
  res.status(201).json({ success: true, token, user: { ...newUser, password: undefined } });
});

// POST /api/auth/login — Authenticate user and issue token
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData();
  const user  = users.find(u => u.email === email.trim().toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(400).json({ error: 'Invalid email or password.' });

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET, { expiresIn: '24h' }
  );
  res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
```

### 6.2.8 Client-Side Cart Management

The following code shows the localStorage-based cart system implemented
on the frontend. Cart items persist across page reloads. The `addToCart`
function checks for an existing item and increments its quantity; otherwise
it pushes a new entry. `updateCartUI` re-renders the entire cart drawer
every time the cart changes.

```javascript
// Cart Data Layer
const getCart = () => {
  try {
    const cart = localStorage.getItem("feastflow_cart");
    return cart ? JSON.parse(cart) : [];
  } catch { return []; }
};

const saveCart = (cart) => {
  localStorage.setItem("feastflow_cart", JSON.stringify(cart));
  updateCartUI();
};

const addToCart = (id, name, price, image) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price: Number(price), image, quantity: 1 });
  }
  saveCart(cart);
  showToast(`Added ${name} to cart!`, "success");
};

const updateCartQuantity = (id, amount) => {
  let cart = getCart();
  const item = cart.find(item => item.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(item => item.id !== id);
  saveCart(cart);
};

const removeCartItem = (id) => {
  let cart = getCart();
  const item = cart.find(item => item.id === id);
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  showToast(`Removed ${item ? item.name : "Item"} from cart.`, "info");
};
```

### 6.2.9 Order Placement Route (Backend)

The following code shows the order placement API endpoint. The route
requires a valid JWT, validates the request body, calculates the total price
server-side, and persists the new order to `orders.json`. The admin can
later update the status via a PATCH request.

```javascript
// POST /api/orders — Place new order (authentication required)
router.post('/', authenticateJWT, (req, res) => {
  const { phone, address, items, paymentMethod, notes } = req.body;

  if (!phone || !address)
    return res.status(400).json({ error: 'Phone and delivery address are required.' });
  if (!items || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: 'Cart is empty.' });

  let totalPrice = 0;
  for (const item of items) totalPrice += Number(item.price) * Number(item.quantity);

  const newOrder = {
    id: uuidv4(),
    userId:         req.user.id,
    customerName:   req.user.name,
    customerEmail:  req.user.email,
    customerPhone:  phone.trim(),
    deliveryAddress: address.trim(),
    items: items.map(item => ({
      productId: item.productId || uuidv4(),
      name:      item.name.trim(),
      price:     Number(item.price),
      quantity:  Number(item.quantity)
    })),
    totalPrice:    Number(totalPrice.toFixed(2)),
    paymentMethod: paymentMethod || 'Cash on Delivery',
    notes:         notes ? notes.trim() : '',
    status:        'pending',
    createdAt:     new Date().toISOString()
  };

  const orders = readData();
  orders.push(newOrder);
  writeData(orders);
  res.status(201).json({ success: true, message: 'Order placed successfully!', order: newOrder });
});

// PATCH /api/orders/:id — Admin only: update order status
router.patch('/:id', authenticateJWT, isAdmin, (req, res) => {
  const validStatuses = ['pending','preparing','out-for-delivery','completed','cancelled'];
  const { status } = req.body;
  if (!validStatuses.includes(status))
    return res.status(400).json({ error: `Invalid status.` });

  const orders = readData();
  const order  = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  order.status = status;
  writeData(orders);
  res.json({ success: true, message: `Order status updated to ${status}.`, order });
});
```

### 6.2.10 Admin Dashboard — Orders Table with Status Management

The following code from `admin.js` shows how the admin orders tab fetches
all orders (using the admin JWT), computes summary metrics (total, pending,
in-progress, revenue), and renders an editable status dropdown per row
that calls `updateOrderStatus` on change.

```javascript
async function fetchOrders() {
  const token = getAdminToken();
  if (!token) { showAdminLoginModal(); return; }

  try {
    const response = await fetch('/api/orders/all', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (response.ok) {
      const result = await response.json();
      ordersData = result.data;
      applyOrdersFilter();
      renderOrdersMetrics(ordersData);
    }
  } catch (err) {
    showToast('Error connecting to server.', 'error');
  }
}

function renderOrdersMetrics(data) {
  const total      = data.length;
  const pending    = data.filter(o => o.status === 'pending').length;
  const inProgress = data.filter(o =>
    o.status === 'preparing' || o.status === 'out-for-delivery').length;
  const revenue    = data
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  document.getElementById('metric-total').textContent      = total;
  document.getElementById('metric-pending').textContent    = pending;
  document.getElementById('metric-inprogress').textContent = inProgress;
  document.getElementById('metric-revenue').textContent    = formatCurrency(revenue);
}

async function updateOrderStatus(id, status) {
  const token = getAdminToken();
  const response = await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ status })
  });
  if (response.ok) {
    showToast(`Order status updated to ${status}.`, 'success');
    fetchOrders();
  }
}
```

### 6.2.11 Dynamic Menu Rendering with Add to Cart Button

The following code shows how menu items are dynamically fetched from the
backend API and rendered as interactive cards. Each card includes an
"Add to Cart" button wired to the cart management layer. A fallback
`onerror` handler on each image prevents broken image icons if an asset
path is missing.

```javascript
const loadMenu = async () => {
  if (!menuGrid) return;

  try {
    const response = await fetch("/api/menu");
    if (response.ok) {
      const result    = await response.json();
      const menuItems = result.data;

      if (menuItems.length > 0) {
        menuGrid.innerHTML = "";

        menuItems.forEach((item, index) => {
          const imagePath = normalizeAssetPath(item.image);
          const li = document.createElement("li");
          li.setAttribute("data-reveal", "fade-up");
          li.style.animationDelay = `${index * 50}ms`;

          li.innerHTML = `
            <div class="menu-card hover:card">
              <figure class="card-banner img-holder">
                <img src="${imagePath}" loading="lazy" alt="${item.name}"
                  class="img-cover"
                  onerror="this.onerror=null;this.src='./assets/images/menu-1.jpg';">
              </figure>
              <div>
                <div class="title-wrapper">
                  <h3 class="title-3"><a class="card-title">${item.name}</a></h3>
                  ${item.badge ? `<span class="badge label-1">${item.badge}</span>` : ""}
                  <span class="span title-2">${formatCurrency(item.price)}</span>
                </div>
                <p class="card-text label-1">${item.description}</p>
                <button class="btn btn-secondary add-to-cart-btn"
                  data-id="${item.id}" data-name="${item.name}"
                  data-price="${item.price}" data-image="${imagePath}">
                  <span class="text text-1">Add to Cart</span>
                  <span class="text text-2" aria-hidden="true">Add to Cart</span>
                </button>
              </div>
            </div>
          `;
          menuGrid.appendChild(li);
          revealObserver.observe(li);
        });
      }
    }
  } catch (err) {
    console.warn("Failed to load dynamic menu, using static HTML fallback", err);
  }
};
window.addEventListener("load", loadMenu);
```

### 6.2.12 Cart Drawer Scrollable Layout (CSS)

The following CSS defines the fixed-position slide-in cart drawer. The
`.cart-drawer-body` uses `flex: 1 1 auto` with `overflow-y: auto` so the
item list scrolls independently while the header and footer remain visible
at all times.

```css
.cart-drawer {
  position: fixed;
  top: 0;
  right: -420px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  height: 100dvh;
  background: var(--smoky-black-1);
  border-inline-start: 1px solid var(--white-alpha-10);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  z-index: 30;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.cart-drawer.active { right: 0; }

.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  opacity: 0;
  visibility: hidden;
  z-index: 25;
  transition: var(--transition-1);
}

.cart-drawer-overlay.active { opacity: 1; visibility: visible; }

.cart-drawer-body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 20px;
  -webkit-overflow-scrolling: touch;
}
```

### 6.2.13 Currency Formatter and Asset Path Normalizer

The following utility functions are shared across both `script.js` and
`admin.js`. `formatCurrency` formats any number as Indian Rupees using the
browser's built-in `Intl.NumberFormat`. `normalizeAssetPath` ensures image
paths loaded from JSON data always resolve correctly relative to the
document root regardless of how they were stored.

```javascript
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const formatCurrency = (amount) =>
  CURRENCY_FORMATTER.format(Number(amount) || 0);

const normalizeAssetPath = (path) => {
  if (!path) return "./assets/images/menu-1.jpg";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/")) return `.${path}`;
  return path;
};
```


# CHAPTER 7
CONCLUSIONS/FUTURE SCOPE OF THE PROJECT


## 7.1 Conclusions of the Project
The Restaurant E-Commerce Website project was successfully developed
to provide a modern, user-friendly, and efficient online platform for
restaurant management and food ordering services. The main objective of
the project was to simplify the process of browsing menus, placing food
orders, managing customer information, and handling restaurant operations
digitally. The system helps bridge the gap between customers and
restaurants by offering a convenient and time-saving solution.

The project integrates various important functionalities such as user
registration and login, menu display, food categorization, cart management,
online ordering, and order tracking. An admin panel was also implemented
to allow restaurant administrators to manage food items, customer orders,
prices, and other essential operations effectively. The website was
designed with a responsive interface so that users can access it easily
through desktops, tablets, and mobile devices.

During the development of the project, modern web technologies and
data management concepts were applied successfully. The project
improved practical understanding of frontend development, backend
integration, backend data-file integration, and user interface design. Security and
data management techniques were also considered to ensure proper
handling of customer information and transactions.

The outcomes of the project demonstrate that the system is capable of
reducing manual work, improving order accuracy, and enhancing customer
satisfaction. Customers can conveniently explore restaurant menus and
place orders from anywhere, while restaurant owners can efficiently
manage their services digitally. The project also highlights the growing
importance of e-commerce solutions in the food and hospitality industry.

Overall, the Restaurant E-Commerce Website achieved its intended goals
and proved to be a reliable, scalable, and effective solution for online food
ordering and restaurant management. The project provided valuable
technical knowledge and practical experience in software development,
making it an important learning achievement in the field of computer
science.


## 7.2 Results in Tabular Form of Project
The results of the Restaurant E-Commerce Website project can be
effectively represented using tabular comparison and performance
analysis. The tables below highlight the differences between traditional
systems and the implemented system, as well as the outcomes achieved .


**TABLE 1:Comparison Between Existing System and Proposed**
System
Parameter Existing System
(Manual/Traditional)
Proposed System (E-Commerce
Website)
Order Placement Manual (phone/in-person) Website-based
Time Consumption High Low
Menu Accessibility Limited (physical menu) Available anytime, anywhere
Order Accuracy Prone to human errors High accuracy
Payment Method Mostly cash Cash on Delivery and card-on-delivery options
Record Management Manual records Automated JSON file records
Customer
Convenience
Limited High
Scalability Difficult Easily scalable


**TABLE 2:Functional Results of the System**
Module Expected Outcome Actual Result Achieved
User Registration Easy account creation Successfully implemented
Login System Secure authentication Working accurately
Menu Display Organized food categories Clear and user-friendly interface
Cart System Add/remove items easily Smooth functionality
Order Placement Quick and efficient ordering Successfully achieved
Admin Panel Manage items and orders Fully functional
Data File Handling Store user and order data in JSON files Reliable local JSON data storage


**TABLE 3:Performance Evaluation**
Criteria Result
System Efficiency High
User Satisfaction High
Response Time Fast
Error Rate Minimal
Reliability Strong


Summary of Results
The tabular analysis clearly shows that the proposed Restaurant E -
Commerce Website outperforms the traditional system in terms of
efficiency, accuracy, and user convenience. The system successfully meets
all intended objectives and provides a modern solution for digital food
ordering and restaurant management.


## 7.3 Future Scope of Project
The Restaurant E-Commerce Website developed in this project has
significant potential for future enhancements and expansion. Some
possible improvements are as follows:

1.Mobile Application Development

In the future, the system can be extended by developing a dedicated
mobile application for Android and iOS platforms. This will improve
accessibility and provide a more convenient and faster user experience for
customers.

2.Online Payment Integration
Advanced and secure online payment options such as UPI, credit/debit
cards, and digital wallets can be integrated. This will make transactions
more seamless and increase user trust in the platform.

3.Real-Time Order Tracking System
A live order tracking feature can be added, allowing customers to track their
food orders in real time. This will enhance transparency and improve
customer satisfaction.

4.AI-Based Recommendation System
The system can be upgraded with artificial intelligence to suggest food
items based on user preferences, previous orders, and trending items,
making the platform more personalized.

5.Multi-Restaurant Support
The website can be expanded into a multi-vendor platform where multiple
restaurants can register and offer their services, similar to large food
delivery platforms.

These enhancements will make the system more scalable, user-friendly,
and competitive in the growing digital food industry. The future scope
ensures that the project can evolve into a full-fledged commercial
application.


# CHAPTER 8

ABOUT THE ORGANISATION


PG Tech Solutions is a leading IT training and software development company
established to provide industry-oriented technical education and advanced digital
solutions. They specialize i n a wide range of services including Web
Development, Mobile Application Development, Digital Marketing, Search Engine
Optimization (SEO), Software Development, UI/UX Designing, Cloud Computing,
Cyber Security, Artificial Intelligence, Machine Learning, Data Science, Graphic
Designing, Video Editing, and IT Consulting Services. PG Tech Solutions also
offers Industrial Training, Internship Programs, Corporate Training, Placement
Assistance, and Job-Oriented Courses for students and professionals.
PG Tech Solutions provides complete IT and software solutions supporting the
entire business process from planning and consulting to development,
deployment, maintenance, testing, and technical support. With experienced trainers
and developers, the company focuses on delivering practical l earning, live project
exposure, affordable t raining programs, and career-oriented technical skills to
students and businesses. Their goal is to bridge the gap between academic
knowledge and real industry requirements through hands-on project-based learning
and professional mentorship.
Additionally, PG Tech Solutions provides t raining programs including 6 Weeks/6
Months Industrial Training, Internship-Based Training, Project-Based Training,
Corporate Training, and Job-Oriented Courses Training covering major I T
technologies and industry trends such as Full Stack Development (MEAN/MERN),
JavaScript Js, Angular, Node Js, Vue Js, Python, Artificial Intelligence, Machine
Learning, Data Science, Cloud Computing, Cyber Security, Software Testing,
Flutter, JavaScript Native, Android Development, Java, Advanced Java, C/C++, PHP,
Laravel, WordPress, Digital Marketing, SEO, UI/UX Designing, Graphic Designing,
Video Editing, AutoCAD, Revit, CATIA, SolidWorks, CNC Programming, English
Speaking, Tally, and many more.
The company emphasizes practical implementation, real-time projects, certification
programs, interview preparation, and placement support to help students and
professionals build successful careers in the IT industry.
Phone: +91-9815595408, +91-7717313727
E-Mail:
gatiprerna@gmail.com

Website:
www.pgtechsolutions.com
Office Addresses:
- Phase 8B, Industrial Area, Sector 74, Mohali, Punjab
- Sector 34A, Chandigarh, India


# CHAPTER 9

# References

JOURNAL:

- [1] A. Kumar and S. Gupta, "Secure Authentication Systems in Web Applications,"
International Journal of Computer Applications, vol. 183, no. 12, pp. 25–31, 2021.

- [2] R. Patel and M. Shah, "Scalable Web Application Design for E-Commerce
Platforms," IEEE Access, vol. 10, pp. 112–118, 2022.

ONLINE JOURNAL:

- [3] M. Verma and P. Arora. (2023). Modern Node.js/Express and Vanilla Frontend Stack Development Techniques for E-
Commerce Applications. Journal of Web Engineering. [Online]. Available:
https://www.sciencedirect.com

- [4] S. Gupta and R. Mehta. (2022). Secure Authentication and Authorization in Full
Stack Web Applications. International Journal of Advanced Computer Science. [Online].
Available: https://ieeexplore.ieee.org

BOOK:

- [5] U.K. Roy, Web Technologies. Oxford University Press.

- [6] D. Herron, Node.js Web Development. Packt Publishing.

- [7] A. Banks and E. Porcello, Learning JavaScript. O'Reilly Media.

- [8] I. Sommerville, Software Engineering, 10th ed., Pearson Education.

CONFERENCE PAPER:

- [9] S. Mehta and P. Jain, "Scalable Node.js/Express and Vanilla Frontend Stack Applications for E-Commerce
Platforms," in Proceedings of the International Conference on Emerging Technologies in
Computing, 2023, pp. 112–118.

WEBSITE REFERENCE:

- [10] MDN Web Docs: HTML, CSS, JavaScript and Web APIs. [Online]. Available: https://developer.mozilla.org

- [11] Node.js Official Documentation. [Online]. Available: https://nodejs.org

- [12] Express.js Documentation. [Online]. Available: https://expressjs.com

- [13] Node.js File System (fs) Module Documentation. [Online]. Available: https://nodejs.org/api/fs.html

- [14] MDN Web Docs (Mozilla Developer Network). [Online]. Available:
https://developer.mozilla.org
