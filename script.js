

const DEMO_DB = {

    users: [

        {
            id: "ST001",
            role: "startup",
            name: "TechNova Solutions Pvt. Ltd.",
            email: "startup@technova.demo",
            password: "startup123",

            dpiitNumber: "DIPP123456",
            cin: "U72900DL2020PTC123456",
            gstin: "07ABCDE1234F1Z5",

            companyAge: 6,
            publicCompany: false,
            annualTurnover: 45,

            field: "Information Technology",

            uboDeclaration: true,

            verification: {
                dpiit: true,
                mca: true,
                gst: true,
                ubo: true
            },

            status: "approved"
        },

        {
            id: "ST002",
            role: "startup",
            name: "AgroVision Innovations",
            email: "agro@demo.in",
            password: "startup123",

            dpiitNumber: "DIPP654321",
            cin: "U01100JH2021PTC987654",
            gstin: "20ABCDE5678F1Z3",

            companyAge: 5,
            publicCompany: false,
            annualTurnover: 28,

            field: "Agriculture Technology",

            uboDeclaration: true,

            verification: {
                dpiit: true,
                mca: true,
                gst: true,
                ubo: true
            },

            status: "approved"
        },

        {
            id: "ST003",
            role: "startup",
            name: "Urban AI Labs",
            email: "urban@demo.in",
            password: "startup123",

            dpiitNumber: "DIPP999888",
            cin: "U72900MH2019PTC555555",
            gstin: "27ABCDE9999F1Z9",

            companyAge: 7,
            publicCompany: false,
            annualTurnover: 75,

            field: "Artificial Intelligence",

            uboDeclaration: true,

            verification: {
                dpiit: true,
                mca: true,
                gst: true,
                ubo: true
            },

            status: "approved"
        },

        {
            id: "GOV001",
            role: "government",
            name: "Department of Digital Governance",
            email: "gov@demo.in",
            password: "gov123",

            department: "Ministry of Electronics & Digital Governance",
            designation: "Procurement Officer",

            status: "approved"
        }

    ],


    opportunities: [

        {
            id: "OPP001",

            title: "Smart Municipal Complaint Management System",

            department: "Department of Urban Development",

            field: "Information Technology",

            description:
                "Development of a centralized citizen complaint management platform with dashboards, ticketing, analytics and mobile support.",

            budget: 4800000,

            deadline: "2026-10-30",

            duration: "8 Months",

            status: "open",

            createdBy: "GOV001"
        },

        {
            id: "OPP002",

            title: "AI Based Crop Disease Detection",

            department: "Department of Agriculture",

            field: "Agriculture Technology",

            description:
                "Development of an AI system capable of identifying crop diseases from farmer-uploaded images.",

            budget: 6200000,

            deadline: "2026-11-15",

            duration: "10 Months",

            status: "open",

            createdBy: "GOV001"
        },

        {
            id: "OPP003",

            title: "AI Citizen Service Assistant",

            department: "Department of Digital Governance",

            field: "Artificial Intelligence",

            description:
                "Build a multilingual AI assistant for citizens to access government services and information.",

            budget: 7500000,

            deadline: "2026-12-01",

            duration: "12 Months",

            status: "open",

            createdBy: "GOV001"
        },

        {
            id: "OPP004",

            title: "Government Data Analytics Dashboard",

            department: "Planning Department",

            field: "Information Technology",

            description:
                "Design an analytics platform for monitoring departmental KPIs and public service delivery.",

            budget: 3200000,

            deadline: "2026-09-30",

            duration: "6 Months",

            status: "open",

            createdBy: "GOV001"
        }

    ],


    applications: [

        {
            id: "APP001",

            opportunityId: "OPP001",

            startupId: "ST001",

            status: "accepted",

            progress: 65,

            contractValue: 4800000,

            paid: 2400000,

            milestones: [
                {
                    name: "Project Initiation",
                    amount: 960000,
                    status: "paid"
                },
                {
                    name: "Prototype",
                    amount: 1440000,
                    status: "paid"
                },
                {
                    name: "Beta Deployment",
                    amount: 1440000,
                    status: "pending"
                },
                {
                    name: "Final Delivery",
                    amount: 960000,
                    status: "pending"
                }
            ]
        }

    ]

};


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadDatabase() {

    const stored = localStorage.getItem("govconnect_db");

    if (!stored) {

        localStorage.setItem(
            "govconnect_db",
            JSON.stringify(DEMO_DB)
        );

        return structuredClone(DEMO_DB);
    }

    return JSON.parse(stored);
}


let DB = loadDatabase();


function saveDatabase() {

    localStorage.setItem(
        "govconnect_db",
        JSON.stringify(DB)
    );
}


/* =========================================================
   SESSION
========================================================= */

let currentUser = null;

const savedSession =
    localStorage.getItem("govconnect_session");

if (savedSession) {

    const user =
        DB.users.find(
            u => u.id === savedSession
        );

    if (user) {
        currentUser = user;
    }
}


/* =========================================================
   DOM
========================================================= */

const pageContainer =
    document.getElementById("pageContainer");

const sidebarNav =
    document.getElementById("sidebarNav");

const sidebar =
    document.getElementById("sidebar");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalTitle =
    document.getElementById("modalTitle");

const modalSubtitle =
    document.getElementById("modalSubtitle");

const modalBody =
    document.getElementById("modalBody");

const modalFooter =
    document.getElementById("modalFooter");


/* =========================================================
   HELPERS
========================================================= */

function money(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function initials(name) {

    return name
        .split(" ")
        .slice(0,2)
        .map(x => x[0])
        .join("")
        .toUpperCase();
}


function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function toast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    const item =
        document.createElement("div");

    item.className =
        `toast alert-${type}`;

    item.style.cssText = `
        position:fixed;
        right:25px;
        bottom:25px;
        z-index:3000;
        padding:13px 17px;
        border-radius:10px;
        box-shadow:0 10px 30px rgba(0,0,0,.15);
        font-size:11px;
        font-weight:600;
        max-width:350px;
    `;

    item.textContent = message;

    container.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 3500);
}


function openModal(title, subtitle, body, footer = "") {

    modalTitle.textContent = title;

    modalSubtitle.textContent =
        subtitle || "";

    modalBody.innerHTML =
        body || "";

    modalFooter.innerHTML =
        footer || "";

    modalOverlay.classList.add("show");
}


function closeModal() {

    modalOverlay.classList.remove("show");
}


document
    .getElementById("modalClose")
    .addEventListener("click", closeModal);


modalOverlay.addEventListener("click", e => {

    if (e.target === modalOverlay) {
        closeModal();
    }

});


/* =========================================================
   MOCK GOVERNMENT API VERIFICATION
========================================================= */

function mockDPIITVerification(number) {

    /*
        DEMO API

        Valid examples:
        DIPP123456
        DIPP654321
        DIPP999888
    */

    if (!number) {
        return false;
    }

    return /^DIPP\d{6}$/i.test(number);
}


function mockMCAVerification(cin) {

    if (!cin) {

        return {
            valid: false
        };

    }

    /*
        Demo CIN format.
    */

    const validFormat =
        /^[A-Z]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/i
            .test(cin);

    if (!validFormat) {

        return {
            valid: false
        };

    }

    /*
        Prototype derives demo company
        characteristics from supplied data.
    */

    const ageInput =
        document.getElementById("companyAge");

    const publicInput =
        document.getElementById("publicCompany");

    const age =
        ageInput
            ? Number(ageInput.value)
            : 5;

    const publicCompany =
        publicInput
            ? publicInput.value === "yes"
            : false;

    return {
        valid: true,
        ageYears: age,
        isPublicCompany: publicCompany
    };
}


function mockGSTVerification(gstin) {

    if (!gstin) {

        return {
            valid: false
        };

    }

    const valid =
        /^\d{2}[A-Z0-9]{5,15}$/i.test(gstin);

    if (!valid) {

        return {
            valid: false
        };

    }

    const turnoverInput =
        document.getElementById("annualTurnover");

    const turnover =
        turnoverInput
            ? Number(turnoverInput.value)
            : 0;

    return {
        valid: true,
        annualTurnover: turnover
    };
}


/* =========================================================
   STARTUP ELIGIBILITY ENGINE
========================================================= */

function verifyStartup(data) {

    const result = {

        approved: false,

        stages: {

            dpiit: {
                status: "pending",
                message: ""
            },

            mca: {
                status: "pending",
                message: ""
            },

            gst: {
                status: "pending",
                message: ""
            },

            ubo: {
                status: "pending",
                message: ""
            }

        },

        reason: ""

    };


    /* -------------------------
       DPIIT
    ------------------------- */

    if (
        !data.dpiitNumber ||
        !mockDPIITVerification(data.dpiitNumber)
    ) {

        result.stages.dpiit = {
            status: "failed",
            message:
                "Invalid or missing DPIIT/DIPP registration."
        };

        result.reason =
            "Startup blocked because DPIIT verification failed.";

        return result;

    }


    result.stages.dpiit = {

        status: "success",

        message:
            "DPIIT registration verified successfully."

    };


    /* -------------------------
       MCA
    ------------------------- */

    const mca =
        mockMCAVerification(data.cin);


    if (!mca.valid) {

        result.stages.mca = {

            status: "failed",

            message:
                "Invalid CIN or MCA verification failed."

        };

        result.reason =
            "Startup blocked because MCA/CIN verification failed.";

        return result;

    }


    if (mca.ageYears > 10) {

        result.stages.mca = {

            status: "failed",

            message:
                "Company age exceeds 10 years."

        };

        result.reason =
            "Startup role rejected because company age is more than 10 years.";

        return result;

    }


    if (mca.isPublicCompany) {

        result.stages.mca = {

            status: "failed",

            message:
                "Public companies are not eligible."

        };

        result.reason =
            "Startup role rejected because the company is publicly listed.";

        return result;

    }


    result.stages.mca = {

        status: "success",

        message:
            "MCA/CIN eligibility verified."

    };


    /* -------------------------
       GST
    ------------------------- */

    const gst =
        mockGSTVerification(data.gstin);


    if (!gst.valid) {

        result.stages.gst = {

            status: "failed",

            message:
                "Invalid GSTIN."

        };

        result.reason =
            "Startup blocked because GST verification failed.";

        return result;

    }


    if (gst.annualTurnover > 200) {

        result.stages.gst = {

            status: "failed",

            message:
                "Annual turnover exceeds ₹200 Cr."

        };

        result.reason =
            "Startup role rejected because annual turnover exceeds ₹200 Cr.";

        return result;

    }


    result.stages.gst = {

        status: "success",

        message:
            "GSTIN and turnover eligibility verified."

    };


    /* -------------------------
       UBO
    ------------------------- */

    if (!data.uboDeclaration) {

        result.stages.ubo = {

            status: "failed",

            message:
                "UBO declaration has not been completed."

        };

        result.reason =
            "Startup cannot be approved without UBO declaration.";

        return result;

    }


    result.stages.ubo = {

        status: "success",

        message:
            "Ultimate Beneficial Ownership declaration completed."

    };


    /* -------------------------
       APPROVED
    ------------------------- */

    result.approved = true;

    result.reason =
        "All startup eligibility checks passed.";

    return result;
}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

    renderPage(page);

    document.querySelectorAll(".nav-item")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.page === page
            );

        });

    sidebar.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SIDEBAR
========================================================= */

function updateSidebar() {

    const nav = document.getElementById("sidebarNav");

    if (!currentUser) {

        nav.innerHTML = `

            <button class="nav-item" data-page="landing">
                <span>⌂</span>
                Home
            </button>

            <button class="nav-item" data-page="login">
                <span>↪</span>
                Login
            </button>

            <button class="nav-item" data-page="startupRegister">
                <span>＋</span>
                Startup Registration
            </button>

            <button class="nav-item" data-page="governmentRegister">
                <span>＋</span>
                Government Registration
            </button>

        `;

        return;
    }


    if (currentUser.role === "startup") {

        nav.innerHTML = `

            <button class="nav-item" data-page="startupDashboard">
                <span>▦</span>
                Dashboard
            </button>

            <button class="nav-item" data-page="opportunities">
                <span>◈</span>
                Work Opportunities
            </button>

            <button class="nav-item" data-page="applications">
                <span>✓</span>
                My Applications
            </button>

            <button class="nav-item" data-page="payments">
                <span>₹</span>
                Payment Tracking
            </button>

            <button class="nav-item" data-page="startupProfile">
                <span>◎</span>
                Company Profile
            </button>

        `;

    } else {

        nav.innerHTML = `

            <button class="nav-item" data-page="governmentDashboard">
                <span>▦</span>
                Dashboard
            </button>

            <button class="nav-item" data-page="findStartups">
                <span>⌕</span>
                Find Startups
            </button>

            <button class="nav-item" data-page="postWork">
                <span>＋</span>
                Publish Work
            </button>

            <button class="nav-item" data-page="governmentWork">
                <span>◈</span>
                Published Work
            </button>

            <button class="nav-item" data-page="governmentPayments">
                <span>₹</span>
                Payments
            </button>

        `;

    }


    attachNavEvents();

}


function attachNavEvents() {

    document.querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => navigate(button.dataset.page)
            );

        });

}


/* =========================================================
   UPDATE USER UI
========================================================= */

function updateUserUI() {

    const sidebarName =
        document.getElementById("sidebarUserName");

    const sidebarRole =
        document.getElementById("sidebarUserRole");

    const sidebarAvatar =
        document.getElementById("sidebarAvatar");

    const topName =
        document.getElementById("topUserName");

    const topRole =
        document.getElementById("topUserRole");

    const topAvatar =
        document.getElementById("topAvatar");


    if (!currentUser) {

        sidebarName.textContent =
            "Guest User";

        sidebarRole.textContent =
            "Not Logged In";

        sidebarAvatar.textContent =
            "G";

        topName.textContent =
            "Guest";

        topRole.textContent =
            "Visitor";

        topAvatar.textContent =
            "G";

        return;
    }


    sidebarName.textContent =
        currentUser.name;

    sidebarRole.textContent =
        currentUser.role === "startup"
            ? "Verified Startup"
            : "Government Officer";

    sidebarAvatar.textContent =
        initials(currentUser.name);

    topName.textContent =
        currentUser.name;

    topRole.textContent =
        currentUser.role === "startup"
            ? "Startup"
            : "Government";

    topAvatar.textContent =
        initials(currentUser.name);
}


/* =========================================================
   LANDING PAGE
========================================================= */

function landingPage() {

    return `

        <div class="hero">

            <div class="status-badge status-info"
                 style="background:rgba(255,255,255,.12);color:white;">
                🇮🇳 SMART GOVERNANCE • SIH PROTOTYPE
            </div>

            <h1>
                Connecting Government
                Work With Verified Startups
            </h1>

            <p>
                GovConnect creates a trusted digital bridge between
                government departments and eligible startups.
                Only verified startups can receive government work
                opportunities.
            </p>

            <div class="hero-actions">

                <button class="btn btn-white"
                        onclick="navigate('login')">
                    Login to Portal →
                </button>

                <button class="btn"
                        style="background:rgba(255,255,255,.12);color:white;"
                        onclick="navigate('startupRegister')">
                    Register Startup
                </button>

                <button class="btn"
                        style="background:rgba(255,255,255,.12);color:white;"
                        onclick="navigate('governmentRegister')">
                    Government Registration
                </button>

            </div>

        </div>


        <h2 class="section-title">
            Platform Features
        </h2>

        <div class="grid-3">

            ${featureCard(
                "🛡️",
                "Verified Startup Network",
                "DPIIT, MCA, GST and UBO verification before startup approval."
            )}

            ${featureCard(
                "🏛️",
                "Government Work",
                "Government departments can discover suitable startups and publish work."
            )}

            ${featureCard(
                "💳",
                "Payment Tracking",
                "Startups can track contract values, milestones and government payments."
            )}

        </div>


        <h2 class="section-title">
            Verification Pipeline
        </h2>

        <div class="card">

            <div class="card-body">

                <div class="verification-flow">

                    ${verificationStep(
                        "DPIIT",
                        "Registration",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "MCA",
                        "CIN Check",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "GST",
                        "Turnover",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "UBO",
                        "Declaration",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "APPROVED",
                        "Startup",
                        "success"
                    )}

                </div>

            </div>

        </div>

        <div class="alert alert-info" style="margin-top:18px;">
            <strong>Prototype Notice:</strong>
            External verification services are represented using
            mock APIs in this SIH prototype. Production deployment
            should connect only to authorized government APIs.
        </div>

    `;
}


function featureCard(icon,title,text) {

    return `

        <div class="card">

            <div class="card-body">

                <div class="stat-icon">
                    ${icon}
                </div>

                <h3 style="font-size:14px;color:var(--dark);">
                    ${title}
                </h3>

                <p style="font-size:11px;color:var(--muted);margin-top:6px;">
                    ${text}
                </p>

            </div>

        </div>

    `;
}


function verificationStep(title,text,status) {

    return `

        <div class="verification-step step-${status}">

            <div class="step-icon">
                ✓
            </div>

            <strong>
                ${title}
            </strong>

            <small>
                ${text}
            </small>

        </div>

    `;
}


/* =========================================================
   LOGIN
========================================================= */

function loginPage() {

    return `

        <div class="login-wrapper">

            <div class="login-info">

                <div class="brand-logo">
                    G
                </div>

                <h1>
                    One Portal.
                    Two Experiences.
                </h1>

                <p>
                    Government departments and verified startups
                    get completely different dashboards designed
                    around their responsibilities.
                </p>

                <div class="login-points">

                    <div class="login-point">
                        ✓ Verified startup ecosystem
                    </div>

                    <div class="login-point">
                        ✓ Government work discovery
                    </div>

                    <div class="login-point">
                        ✓ Application lifecycle
                    </div>

                    <div class="login-point">
                        ✓ Milestone payment tracking
                    </div>

                </div>

            </div>


            <div class="login-form">

                <h2>
                    Welcome Back
                </h2>

                <p>
                    Sign in to your GovConnect account.
                </p>


                <div class="role-selector">

                    <button
                        class="role-option selected"
                        id="startupLoginRole"
                        onclick="selectLoginRole('startup')">

                        🚀 Startup

                    </button>

                    <button
                        class="role-option"
                        id="govLoginRole"
                        onclick="selectLoginRole('government')">

                        🏛️ Government

                    </button>

                </div>


                <form id="loginForm">

                    <div class="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            id="loginEmail"
                            type="email"
                            placeholder="Enter registered email"
                            required>

                    </div>

                    <br>

                    <div class="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            id="loginPassword"
                            type="password"
                            placeholder="Enter password"
                            required>

                    </div>

                    <br>

                    <button
                        class="btn btn-primary"
                        style="width:100%;"
                        type="submit">

                        Login to Portal →

                    </button>

                </form>


                <div class="alert alert-info"
                     style="margin-top:20px;">

                    <strong>Demo Startup:</strong><br>
                    startup@technova.demo / startup123

                    <br><br>

                    <strong>Demo Government:</strong><br>
                    gov@demo.in / gov123

                </div>


                <div style="text-align:center;margin-top:20px;">

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="navigate('startupRegister')">

                        Register Startup

                    </button>

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="navigate('governmentRegister')">

                        Register Government

                    </button>

                </div>

            </div>

        </div>

    `;
}


let selectedLoginRole = "startup";


function selectLoginRole(role) {

    selectedLoginRole = role;

    document
        .getElementById("startupLoginRole")
        .classList.toggle(
            "selected",
            role === "startup"
        );

    document
        .getElementById("govLoginRole")
        .classList.toggle(
            "selected",
            role === "government"
        );
}


function setupLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            const user =
                DB.users.find(
                    u =>
                        u.email.toLowerCase() ===
                        email.toLowerCase() &&
                        u.password === password &&
                        u.role === selectedLoginRole
                );


            if (!user) {

                toast(
                    "Invalid credentials or wrong portal selected.",
                    "danger"
                );

                return;
            }


            if (
                user.role === "startup" &&
                user.status !== "approved"
            ) {

                toast(
                    "This startup has not been approved.",
                    "danger"
                );

                return;
            }


            currentUser = user;

            localStorage.setItem(
                "govconnect_session",
                user.id
            );

            updateSidebar();
            updateUserUI();

            toast(
                "Login successful.",
                "success"
            );


            if (user.role === "startup") {

                navigate("startupDashboard");

            } else {

                navigate("governmentDashboard");

            }

        }
    );

}


/* =========================================================
   STARTUP REGISTRATION
========================================================= */

function startupRegisterPage() {

    return `

        <div class="page-header">

            <div>

                <h1>
                    Startup Registration
                </h1>

                <p>
                    Eligibility verification is mandatory before
                    a startup account can be approved.
                </p>

            </div>

            <span class="status-badge status-warning">
                Verification Required
            </span>

        </div>


        <div class="alert alert-warning">

            <strong>Startup Eligibility Gate:</strong>

            Registration is automatically blocked if DPIIT verification
            fails, MCA data is invalid, company age exceeds 10 years,
            the company is public, GST turnover exceeds ₹200 Cr,
            or UBO declaration is missing.

        </div>


        <div class="card form-card">

            <form id="startupRegistrationForm">


                <!-- BASIC INFORMATION -->

                <div class="form-section">

                    <h3>
                        01. Company Information
                    </h3>

                    <p>
                        Enter official company registration information.
                    </p>


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                Company / Startup Name *
                            </label>

                            <input
                                id="startupName"
                                required
                                placeholder="Example: ABC Innovations Pvt. Ltd.">

                        </div>


                        <div class="form-group">

                            <label>
                                Startup Email *
                            </label>

                            <input
                                id="startupEmail"
                                type="email"
                                required
                                placeholder="official@startup.in">

                        </div>


                        <div class="form-group">

                            <label>
                                Password *
                            </label>

                            <input
                                id="startupPassword"
                                type="password"
                                required
                                minlength="6"
                                placeholder="Minimum 6 characters">

                        </div>


                        <div class="form-group">

                            <label>
                                Primary Work Field *
                            </label>

                            <select id="startupField" required>

                                <option value="">
                                    Select field
                                </option>

                                <option>
                                    Information Technology
                                </option>

                                <option>
                                    Artificial Intelligence
                                </option>

                                <option>
                                    Agriculture Technology
                                </option>

                                <option>
                                    Healthcare Technology
                                </option>

                                <option>
                                    Clean Energy
                                </option>

                                <option>
                                    FinTech
                                </option>

                                <option>
                                    Cybersecurity
                                </option>

                                <option>
                                    Manufacturing
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                <!-- DPIIT -->

                <div class="form-section">

                    <h3>
                        02. DPIIT Verification
                    </h3>

                    <p>
                        Startup recognition verification.
                    </p>


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                DPIIT / DIPP Number *
                            </label>

                            <input
                                id="dpiitNumber"
                                required
                                placeholder="Example: DIPP123456">

                            <span class="form-help">
                                Demo valid format: DIPP + 6 digits
                            </span>

                        </div>

                    </div>

                </div>


                <!-- MCA -->

                <div class="form-section">

                    <h3>
                        03. MCA / CIN Verification
                    </h3>

                    <p>
                        Company age and company type are checked.
                    </p>


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                CIN *
                            </label>

                            <input
                                id="cin"
                                required
                                placeholder="Example: U72900DL2020PTC123456">

                        </div>


                        <div class="form-group">

                            <label>
                                Company Age *
                            </label>

                            <input
                                id="companyAge"
                                type="number"
                                min="0"
                                required
                                placeholder="Years">

                        </div>


                        <div class="form-group">

                            <label>
                                Company Type
                            </label>

                            <select id="publicCompany">

                                <option value="no">
                                    Private Company
                                </option>

                                <option value="yes">
                                    Public Company
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                <!-- GST -->

                <div class="form-section">

                    <h3>
                        04. GST / Turnover Verification
                    </h3>

                    <p>
                        Turnover must not exceed ₹200 Cr for startup eligibility.
                    </p>


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                GSTIN *
                            </label>

                            <input
                                id="gstin"
                                required
                                placeholder="Example: 07ABCDE1234F1Z5">

                        </div>


                        <div class="form-group">

                            <label>
                                Annual Turnover (₹ Crore) *
                            </label>

                            <input
                                id="annualTurnover"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                placeholder="Example: 45">

                        </div>

                    </div>

                </div>


                <!-- UBO -->

                <div class="form-section">

                    <h3>
                        05. Ultimate Beneficial Ownership
                    </h3>

                    <p>
                        The applicant must declare beneficial ownership.
                    </p>


                    <label class="checkbox">

                        <input
                            id="uboDeclaration"
                            type="checkbox">

                        <span>
                            I declare that the Ultimate Beneficial Ownership
                            information submitted by this startup is true,
                            complete and accurate. I understand that
                            misrepresentation can result in rejection.
                        </span>

                    </label>

                </div>


                <!-- VERIFICATION -->

                <div class="form-section">

                    <div class="verification-panel">

                        <div class="verification-title">

                            <h3>
                                Automated Eligibility Verification
                            </h3>

                            <span
                                class="status-badge status-info">
                                DEMO API
                            </span>

                        </div>


                        <div class="verification-flow">

                            ${verificationStep(
                                "DPIIT",
                                "Pending",
                                "neutral"
                            )}

                            <div class="verification-arrow">
                                →
                            </div>

                            ${verificationStep(
                                "MCA",
                                "Pending",
                                "neutral"
                            )}

                            <div class="verification-arrow">
                                →
                            </div>

                            ${verificationStep(
                                "GST",
                                "Pending",
                                "neutral"
                            )}

                            <div class="verification-arrow">
                                →
                            </div>

                            ${verificationStep(
                                "UBO",
                                "Pending",
                                "neutral"
                            )}

                            <div class="verification-arrow">
                                →
                            </div>

                            ${verificationStep(
                                "APPROVED",
                                "Pending",
                                "neutral"
                            )}

                        </div>

                    </div>

                </div>


                <div class="form-actions">

                    <button
                        type="button"
                        class="btn btn-outline"
                        onclick="navigate('landing')">

                        Cancel

                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary">

                        Verify & Register Startup →

                    </button>

                </div>


            </form>

        </div>

    `;
}


/* =========================================================
   STARTUP REGISTRATION PROCESS
========================================================= */

function setupStartupRegistration() {

    const form =
        document.getElementById(
            "startupRegistrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();


            const data = {

                name:
                    document.getElementById("startupName").value.trim(),

                email:
                    document.getElementById("startupEmail").value.trim(),

                password:
                    document.getElementById("startupPassword").value,

                field:
                    document.getElementById("startupField").value,

                dpiitNumber:
                    document.getElementById("dpiitNumber").value.trim(),

                cin:
                    document.getElementById("cin").value.trim(),

                companyAge:
                    Number(document.getElementById("companyAge").value),

                publicCompany:
                    document.getElementById("publicCompany").value === "yes",

                gstin:
                    document.getElementById("gstin").value.trim(),

                annualTurnover:
                    Number(document.getElementById("annualTurnover").value),

                uboDeclaration:
                    document.getElementById("uboDeclaration").checked

            };


            /* Duplicate email */

            if (
                DB.users.some(
                    u =>
                        u.email.toLowerCase() ===
                        data.email.toLowerCase()
                )
            ) {

                toast(
                    "An account with this email already exists.",
                    "danger"
                );

                return;
            }


            /*
                Show verification modal
            */

            openModal(
                "Running Startup Verification",
                "Checking eligibility across verification stages...",
                `
                    <div style="text-align:center;padding:20px;">

                        <div class="loader"
                             style="margin:auto;width:35px;height:35px;border-width:4px;">
                        </div>

                        <p style="margin-top:15px;font-size:12px;">
                            Connecting to demo DPIIT, MCA and GST verification services...
                        </p>

                    </div>
                `,
                ""
            );


            await delay(900);


            const result =
                verifyStartup(data);


            closeModal();


            if (!result.approved) {

                showVerificationFailure(result);

                return;
            }


            /* Create account */

            const newUser = {

                id:
                    "ST" +
                    String(DB.users.length + 1)
                        .padStart(3,"0"),

                role: "startup",

                name: data.name,

                email: data.email,

                password: data.password,

                dpiitNumber: data.dpiitNumber,

                cin: data.cin,

                gstin: data.gstin,

                companyAge: data.companyAge,

                publicCompany: data.publicCompany,

                annualTurnover: data.annualTurnover,

                field: data.field,

                uboDeclaration: true,

                verification: {
                    dpiit: true,
                    mca: true,
                    gst: true,
                    ubo: true
                },

                status: "approved"

            };


            DB.users.push(newUser);

            saveDatabase();


            openModal(
                "Startup Approved ✓",
                "All eligibility checks have passed.",
                `
                    <div class="alert alert-success">
                        <strong>${escapeHTML(data.name)}</strong>
                        has successfully passed all verification checks.
                    </div>

                    ${verificationResultHTML(result)}

                    <div class="alert alert-info">
                        Your Startup ID is
                        <strong>${newUser.id}</strong>.
                    </div>
                `,
                `
                    <button class="btn btn-primary"
                            onclick="loginRegisteredStartup('${newUser.id}')">
                        Continue to Startup Dashboard →
                    </button>
                `
            );

        }
    );

}


function delay(ms) {

    return new Promise(
        resolve => setTimeout(resolve,ms)
    );
}


function verificationResultHTML(result) {

    return `

        <div class="verification-flow">

            ${resultStep(
                "DPIIT",
                result.stages.dpiit
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "MCA",
                result.stages.mca
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "GST",
                result.stages.gst
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "UBO",
                result.stages.ubo
            )}

            <div class="verification-arrow">→</div>

            ${verificationStep(
                "APPROVED",
                "Eligible",
                "success"
            )}

        </div>

    `;
}


function resultStep(title,stage) {

    const status =
        stage.status === "success"
            ? "success"
            : "failed";

    return `

        <div class="verification-step step-${status}">

            <div class="step-icon">

                ${status === "success" ? "✓" : "×"}

            </div>

            <strong>
                ${title}
            </strong>

            <small>
                ${escapeHTML(stage.message)}
            </small>

        </div>

    `;
}


function showVerificationFailure(result) {

    openModal(
        "Startup Registration Rejected",
        "The startup did not pass the eligibility gate.",
        `
            <div class="alert alert-danger">

                <strong>
                    Registration Blocked
                </strong>

                <p style="margin-top:5px;">
                    ${escapeHTML(result.reason)}
                </p>

            </div>

            ${verificationFailureFlow(result)}

            <div class="alert alert-warning"
                 style="margin-top:15px;">

                The startup account has NOT been created.
                Correct the information and submit again.

            </div>
        `,
        `
            <button class="btn btn-outline"
                    onclick="closeModal()">
                Correct Details
            </button>
        `
    );

}


function verificationFailureFlow(result) {

    return `

        <div class="verification-flow">

            ${resultStep(
                "DPIIT",
                result.stages.dpiit
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "MCA",
                result.stages.mca
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "GST",
                result.stages.gst
            )}

            <div class="verification-arrow">→</div>

            ${resultStep(
                "UBO",
                result.stages.ubo
            )}

        </div>

    `;
}


function loginRegisteredStartup(id) {

    closeModal();

    const user =
        DB.users.find(
            u => u.id === id
        );

    if (!user) return;

    currentUser = user;

    localStorage.setItem(
        "govconnect_session",
        user.id
    );

    updateSidebar();
    updateUserUI();

    navigate("startupDashboard");

}


/* =========================================================
   GOVERNMENT REGISTRATION
========================================================= */

function governmentRegisterPage() {

    return `

        <div class="page-header">

            <div>

                <h1>
                    Government Registration
                </h1>

                <p>
                    Create an account for authorized government personnel.
                </p>

            </div>

            <span class="status-badge status-info">
                Government Portal
            </span>

        </div>


        <div class="card form-card">

            <form id="governmentRegistrationForm">

                <div class="form-section">

                    <h3>
                        Department Information
                    </h3>

                    <p>
                        Enter your department and official identity.
                    </p>


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                Officer Name *
                            </label>

                            <input
                                id="govName"
                                required
                                placeholder="Full name">

                        </div>


                        <div class="form-group">

                            <label>
                                Official Email *
                            </label>

                            <input
                                id="govEmail"
                                type="email"
                                required
                                placeholder="official email">

                        </div>


                        <div class="form-group">

                            <label>
                                Password *
                            </label>

                            <input
                                id="govPassword"
                                type="password"
                                minlength="6"
                                required>

                        </div>


                        <div class="form-group">

                            <label>
                                Designation *
                            </label>

                            <input
                                id="govDesignation"
                                required
                                placeholder="Procurement Officer">

                        </div>


                        <div class="form-group full">

                            <label>
                                Department *
                            </label>

                            <input
                                id="govDepartment"
                                required
                                placeholder="Department / Ministry">

                        </div>

                    </div>

                </div>


                <div class="form-section">

                    <label class="checkbox">

                        <input
                            id="govDeclaration"
                            type="checkbox"
                            required>

                        <span>
                            I confirm that I am authorized to use
                            this government portal and the information
                            provided is accurate.
                        </span>

                    </label>

                </div>


                <div class="form-actions">

                    <button
                        type="button"
                        class="btn btn-outline"
                        onclick="navigate('landing')">
                        Cancel
                    </button>

                    <button
                        class="btn btn-primary"
                        type="submit">
                        Create Government Account →
                    </button>

                </div>

            </form>

        </div>

    `;
}


function setupGovernmentRegistration() {

    const form =
        document.getElementById(
            "governmentRegistrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const email =
                document
                    .getElementById("govEmail")
                    .value.trim();


            if (
                DB.users.some(
                    u =>
                        u.email.toLowerCase() ===
                        email.toLowerCase()
                )
            ) {

                toast(
                    "Email is already registered.",
                    "danger"
                );

                return;

            }


            const user = {

                id:
                    "GOV" +
                    String(
                        DB.users.filter(
                            u => u.role === "government"
                        ).length + 1
                    ).padStart(3,"0"),

                role: "government",

                name:
                    document.getElementById("govName").value,

                email,

                password:
                    document.getElementById("govPassword").value,

                designation:
                    document.getElementById("govDesignation").value,

                department:
                    document.getElementById("govDepartment").value,

                status: "approved"

            };


            DB.users.push(user);

            saveDatabase();


            openModal(
                "Government Account Created",
                "Your government portal account is ready.",
                `
                    <div class="alert alert-success">
                        Government account successfully created.
                    </div>

                    <div class="detail">
                        <span>Government ID</span>
                        <strong>${user.id}</strong>
                    </div>
                `,
                `
                    <button
                        class="btn btn-primary"
                        onclick="loginRegisteredStartup('${user.id}')">
                        Enter Government Dashboard →
                    </button>
                `
            );

        }
    );

}


/* =========================================================
   STARTUP DASHBOARD
========================================================= */

function startupDashboardPage() {

    const user = currentUser;

    const applications =
        DB.applications.filter(
            a => a.startupId === user.id
        );

    const relevant =
        getRelevantOpportunities(user);

    const totalContract =
        applications.reduce(
            (sum,a) => sum + a.contractValue,
            0
        );

    const totalPaid =
        applications.reduce(
            (sum,a) => sum + a.paid,
            0
        );


    return `

        <div class="page-header">

            <div>

                <h1>
                    Startup Dashboard
                </h1>

                <p>
                    Welcome back, ${escapeHTML(user.name)}.
                    Here is your government work ecosystem.
                </p>

            </div>

            <span class="status-badge status-success">
                ✓ VERIFIED STARTUP
            </span>

        </div>


        <div class="stats-grid">

            ${statCard(
                "💼",
                relevant.length,
                "Matching Work Opportunities",
                "Based on your work field"
            )}

            ${statCard(
                "✓",
                applications.length,
                "Active Applications",
                "Accepted government work"
            )}

            ${statCard(
                "₹",
                money(totalContract),
                "Contract Value",
                "Total accepted work"
            )}

            ${statCard(
                "💳",
                money(totalPaid),
                "Payments Received",
                "Milestones paid"
            )}

        </div>


        <h2 class="section-title">
            Your Verification
        </h2>

        <div class="card">

            <div class="card-body">

                <div class="verification-flow">

                    ${verificationStep(
                        "DPIIT",
                        "Verified",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "MCA",
                        "Eligible",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "GST",
                        "₹" + user.annualTurnover + " Cr",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "UBO",
                        "Declared",
                        "success"
                    )}

                    <div class="verification-arrow">→</div>

                    ${verificationStep(
                        "APPROVED",
                        "Startup",
                        "success"
                    )}

                </div>

            </div>

        </div>


        <div class="grid-2"
             style="margin-top:18px;">

            <div class="card">

                <div class="card-header">

                    <div>

                        <h3>
                            New Work Opportunities
                        </h3>

                        <p>
                            Government work matching your field
                        </p>

                    </div>

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="navigate('opportunities')">
                        View All
                    </button>

                </div>

                <div class="card-body">

                    ${
                        relevant.length
                        ? relevant.slice(0,2)
                            .map(opportunityCard)
                            .join("")
                        : emptyState(
                            "◈",
                            "No matching work",
                            "New government opportunities will appear here."
                        )
                    }

                </div>

            </div>


            <div class="card">

                <div class="card-header">

                    <div>

                        <h3>
                            Payment Overview
                        </h3>

                        <p>
                            Your government contract payments
                        </p>

                    </div>

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="navigate('payments')">
                        Details
                    </button>

                </div>

                <div class="card-body">

                    <div class="payment-card">

                        <span class="payment-label">
                            TOTAL RECEIVED
                        </span>

                        <div class="payment-value">
                            ${money(totalPaid)}
                        </div>

                        <span class="payment-label">
                            of ${money(totalContract)}
                        </span>

                        <div class="payment-progress">

                            <div style="
                                width:${
                                    totalContract
                                    ? (totalPaid / totalContract * 100)
                                    : 0
                                }%;
                            "></div>

                        </div>

                        <small>
                            ${
                                totalContract
                                ? Math.round(
                                    totalPaid /
                                    totalContract *
                                    100
                                  )
                                : 0
                            }% contract value received
                        </small>

                    </div>

                </div>

            </div>

        </div>

    `;
}


function statCard(icon,value,label,change) {

    return `

        <div class="stat-card">

            <div class="stat-icon">
                ${icon}
            </div>

            <div class="stat-value">
                ${value}
            </div>

            <div class="stat-label">
                ${label}
            </div>

            <div class="stat-change">
                ${change}
            </div>

        </div>

    `;
}


/* =========================================================
   WORK OPPORTUNITIES
========================================================= */

function getRelevantOpportunities(user) {

    return DB.opportunities.filter(
        opportunity => {

            const matchingField =
                opportunity.field === user.field;

            const alreadyApplied =
                DB.applications.some(
                    a =>
                        a.opportunityId === opportunity.id &&
                        a.startupId === user.id
                );

            return (
                matchingField &&
                opportunity.status === "open" &&
                !alreadyApplied
            );

        }
    );

}


function opportunitiesPage() {

    const user = currentUser;

    const relevant =
        getRelevantOpportunities(user);


    return `

        <div class="page-header">

            <div>

                <h1>
                    Work Opportunities
                </h1>

                <p>
                    Government work specifically matched to
                    <strong>${escapeHTML(user.field)}</strong>.
                </p>

            </div>

            <span class="status-badge status-info">
                ${relevant.length} MATCHES
            </span>

        </div>


        <div class="alert alert-info">

            <strong>Smart Matching:</strong>

            This section shows only government work whose
            required field matches your startup's registered
            primary field.

        </div>


        ${
            relevant.length
            ? `
                <div class="grid-2">
                    ${relevant
                        .map(opportunityCard)
                        .join("")
                    }
                </div>
            `
            : emptyState(
                "◈",
                "No matching government work available",
                "There are currently no open opportunities matching your registered work field."
            )
        }

    `;
}


function opportunityCard(opportunity) {

    return `

        <div class="opportunity-card">

            <div class="opportunity-top">

                <div>

                    <div class="opportunity-title">
                        ${escapeHTML(opportunity.title)}
                    </div>

                    <div class="opportunity-org">
                        🏛️ ${escapeHTML(opportunity.department)}
                    </div>

                </div>

                <span class="status-badge status-success">
                    OPEN
                </span>

            </div>


            <p class="opportunity-description">
                ${escapeHTML(opportunity.description)}
            </p>


            <div class="tags">

                <span class="tag">
                    ${escapeHTML(opportunity.field)}
                </span>

                <span class="tag">
                    Government Work
                </span>

            </div>


            <div class="opportunity-meta">

                <div class="meta-box">

                    <span>
                        CONTRACT VALUE
                    </span>

                    <strong>
                        ${money(opportunity.budget)}
                    </strong>

                </div>


                <div class="meta-box">

                    <span>
                        DURATION
                    </span>

                    <strong>
                        ${opportunity.duration}
                    </strong>

                </div>


                <div class="meta-box">

                    <span>
                        DEADLINE
                    </span>

                    <strong>
                        ${formatDate(opportunity.deadline)}
                    </strong>

                </div>

            </div>


            <div class="opportunity-actions">

                <button
                    class="btn btn-outline btn-sm"
                    onclick="viewOpportunity('${opportunity.id}')">

                    👁 Review Details

                </button>

                <button
                    class="btn btn-success btn-sm"
                    onclick="acceptOpportunity('${opportunity.id}')">

                    ✓ Accept Work

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="rejectOpportunity('${opportunity.id}')">

                    × Reject

                </button>

            </div>

        </div>

    `;
}


/* =========================================================
   OPPORTUNITY DETAILS
========================================================= */

function viewOpportunity(id) {

    const opportunity =
        DB.opportunities.find(
            o => o.id === id
        );

    if (!opportunity) return;


    openModal(
        opportunity.title,
        opportunity.department,
        `

            <div class="grid-2">

                <div class="detail">

                    <span>
                        Work Field
                    </span>

                    <strong>
                        ${escapeHTML(opportunity.field)}
                    </strong>

                </div>


                <div class="detail">

                    <span>
                        Contract Value
                    </span>

                    <strong>
                        ${money(opportunity.budget)}
                    </strong>

                </div>


                <div class="detail">

                    <span>
                        Duration
                    </span>

                    <strong>
                        ${opportunity.duration}
                    </strong>

                </div>


                <div class="detail">

                    <span>
                        Deadline
                    </span>

                    <strong>
                        ${formatDate(opportunity.deadline)}
                    </strong>

                </div>

            </div>


            <div style="margin-top:18px;">

                <h3 style="font-size:12px;color:var(--dark);">
                    Scope of Work
                </h3>

                <p style="font-size:11px;color:var(--muted);margin-top:7px;">
                    ${escapeHTML(opportunity.description)}
                </p>

            </div>

        `,
        `

            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Close
            </button>

            <button
                class="btn btn-success"
                onclick="acceptOpportunity('${id}')">
                Accept Work
            </button>

            <button
                class="btn btn-danger"
                onclick="rejectOpportunity('${id}')">
                Reject
            </button>

        `
    );

}


function acceptOpportunity(id) {

    if (!currentUser) return;


    const opportunity =
        DB.opportunities.find(
            o => o.id === id
        );

    if (!opportunity) return;


    if (
        opportunity.field !==
        currentUser.field
    ) {

        toast(
            "This opportunity does not match your registered field.",
            "danger"
        );

        return;

    }


    const application = {

        id:
            "APP" +
            String(DB.applications.length + 1)
                .padStart(3,"0"),

        opportunityId: id,

        startupId: currentUser.id,

        status: "accepted",

        progress: 0,

        contractValue: opportunity.budget,

        paid: 0,

        milestones: [

            {
                name: "Project Initiation",
                amount: opportunity.budget * .20,
                status: "pending"
            },

            {
                name: "Prototype / First Milestone",
                amount: opportunity.budget * .30,
                status: "pending"
            },

            {
                name: "Beta / Second Milestone",
                amount: opportunity.budget * .30,
                status: "pending"
            },

            {
                name: "Final Delivery",
                amount: opportunity.budget * .20,
                status: "pending"
            }

        ]

    };


    DB.applications.push(application);

    saveDatabase();

    closeModal();

    toast(
        "Government work accepted successfully.",
        "success"
    );

    navigate("applications");

}


function rejectOpportunity(id) {

    const opportunity =
        DB.opportunities.find(
            o => o.id === id
        );

    if (!opportunity) return;


    closeModal();


    openModal(
        "Reject Work Opportunity",
        "Please confirm your decision.",
        `

            <div class="alert alert-warning">

                Are you sure you want to reject
                <strong>${escapeHTML(opportunity.title)}</strong>?

            </div>

            <div class="form-group">

                <label>
                    Rejection Reason
                </label>

                <textarea
                    id="rejectionReason"
                    placeholder="Optional reason">
                </textarea>

            </div>

        `,
        `

            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Cancel
            </button>

            <button
                class="btn btn-danger"
                onclick="confirmReject('${id}')">
                Confirm Rejection
            </button>

        `
    );

}


function confirmReject(id) {

    closeModal();

    toast(
        "Work opportunity rejected.",
        "warning"
    );

}


/* =========================================================
   APPLICATIONS
========================================================= */

function applicationsPage() {

    const applications =
        DB.applications.filter(
            a => a.startupId === currentUser.id
        );


    return `

        <div class="page-header">

            <div>

                <h1>
                    My Applications
                </h1>

                <p>
                    Track government work that your startup has accepted.
                </p>

            </div>

        </div>


        ${
            applications.length
            ? `
                <div class="card">

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>

                                <tr>

                                    <th>
                                        APPLICATION
                                    </th>

                                    <th>
                                        GOVERNMENT DEPARTMENT
                                    </th>

                                    <th>
                                        VALUE
                                    </th>

                                    <th>
                                        PROGRESS
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        ACTION
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${
                                    applications
                                        .map(applicationRow)
                                        .join("")
                                }

                            </tbody>

                        </table>

                    </div>

                </div>
            `
            : emptyState(
                "✓",
                "No accepted work yet",
                "Accept a matching government opportunity to see it here."
            )
        }

    `;
}


function applicationRow(application) {

    const opportunity =
        DB.opportunities.find(
            o => o.id === application.opportunityId
        );


    return `

        <tr>

            <td>

                <strong style="color:var(--dark);">
                    ${escapeHTML(opportunity?.title || "Work")}
                </strong>

                <br>

                <span style="font-size:8px;color:var(--muted);">
                    ${application.id}
                </span>

            </td>

            <td>
                ${escapeHTML(
                    opportunity?.department || "-"
                )}
            </td>

            <td>
                ${money(application.contractValue)}
            </td>

            <td>

                <div style="min-width:120px;">

                    <div style="
                        height:6px;
                        background:#e2e8f0;
                        border-radius:10px;
                        overflow:hidden;
                    ">

                        <div style="
                            width:${application.progress}%;
                            height:100%;
                            background:#2563eb;
                        "></div>

                    </div>

                    <small>
                        ${application.progress}%
                    </small>

                </div>

            </td>

            <td>

                <span class="status-badge status-success">
                    ACCEPTED
                </span>

            </td>

            <td>

                <button
                    class="btn btn-outline btn-sm"
                    onclick="viewApplication('${application.id}')">
                    View
                </button>

            </td>

        </tr>

    `;

}


function viewApplication(id) {

    const application =
        DB.applications.find(
            a => a.id === id
        );

    if (!application) return;


    const opportunity =
        DB.opportunities.find(
            o => o.id === application.opportunityId
        );


    openModal(
        "Application Details",
        application.id,
        `

            <div class="grid-2">

                <div class="detail">

                    <span>
                        Government Work
                    </span>

                    <strong>
                        ${escapeHTML(opportunity.title)}
                    </strong>

                </div>

                <div class="detail">

                    <span>
                        Department
                    </span>

                    <strong>
                        ${escapeHTML(opportunity.department)}
                    </strong>

                </div>

                <div class="detail">

                    <span>
                        Contract Value
                    </span>

                    <strong>
                        ${money(application.contractValue)}
                    </strong>

                </div>

                <div class="detail">

                    <span>
                        Payment Received
                    </span>

                    <strong>
                        ${money(application.paid)}
                    </strong>

                </div>

            </div>


            <h3 style="
                margin:20px 0 10px;
                font-size:13px;
                color:var(--dark);
            ">
                Milestone Tracking
            </h3>


            <div class="timeline">

                ${
                    application.milestones
                        .map(m => `

                            <div class="timeline-item">

                                <div class="timeline-dot"
                                     style="
                                        background:${
                                            m.status === "paid"
                                            ? "#16a34a"
                                            : "#2563eb"
                                        };
                                     ">
                                </div>

                                <strong>
                                    ${escapeHTML(m.name)}
                                </strong>

                                <p>
                                    ${money(m.amount)}
                                </p>

                                <small>
                                    ${
                                        m.status === "paid"
                                        ? "Payment Released"
                                        : "Payment Pending"
                                    }
                                </small>

                            </div>

                        `)
                        .join("")
                }

            </div>

        `,
        `
            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Close
            </button>
        `
    );

}


/* =========================================================
   STARTUP PAYMENTS
========================================================= */

function paymentsPage() {

    const applications =
        DB.applications.filter(
            a => a.startupId === currentUser.id
        );


    const totalContract =
        applications.reduce(
            (sum,a) => sum + a.contractValue,
            0
        );

    const totalPaid =
        applications.reduce(
            (sum,a) => sum + a.paid,
            0
        );

    const totalPending =
        totalContract - totalPaid;


    return `

        <div class="page-header">

            <div>

                <h1>
                    Payment Tracking
                </h1>

                <p>
                    Track government payments against accepted work.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "📄",
                money(totalContract),
                "Total Contract Value",
                "Accepted government work"
            )}

            ${statCard(
                "✓",
                money(totalPaid),
                "Received",
                "Government payments"
            )}

            ${statCard(
                "⏳",
                money(totalPending),
                "Pending",
                "Awaiting milestones"
            )}

            ${statCard(
                "📊",
                totalContract
                    ? Math.round(
                        totalPaid /
                        totalContract *
                        100
                    ) + "%"
                    : "0%",
                "Payment Completion",
                "Contract value received"
            )}

        </div>


        <h2 class="section-title">
            Contract Payment Ledger
        </h2>


        ${
            applications.length
            ? `
                <div class="card">

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>

                                <tr>

                                    <th>
                                        PROJECT
                                    </th>

                                    <th>
                                        CONTRACT
                                    </th>

                                    <th>
                                        RECEIVED
                                    </th>

                                    <th>
                                        PENDING
                                    </th>

                                    <th>
                                        MILESTONES
                                    </th>

                                    <th>
                                        ACTION
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${
                                    applications
                                        .map(paymentRow)
                                        .join("")
                                }

                            </tbody>

                        </table>

                    </div>

                </div>
            `
            : emptyState(
                "₹",
                "No payment records",
                "Payments will appear after accepting government work."
            )
        }

    `;
}


function paymentRow(application) {

    const opportunity =
        DB.opportunities.find(
            o => o.id === application.opportunityId
        );


    const paidMilestones =
        application.milestones.filter(
            m => m.status === "paid"
        ).length;


    return `

        <tr>

            <td>

                <strong style="color:var(--dark);">
                    ${escapeHTML(opportunity.title)}
                </strong>

                <br>

                <span style="font-size:8px;color:var(--muted);">
                    ${application.id}
                </span>

            </td>

            <td>
                ${money(application.contractValue)}
            </td>

            <td style="color:#15803d;font-weight:700;">
                ${money(application.paid)}
            </td>

            <td style="color:#b45309;font-weight:700;">
                ${money(
                    application.contractValue -
                    application.paid
                )}
            </td>

            <td>
                ${paidMilestones}/${application.milestones.length}
            </td>

            <td>

                <button
                    class="btn btn-outline btn-sm"
                    onclick="viewApplication('${application.id}')">
                    View Ledger
                </button>

            </td>

        </tr>

    `;

}


/* =========================================================
   STARTUP PROFILE
========================================================= */

function startupProfilePage() {

    const u = currentUser;


    return `

        <div class="page-header">

            <div>

                <h1>
                    Company Profile
                </h1>

                <p>
                    Verified information associated with your startup account.
                </p>

            </div>

            <span class="status-badge status-success">
                ✓ APPROVED
            </span>

        </div>


        <div class="card">

            <div class="startup-profile">

                <div class="profile-head">

                    <div class="profile-logo">
                        ${initials(u.name)}
                    </div>

                    <div>

                        <h2>
                            ${escapeHTML(u.name)}
                        </h2>

                        <p>
                            ${escapeHTML(u.field)}
                        </p>

                    </div>

                </div>


                <div class="profile-details">

                    ${profileDetail(
                        "Startup ID",
                        u.id
                    )}

                    ${profileDetail(
                        "Email",
                        u.email
                    )}

                    ${profileDetail(
                        "DPIIT Number",
                        u.dpiitNumber
                    )}

                    ${profileDetail(
                        "CIN",
                        u.cin
                    )}

                    ${profileDetail(
                        "GSTIN",
                        u.gstin
                    )}

                    ${profileDetail(
                        "Company Age",
                        u.companyAge + " years"
                    )}

                    ${profileDetail(
                        "Annual Turnover",
                        "₹" + u.annualTurnover + " Cr"
                    )}

                    ${profileDetail(
                        "Company Type",
                        u.publicCompany
                            ? "Public Company"
                            : "Private Company"
                    )}

                </div>


                <div style="margin-top:20px;">

                    <div class="alert alert-success">

                        <strong>
                            Startup Eligibility Status: APPROVED
                        </strong>

                        <br>

                        DPIIT ✓ &nbsp;
                        MCA ✓ &nbsp;
                        GST ✓ &nbsp;
                        UBO ✓

                    </div>

                </div>

            </div>

        </div>

    `;

}


function profileDetail(label,value) {

    return `

        <div class="detail">

            <span>
                ${label}
            </span>

            <strong>
                ${escapeHTML(value)}
            </strong>

        </div>

    `;
}


/* =========================================================
   GOVERNMENT DASHBOARD
========================================================= */

function governmentDashboardPage() {

    const startups =
        DB.users.filter(
            u => u.role === "startup" &&
                 u.status === "approved"
        );

    const work =
        DB.opportunities.filter(
            o => o.createdBy === currentUser.id
        );

    const applications =
        DB.applications;


    const totalValue =
        applications.reduce(
            (sum,a) => sum + a.contractValue,
            0
        );


    return `

        <div class="page-header">

            <div>

                <h1>
                    Government Dashboard
                </h1>

                <p>
                    Welcome, ${escapeHTML(currentUser.name)}.
                    Manage startups and government work.
                </p>

            </div>

            <span class="status-badge status-info">
                GOVERNMENT PORTAL
            </span>

        </div>


        <div class="stats-grid">

            ${statCard(
                "🚀",
                startups.length,
                "Verified Startups",
                "Eligible companies"
            )}

            ${statCard(
                "◈",
                work.length,
                "Published Work",
                "Your department"
            )}

            ${statCard(
                "✓",
                applications.length,
                "Accepted Contracts",
                "Startup work"
            )}

            ${statCard(
                "₹",
                money(totalValue),
                "Contract Value",
                "Accepted startup work"
            )}

        </div>


        <h2 class="section-title">
            Government Actions
        </h2>


        <div class="grid-3">

            <div class="card">

                <div class="card-body">

                    <div class="stat-icon">
                        ⌕
                    </div>

                    <h3 style="font-size:14px;color:var(--dark);">
                        Search Startups
                    </h3>

                    <p style="font-size:10px;color:var(--muted);margin:6px 0 14px;">
                        Find verified startups based on field and capabilities.
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="navigate('findStartups')">
                        Search Startup →
                    </button>

                </div>

            </div>


            <div class="card">

                <div class="card-body">

                    <div class="stat-icon">
                        ＋
                    </div>

                    <h3 style="font-size:14px;color:var(--dark);">
                        Publish Government Work
                    </h3>

                    <p style="font-size:10px;color:var(--muted);margin:6px 0 14px;">
                        Create opportunities for eligible startups.
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="navigate('postWork')">
                        Publish Work →
                    </button>

                </div>

            </div>


            <div class="card">

                <div class="card-body">

                    <div class="stat-icon">
                        ₹
                    </div>

                    <h3 style="font-size:14px;color:var(--dark);">
                        Payment Management
                    </h3>

                    <p style="font-size:10px;color:var(--muted);margin:6px 0 14px;">
                        Track contract milestones and payments.
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="navigate('governmentPayments')">
                        View Payments →
                    </button>

                </div>

            </div>

        </div>


        <h2 class="section-title">
            Recently Accepted Government Work
        </h2>


        <div class="card">

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>
                                STARTUP
                            </th>

                            <th>
                                WORK
                            </th>

                            <th>
                                CONTRACT
                            </th>

                            <th>
                                PROGRESS
                            </th>

                            <th>
                                PAYMENT
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${
                            applications.length
                            ? applications.map(a => {

                                const startup =
                                    DB.users.find(
                                        u => u.id === a.startupId
                                    );

                                const opp =
                                    DB.opportunities.find(
                                        o => o.id === a.opportunityId
                                    );

                                return `

                                    <tr>

                                        <td>
                                            ${escapeHTML(
                                                startup?.name || "-"
                                            )}
                                        </td>

                                        <td>
                                            ${escapeHTML(
                                                opp?.title || "-"
                                            )}
                                        </td>

                                        <td>
                                            ${money(a.contractValue)}
                                        </td>

                                        <td>
                                            ${a.progress}%
                                        </td>

                                        <td>
                                            ${money(a.paid)}
                                        </td>

                                    </tr>

                                `;

                            }).join("")
                            : `
                                <tr>
                                    <td colspan="5">
                                        No contracts yet.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


/* =========================================================
   FIND STARTUPS
========================================================= */

function findStartupsPage() {

    return `

        <div class="page-header">

            <div>

                <h1>
                    Find Verified Startups
                </h1>

                <p>
                    Search only approved startups for government work.
                </p>

            </div>

            <span class="status-badge status-success">
                VERIFIED DATABASE
            </span>

        </div>


        <div class="card">

            <div class="card-body">

                <div class="search-bar">

                    <div class="search-input">

                        <span>
                            🔎
                        </span>

                        <input
                            id="startupSearch"
                            placeholder="Search startup name, field, DPIIT or CIN..."
                            oninput="renderStartupSearchResults()">

                    </div>


                    <select
                        id="startupFieldFilter"
                        onchange="renderStartupSearchResults()">

                        <option value="">
                            All Fields
                        </option>

                        <option>
                            Information Technology
                        </option>

                        <option>
                            Artificial Intelligence
                        </option>

                        <option>
                            Agriculture Technology
                        </option>

                        <option>
                            Healthcare Technology
                        </option>

                        <option>
                            Clean Energy
                        </option>

                        <option>
                            FinTech
                        </option>

                    </select>

                </div>


                <div id="startupSearchResults">

                </div>

            </div>

        </div>

    `;
}


function renderStartupSearchResults() {

    const container =
        document.getElementById(
            "startupSearchResults"
        );

    if (!container) return;


    const search =
        (
            document.getElementById(
                "startupSearch"
            ).value || ""
        ).toLowerCase();


    const field =
        document.getElementById(
            "startupFieldFilter"
        ).value;


    const startups =
        DB.users.filter(
            u => {

                if (
                    u.role !== "startup" ||
                    u.status !== "approved"
                ) {
                    return false;
                }


                const text =
                    `
                    ${u.name}
                    ${u.field}
                    ${u.dpiitNumber}
                    ${u.cin}
                    `
                    .toLowerCase();


                return (
                    text.includes(search) &&
                    (!field || u.field === field)
                );

            }
        );


    if (!startups.length) {

        container.innerHTML =
            emptyState(
                "⌕",
                "No verified startup found",
                "Try another company name or work field."
            );

        return;

    }


    container.innerHTML = `

        <div class="grid-2">

            ${startups
                .map(startupSearchCard)
                .join("")
            }

        </div>

    `;

}


function startupSearchCard(startup) {

    return `

        <div class="opportunity-card">

            <div class="profile-head"
                 style="padding-bottom:13px;">

                <div class="profile-logo"
                     style="width:45px;height:45px;font-size:15px;">

                    ${initials(startup.name)}

                </div>

                <div>

                    <div class="opportunity-title">
                        ${escapeHTML(startup.name)}
                    </div>

                    <div class="opportunity-org">
                        ${escapeHTML(startup.field)}
                    </div>

                </div>

            </div>


            <div class="tags"
                 style="margin-top:13px;">

                <span class="tag">
                    DPIIT ✓
                </span>

                <span class="tag">
                    MCA ✓
                </span>

                <span class="tag">
                    GST ✓
                </span>

                <span class="tag">
                    UBO ✓
                </span>

            </div>


            <div class="profile-details">

                ${profileDetail(
                    "Startup ID",
                    startup.id
                )}

                ${profileDetail(
                    "Company Age",
                    startup.companyAge + " years"
                )}

                ${profileDetail(
                    "Turnover",
                    "₹" + startup.annualTurnover + " Cr"
                )}

                ${profileDetail(
                    "DPIIT",
                    startup.dpiitNumber
                )}

            </div>


            <div style="
                display:flex;
                gap:8px;
                margin-top:15px;
            ">

                <button
                    class="btn btn-primary btn-sm"
                    onclick="viewStartup('${startup.id}')">

                    View Profile

                </button>

                <button
                    class="btn btn-outline btn-sm"
                    onclick="assignWorkToStartup('${startup.id}')">

                    Assign Work

                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   VIEW STARTUP
========================================================= */

function viewStartup(id) {

    const startup =
        DB.users.find(
            u => u.id === id
        );

    if (!startup) return;


    openModal(
        startup.name,
        "Verified Startup Profile",
        `

            <div class="alert alert-success">

                ✓ Verified Startup

                <br>

                DPIIT ✓
                MCA ✓
                GST ✓
                UBO ✓

            </div>


            <div class="profile-details">

                ${profileDetail(
                    "Startup ID",
                    startup.id
                )}

                ${profileDetail(
                    "Work Field",
                    startup.field
                )}

                ${profileDetail(
                    "DPIIT",
                    startup.dpiitNumber
                )}

                ${profileDetail(
                    "CIN",
                    startup.cin
                )}

                ${profileDetail(
                    "GSTIN",
                    startup.gstin
                )}

                ${profileDetail(
                    "Company Age",
                    startup.companyAge + " years"
                )}

                ${profileDetail(
                    "Turnover",
                    "₹" + startup.annualTurnover + " Cr"
                )}

            </div>

        `,
        `

            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Close
            </button>

            <button
                class="btn btn-primary"
                onclick="assignWorkToStartup('${id}')">
                Assign Government Work
            </button>

        `
    );

}


/* =========================================================
   ASSIGN WORK
========================================================= */

function assignWorkToStartup(startupId) {

    const startup =
        DB.users.find(
            u => u.id === startupId
        );

    if (!startup) return;


    const opportunities =
        DB.opportunities.filter(
            o =>
                o.createdBy === currentUser.id &&
                o.field === startup.field &&
                o.status === "open"
        );


    closeModal();


    if (!opportunities.length) {

        toast(
            "No open government work matches this startup's field.",
            "warning"
        );

        return;

    }


    openModal(
        "Assign Government Work",
        startup.name,
        `

            <div class="form-group">

                <label>
                    Select Work Opportunity
                </label>

                <select id="assignOpportunity">

                    ${
                        opportunities.map(
                            o => `

                                <option value="${o.id}">
                                    ${escapeHTML(o.title)}
                                    — ${money(o.budget)}
                                </option>

                            `
                        ).join("")
                    }

                </select>

            </div>

            <div class="alert alert-info"
                 style="margin-top:15px;">

                The selected work will become visible
                to the startup as a matching opportunity.

            </div>

        `,
        `

            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Cancel
            </button>

            <button
                class="btn btn-primary"
                onclick="confirmAssignment('${startupId}')">
                Send Work Opportunity
            </button>

        `
    );

}


function confirmAssignment(startupId) {

    const opportunityId =
        document.getElementById(
            "assignOpportunity"
        ).value;


    closeModal();

    toast(
        "Work opportunity sent to the startup.",
        "success"
    );

}


/* =========================================================
   GOVERNMENT POST WORK
========================================================= */

function postWorkPage() {

    return `

        <div class="page-header">

            <div>

                <h1>
                    Publish Government Work
                </h1>

                <p>
                    Create a work opportunity for eligible startups.
                </p>

            </div>

        </div>


        <div class="card form-card">

            <form id="postWorkForm">

                <div class="form-section">

                    <h3>
                        Work Details
                    </h3>

                    <p>
                        Startups will only see this opportunity
                        if their registered field matches.
                    </p>


                    <div class="form-grid">

                        <div class="form-group full">

                            <label>
                                Work Title *
                            </label>

                            <input
                                id="workTitle"
                                required
                                placeholder="Example: Smart City Analytics Platform">

                        </div>


                        <div class="form-group">

                            <label>
                                Required Startup Field *
                            </label>

                            <select
                                id="workField"
                                required>

                                <option value="">
                                    Select field
                                </option>

                                <option>
                                    Information Technology
                                </option>

                                <option>
                                    Artificial Intelligence
                                </option>

                                <option>
                                    Agriculture Technology
                                </option>

                                <option>
                                    Healthcare Technology
                                </option>

                                <option>
                                    Clean Energy
                                </option>

                                <option>
                                    FinTech
                                </option>

                                <option>
                                    Cybersecurity
                                </option>

                                <option>
                                    Manufacturing
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label>
                                Contract Budget (₹) *
                            </label>

                            <input
                                id="workBudget"
                                type="number"
                                min="1"
                                required
                                placeholder="5000000">

                        </div>


                        <div class="form-group">

                            <label>
                                Duration *
                            </label>

                            <input
                                id="workDuration"
                                required
                                placeholder="8 Months">

                        </div>


                        <div class="form-group">

                            <label>
                                Submission Deadline *
                            </label>

                            <input
                                id="workDeadline"
                                type="date"
                                required>

                        </div>


                        <div class="form-group full">

                            <label>
                                Scope of Work *
                            </label>

                            <textarea
                                id="workDescription"
                                required
                                placeholder="Describe requirements, deliverables and expected outcomes...">
                            </textarea>

                        </div>

                    </div>

                </div>


                <div class="form-actions">

                    <button
                        type="button"
                        class="btn btn-outline"
                        onclick="navigate('governmentDashboard')">
                        Cancel
                    </button>

                    <button
                        class="btn btn-primary"
                        type="submit">
                        Publish Work →
                    </button>

                </div>

            </form>

        </div>

    `;

}


function setupPostWork() {

    const form =
        document.getElementById(
            "postWorkForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const opportunity = {

                id:
                    "OPP" +
                    String(
                        DB.opportunities.length + 1
                    ).padStart(3,"0"),

                title:
                    document.getElementById(
                        "workTitle"
                    ).value,

                department:
                    currentUser.department,

                field:
                    document.getElementById(
                        "workField"
                    ).value,

                description:
                    document.getElementById(
                        "workDescription"
                    ).value,

                budget:
                    Number(
                        document.getElementById(
                            "workBudget"
                        ).value
                    ),

                deadline:
                    document.getElementById(
                        "workDeadline"
                    ).value,

                duration:
                    document.getElementById(
                        "workDuration"
                    ).value,

                status: "open",

                createdBy:
                    currentUser.id

            };


            DB.opportunities.push(opportunity);

            saveDatabase();


            toast(
                "Government work published successfully.",
                "success"
            );

            navigate("governmentWork");

        }
    );

}


/* =========================================================
   GOVERNMENT WORK
========================================================= */

function governmentWorkPage() {

    const works =
        DB.opportunities.filter(
            o =>
                o.createdBy ===
                currentUser.id
        );


    return `

        <div class="page-header">

            <div>

                <h1>
                    Published Government Work
                </h1>

                <p>
                    Manage work opportunities published by your department.
                </p>

            </div>

            <button
                class="btn btn-primary"
                onclick="navigate('postWork')">
                + Publish Work
            </button>

        </div>


        ${
            works.length
            ? `
                <div class="grid-2">
                    ${works.map(o => `

                        <div class="opportunity-card">

                            <div class="opportunity-top">

                                <div>

                                    <div class="opportunity-title">
                                        ${escapeHTML(o.title)}
                                    </div>

                                    <div class="opportunity-org">
                                        ${escapeHTML(o.department)}
                                    </div>

                                </div>

                                <span class="status-badge status-success">
                                    ${o.status.toUpperCase()}
                                </span>

                            </div>


                            <p class="opportunity-description">
                                ${escapeHTML(o.description)}
                            </p>


                            <div class="tags">

                                <span class="tag">
                                    ${escapeHTML(o.field)}
                                </span>

                            </div>


                            <div class="opportunity-meta">

                                <div class="meta-box">

                                    <span>
                                        BUDGET
                                    </span>

                                    <strong>
                                        ${money(o.budget)}
                                    </strong>

                                </div>

                                <div class="meta-box">

                                    <span>
                                        DURATION
                                    </span>

                                    <strong>
                                        ${o.duration}
                                    </strong>

                                </div>

                                <div class="meta-box">

                                    <span>
                                        DEADLINE
                                    </span>

                                    <strong>
                                        ${formatDate(o.deadline)}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    `).join("")}
                </div>
            `
            : emptyState(
                "◈",
                "No work published",
                "Create your first government work opportunity."
            )
        }

    `;

}


/* =========================================================
   GOVERNMENT PAYMENTS
========================================================= */

function governmentPaymentsPage() {

    const applications =
        DB.applications;


    const total =
        applications.reduce(
            (s,a) => s + a.contractValue,
            0
        );

    const paid =
        applications.reduce(
            (s,a) => s + a.paid,
            0
        );


    return `

        <div class="page-header">

            <div>

                <h1>
                    Payment Management
                </h1>

                <p>
                    Monitor government contract payment milestones.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "₹",
                money(total),
                "Total Contracts",
                "Accepted work"
            )}

            ${statCard(
                "✓",
                money(paid),
                "Released",
                "Payments released"
            )}

            ${statCard(
                "⏳",
                money(total-paid),
                "Pending",
                "Awaiting milestones"
            )}

            ${statCard(
                "📊",
                total
                    ? Math.round(
                        paid / total * 100
                    ) + "%"
                    : "0%",
                "Payment Completion",
                "Across contracts"
            )}

        </div>


        <h2 class="section-title">
            Contract Payment Ledger
        </h2>


        <div class="card">

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>
                                STARTUP
                            </th>

                            <th>
                                PROJECT
                            </th>

                            <th>
                                CONTRACT
                            </th>

                            <th>
                                PAID
                            </th>

                            <th>
                                PENDING
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${
                            applications.length
                            ? applications.map(
                                a => {

                                    const startup =
                                        DB.users.find(
                                            u =>
                                                u.id ===
                                                a.startupId
                                        );

                                    const opportunity =
                                        DB.opportunities.find(
                                            o =>
                                                o.id ===
                                                a.opportunityId
                                        );

                                    return `

                                        <tr>

                                            <td>
                                                ${escapeHTML(
                                                    startup?.name || "-"
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHTML(
                                                    opportunity?.title || "-"
                                                )}
                                            </td>

                                            <td>
                                                ${money(
                                                    a.contractValue
                                                )}
                                            </td>

                                            <td style="
                                                color:#15803d;
                                                font-weight:700;
                                            ">
                                                ${money(a.paid)}
                                            </td>

                                            <td style="
                                                color:#b45309;
                                                font-weight:700;
                                            ">
                                                ${money(
                                                    a.contractValue -
                                                    a.paid
                                                )}
                                            </td>

                                            <td>

                                                <button
                                                    class="btn btn-primary btn-sm"
                                                    onclick="managePayment('${a.id}')">

                                                    Manage

                                                </button>

                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join("")
                            : `
                                <tr>
                                    <td colspan="6">
                                        No contracts found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   MANAGE PAYMENT
========================================================= */

function managePayment(id) {

    const application =
        DB.applications.find(
            a => a.id === id
        );

    if (!application) return;


    const startup =
        DB.users.find(
            u => u.id === application.startupId
        );


    openModal(
        "Manage Contract Payment",
        startup?.name || "Startup",
        `

            <div class="alert alert-info">

                Demo payment control.

                In a production system this action would
                connect to an authorized government treasury
                / payment workflow.

            </div>


            <div class="timeline">

                ${
                    application.milestones
                        .map(
                            (m,index) => `

                                <div class="timeline-item">

                                    <div class="timeline-dot">
                                    </div>

                                    <strong>
                                        ${escapeHTML(m.name)}
                                    </strong>

                                    <p>
                                        ${money(m.amount)}
                                    </p>

                                    <small>
                                        Status:
                                        ${m.status}
                                    </small>

                                    ${
                                        m.status !== "paid"
                                        ? `

                                            <button
                                                class="btn btn-success btn-sm"
                                                style="margin-top:7px;"
                                                onclick="releaseMilestone('${id}',${index})">

                                                Release Payment

                                            </button>

                                        `
                                        : ""
                                    }

                                </div>

                            `
                        )
                        .join("")
                }

            </div>

        `,
        `
            <button
                class="btn btn-outline"
                onclick="closeModal()">
                Close
            </button>
        `
    );

}


function releaseMilestone(applicationId,index) {

    const application =
        DB.applications.find(
            a => a.id === applicationId
        );

    if (!application) return;


    const milestone =
        application.milestones[index];


    if (
        !milestone ||
        milestone.status === "paid"
    ) {
        return;
    }


    milestone.status = "paid";

    application.paid +=
        milestone.amount;


    const paidCount =
        application.milestones.filter(
            m => m.status === "paid"
        ).length;


    application.progress =
        Math.round(
            paidCount /
            application.milestones.length *
            100
        );


    saveDatabase();

    closeModal();


    toast(
        "Milestone payment released successfully.",
        "success"
    );


    navigate("governmentPayments");

}


/* =========================================================
   EMPTY STATE
========================================================= */

function emptyState(icon,title,text) {

    return `

        <div class="empty-state">

            <div class="empty-icon">
                ${icon}
            </div>

            <h3>
                ${title}
            </h3>

            <p>
                ${text}
            </p>

        </div>

    `;
}


/* =========================================================
   PROFILE / LOGOUT
========================================================= */

function logout() {

    currentUser = null;

    localStorage.removeItem(
        "govconnect_session"
    );

    updateSidebar();
    updateUserUI();

    navigate("landing");

    toast(
        "You have been logged out.",
        "success"
    );

}


document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        logout
    );


document
    .getElementById("profileButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("profileMenu")
                .classList.toggle("show");

        }
    );


document.addEventListener(
    "click",
    e => {

        const menu =
            document.getElementById(
                "profileMenu"
            );

        const button =
            document.getElementById(
                "profileButton"
            );

        if (
            !menu.contains(e.target) &&
            !button.contains(e.target)
        ) {

            menu.classList.remove("show");

        }

    }
);


document
    .querySelector(
        '[data-page="profile"]'
    )
    ?.addEventListener(
        "click",
        () => {

            if (currentUser) {

                navigate(
                    currentUser.role === "startup"
                        ? "startupProfile"
                        : "governmentDashboard"
                );

            }

        }
    );


/* =========================================================
   NOTIFICATIONS
========================================================= */

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );


notificationBtn.addEventListener(
    "click",
    () => {

        const existing =
            document.getElementById(
                "notificationPanel"
            );

        if (existing) {

            existing.classList.toggle(
                "show"
            );

            return;
        }


        const panel =
            document.createElement("div");

        panel.id =
            "notificationPanel";

        panel.className =
            "notification-panel show";

        panel.innerHTML = `

            <div class="notification-header">

                <strong>
                    Notifications
                </strong>

                <span>
                    ${currentUser ? "2" : "0"}
                </span>

            </div>


            ${
                currentUser
                ? `

                    <div class="notification">

                        <strong>
                            Welcome to GovConnect
                        </strong>

                        <p>
                            Your personalized portal is active.
                        </p>

                    </div>


                    <div class="notification">

                        <strong>
                            Verification Status
                        </strong>

                        <p>
                            ${
                                currentUser.role === "startup"
                                ? "Your startup is fully verified."
                                : "Government portal access is active."
                            }
                        </p>

                    </div>

                `
                : `

                    <div class="notification">

                        <p>
                            Please login to view notifications.
                        </p>

                    </div>

                `
            }

        `;


        document.body.appendChild(panel);

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );


/* =========================================================
   PAGE RENDER ENGINE
========================================================= */

function renderPage(page) {

    let html = "";

    let title = "Home";


    switch(page) {

        case "landing":
            html = landingPage();
            title = "Home";
            break;


        case "login":
            html = loginPage();
            title = "Login";
            break;


        case "startupRegister":
            html = startupRegisterPage();
            title = "Startup Registration";
            break;


        case "governmentRegister":
            html = governmentRegisterPage();
            title = "Government Registration";
            break;


        case "startupDashboard":

            if (!requireRole("startup")) return;

            html = startupDashboardPage();

            title = "Startup Dashboard";

            break;


        case "opportunities":

            if (!requireRole("startup")) return;

            html = opportunitiesPage();

            title = "Work Opportunities";

            break;


        case "applications":

            if (!requireRole("startup")) return;

            html = applicationsPage();

            title = "My Applications";

            break;


        case "payments":

            if (!requireRole("startup")) return;

            html = paymentsPage();

            title = "Payment Tracking";

            break;


        case "startupProfile":

            if (!requireRole("startup")) return;

            html = startupProfilePage();

            title = "Company Profile";

            break;


        case "governmentDashboard":

            if (!requireRole("government")) return;

            html = governmentDashboardPage();

            title = "Government Dashboard";

            break;


        case "findStartups":

            if (!requireRole("government")) return;

            html = findStartupsPage();

            title = "Find Startups";

            break;


        case "postWork":

            if (!requireRole("government")) return;

            html = postWorkPage();

            title = "Publish Work";

            break;


        case "governmentWork":

            if (!requireRole("government")) return;

            html = governmentWorkPage();

            title = "Published Work";

            break;


        case "governmentPayments":

            if (!requireRole("government")) return;

            html = governmentPaymentsPage();

            title = "Government Payments";

            break;


        default:

            html = landingPage();

            title = "Home";

    }


    pageContainer.innerHTML =
        html;


    document.getElementById(
        "breadcrumb"
    ).textContent = title;


    updateSidebar();
    updateUserUI();


    /*
        Page-specific event initialization
    */

    setupLogin();

    setupStartupRegistration();

    setupGovernmentRegistration();

    setupPostWork();


    if (page === "findStartups") {

        renderStartupSearchResults();

    }

}


/* =========================================================
   AUTH GUARD
========================================================= */

function requireRole(role) {

    if (!currentUser) {

        toast(
            "Please login to access this portal.",
            "warning"
        );

        navigate("login");

        return false;

    }


    if (currentUser.role !== role) {

        toast(
            "You do not have access to this portal.",
            "danger"
        );

        return false;

    }


    return true;
}


/* =========================================================
   INITIALIZATION
========================================================= */

updateSidebar();
updateUserUI();


if (currentUser) {

    if (currentUser.role === "startup") {

        navigate("startupDashboard");

    } else {

        navigate("governmentDashboard");

    }

} else {

    navigate("landing");

}


/* =========================================================
   GLOBAL WINDOW EXPORTS
   Required for inline onclick handlers.
========================================================= */

window.navigate = navigate;

window.closeModal = closeModal;

window.selectLoginRole = selectLoginRole;

window.loginRegisteredStartup =
    loginRegisteredStartup;

window.viewOpportunity =
    viewOpportunity;

window.acceptOpportunity =
    acceptOpportunity;

window.rejectOpportunity =
    rejectOpportunity;

window.confirmReject =
    confirmReject;

window.viewApplication =
    viewApplication;

window.viewStartup =
    viewStartup;

window.assignWorkToStartup =
    assignWorkToStartup;

window.confirmAssignment =
    confirmAssignment;

window.renderStartupSearchResults =
    renderStartupSearchResults;

window.managePayment =
    managePayment;

window.releaseMilestone =
    releaseMilestone;


